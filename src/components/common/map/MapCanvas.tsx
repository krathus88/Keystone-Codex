import { useCallback, useEffect, useRef, useState } from "react"
import { Circle, Image as KonvaImage, Layer, Stage } from "react-konva"
import useImage from "use-image"

type Note = {
    id: string
    x: number
    y: number
}

type MapCanvasProps = {
    containerRef: React.RefObject<HTMLDivElement | null>
    mapUrl: string
}

export const MapCanvas = ({ containerRef, mapUrl }: MapCanvasProps) => {
    const [mapImage] = useImage(mapUrl)

    const [containerSize, setContainerSize] = useState({
        width: 900,
        height: 600,
    })
    const [imageSize, setImageSize] = useState({ width: 1920, height: 1080 })
    const [scale, setScale] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [notes, setNotes] = useState<Note[]>([])
    const [fitScale, setFitScale] = useState(1)
    const stageRef = useRef<any>(null)
    const animationRef = useRef<number | null>(null)

    // For velocity tracking
    const velocity = useRef({ x: 0, y: 0 })
    const lastDragPos = useRef({ x: 0, y: 0 })
    const lastDragTime = useRef<number>(0)

    // Update container size on mount / resize
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                })
            }
        }
        updateSize()
        window.addEventListener("resize", updateSize)
        return () => window.removeEventListener("resize", updateSize)
    }, [containerRef])

    // Update image size when the map image loads
    useEffect(() => {
        if (mapImage) {
            setImageSize({
                width: mapImage.width,
                height: mapImage.height,
            })
        }
    }, [mapImage])

    // Compute initial scale and position to fit image in container
    useEffect(() => {
        const scaleX = containerSize.width / imageSize.width
        const scaleY = containerSize.height / imageSize.height
        const fit = Math.min(scaleX, scaleY)

        setFitScale(fit)
        setScale(fit)
        setPosition({
            x: (containerSize.width - imageSize.width * fit) / 2,
            y: (containerSize.height - imageSize.height * fit) / 2,
        })
    }, [containerSize, imageSize])

    /** Zoom Handler */
    const handleWheel = useCallback(
        (e: any) => {
            e.evt.preventDefault()
            const scaleBy = 1.05
            const oldScale = scale
            const pointer = stageRef.current.getPointerPosition()

            const mousePointTo = {
                x: (pointer.x - position.x) / oldScale,
                y: (pointer.y - position.y) / oldScale,
            }

            let newScale =
                e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy

            // Use relative limits
            const minScale = fitScale * 0.5
            const maxScale = fitScale * 5
            newScale = Math.max(minScale, Math.min(maxScale, newScale))

            const newPos = {
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
            }

            setScale(newScale)
            setPosition(newPos)
        },
        [scale, position, fitScale],
    )

    /** Handle momentum animation after drag */
    const animateMomentum = useCallback(() => {
        const friction = 0.94 // friction coefficient - lower means faster slowdown
        velocity.current.x *= friction
        velocity.current.y *= friction

        // Stop if velocity is very low
        if (
            Math.abs(velocity.current.x) < 0.1 &&
            Math.abs(velocity.current.y) < 0.1
        ) {
            velocity.current = { x: 0, y: 0 }
            if (animationRef.current) cancelAnimationFrame(animationRef.current)
            animationRef.current = null
            return
        }

        setPosition((pos) => ({
            x: pos.x + velocity.current.x,
            y: pos.y + velocity.current.y,
        }))

        animationRef.current = requestAnimationFrame(animateMomentum)
    }, [])

    /** Drag start */
    const handleDragStart = useCallback(
        (e: any) => {
            stageRef.current.container().style.cursor = "grabbing"

            // Stop any momentum animation if user starts dragging again
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
                animationRef.current = null
                velocity.current = { x: 0, y: 0 }
            }
            const pos = e.target.position()
            lastDragPos.current = { x: pos.x, y: pos.y }
            lastDragTime.current = performance.now()
        },
        [stageRef],
    )

    /** Drag move */
    const handleDragMove = useCallback((e: any) => {
        const pos = e.target.position()
        const now = performance.now()
        const dt = now - lastDragTime.current || 16 // fallback to 16ms (60fps)

        // Calculate velocity
        velocity.current = {
            x: (pos.x - lastDragPos.current.x) / dt,
            y: (pos.y - lastDragPos.current.y) / dt,
        }

        setPosition({ x: pos.x, y: pos.y })

        lastDragPos.current = { x: pos.x, y: pos.y }
        lastDragTime.current = now
    }, [])

    /** Drag end */
    const handleDragEnd = useCallback(() => {
        stageRef.current.container().style.cursor = "grab"

        // Start momentum animation on drag end
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        animationRef.current = requestAnimationFrame(animateMomentum)
    }, [stageRef, animateMomentum])

    /** Handle double click
     *
     * Adds a note.
     */
    const handleDoubleClick = useCallback(() => {
        const stage = stageRef.current
        const pointer = stage.getPointerPosition()
        const clickedX = (pointer.x - position.x) / scale
        const clickedY = (pointer.y - position.y) / scale

        setNotes((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                x: clickedX,
                y: clickedY,
            },
        ])
    }, [position, scale])

    return (
        <Stage
            ref={stageRef}
            width={containerSize.width}
            height={containerSize.height}
            draggable={false}
            style={{
                background: "#000",
                borderRadius: "3px",
                boxShadow: "0 5px 5px rgba(0,0,0,0.3)",
                cursor: "grab",
            }}
            onWheel={handleWheel}
            onDblClick={handleDoubleClick}
        >
            {/* Map Layer */}
            <Layer
                scaleX={scale}
                scaleY={scale}
                x={position.x}
                y={position.y}
                draggable={true}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
            >
                {mapImage && (
                    <KonvaImage
                        image={mapImage}
                        x={0}
                        y={0}
                        width={imageSize.width}
                        height={imageSize.height}
                    />
                )}
            </Layer>

            {/* Notes layer */}
            <Layer>
                {notes.map((note) => (
                    <Circle
                        key={note.id}
                        x={note.x * scale + position.x} // transform manually
                        y={note.y * scale + position.y}
                        radius={5} // visible size
                        fill="red"
                    />
                ))}
            </Layer>
        </Stage>
    )
}
