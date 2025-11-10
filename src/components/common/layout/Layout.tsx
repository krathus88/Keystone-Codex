import { Flex } from "@chakra-ui/react"
import { Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { Footer } from "./footer/Footer"
import { Header } from "./header/Header"

export const Layout = () => {
    return (
        <Flex
            id="Layout"
            mx="auto"
            minH="100dvh"
            flexDirection={"column"}
            justifyContent={"center"}
            maxW={"1440px"}
        >
            <Header />

            <Outlet />

            <Footer />

            <TanStackRouterDevtools />
        </Flex>
    )
}
