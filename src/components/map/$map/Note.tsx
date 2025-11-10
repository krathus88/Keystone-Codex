import { Flex, Text } from "@chakra-ui/react"
import type { NoteType } from "@models/Notes"

type NoteProps = {
    note: NoteType
}

export const Note = ({ note }: NoteProps) => {
    return (
        <Flex p={2} bgColor={"background.tertiary"} borderRadius={"sm"}>
            <Text>{note.content}</Text>
        </Flex>
    )
}
