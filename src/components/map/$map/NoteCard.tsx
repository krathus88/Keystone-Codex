import { Flex, List } from "@chakra-ui/react"
import { H3 } from "@ui/h3"
import { Note } from "./Note"
import type { NoteType } from "@models/Notes"

type NoteCardProps = {
    title: string
    notes: NoteType[]
}

export const NoteCard = ({ title, notes }: NoteCardProps) => {
    return (
        <Flex
            py={2}
            px={2}
            flexDirection={"column"}
            bgColor={"background.secondary"}
            borderRadius={"md"}
            gap={1}
        >
            <H3 fontSize={"1.25rem"}>{title}</H3>

            <List.Root listStyleType={"none"} gap={2}>
                {notes.map((note, index) => (
                    <List.Item key={index}>
                        <Note note={note} />
                    </List.Item>
                ))}
            </List.Root>
        </Flex>
    )
}
