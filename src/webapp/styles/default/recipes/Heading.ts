import { defineRecipe } from "@chakra-ui/react"

export const headingRecipe = defineRecipe({
    base: {
        lineHeight: "normal",
        letterSpacing: "normal",
    },
    variants: {
        size: {
            h1: {
                fontSize: "3rem",
            },
            h2: {
                fontSize: "2.5rem",
            },
            h3: {
                fontSize: "2rem",
            },
        },
    },
    defaultVariants: {
        size: "h1",
    },
})
