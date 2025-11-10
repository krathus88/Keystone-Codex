import { Layout } from "@common/layout/Layout"
import { MapProvider } from "@store/MapContext"
import { createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
    component: () => (
        <MapProvider>
            <Layout />
        </MapProvider>
    ),
})
