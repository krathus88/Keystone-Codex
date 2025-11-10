import { defaultTheme } from "@styles/index"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { Provider } from "@ui/provider"
import { routeTree } from "./routeTree.gen"

// Create a new router instance
const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
})

export default function App() {
    return (
        <Provider theme={defaultTheme}>
            <RouterProvider router={router} />
        </Provider>
    )
}
