import { Grid, GridItem } from "@chakra-ui/react"
import { MapCanvas } from "@common/map/MapCanvas"
import { NoMapError } from "@components/map/$map/NoMapError"
import { NoteCard } from "@components/map/$map/NoteCard"
import { PLACEHOLDER_NOTE_CARDS } from "@models/Notes"
import { Route } from "@routes/map/$map"
import { MapService } from "@services/MapService"
import { useParams } from "@tanstack/react-router"
import { useRef } from "react"

export const Map = () => {
    const params = useParams({ from: Route.id })

    const mapContainerRef = useRef<HTMLDivElement>(null)

    const noteCards = PLACEHOLDER_NOTE_CARDS

    if (!MapService.isCurrentSeasonMapValueType(params.map))
        return <NoMapError />

    return (
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            <GridItem ref={mapContainerRef} colSpan={2}>
                <MapCanvas
                    containerRef={mapContainerRef}
                    mapUrl={MapService.getCurrentSeasonMap(params.map)}
                />
            </GridItem>

            {noteCards.map((noteCard, index) => (
                <GridItem key={index}>
                    <NoteCard title={noteCard.title} notes={noteCard.notes} />
                </GridItem>
            ))}
        </Grid>
    )
}
