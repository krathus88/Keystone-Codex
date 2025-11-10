export type NoteType = {
    content: string
    dateCreated: string
    upvotes: number
}

export type NoteCardType = {
    title: string
    notes: NoteType[]
}

export const PLACEHOLDER_NOTE_CARDS: NoteCardType[] = [
    {
        title: "Top",
        notes: [
            {
                content: "Placeholder for note 1",
                dateCreated: new Date().toISOString(),
                upvotes: 1532,
            },
            {
                content: "Placeholder for note 2",
                dateCreated: new Date(
                    Date.now() - 60 * 60 * 1000,
                ).toISOString(),
                upvotes: 623,
            },
            {
                content: "Placeholder for note 3",
                dateCreated: new Date(
                    Date.now() - 60 * 60 * 2000,
                ).toISOString(),
                upvotes: 974,
            },
        ],
    },
    {
        title: "Top",
        notes: [
            {
                content: "Placeholder for note 1",
                dateCreated: new Date().toISOString(),
                upvotes: 1532,
            },
            {
                content: "Placeholder for note 2",
                dateCreated: new Date(
                    Date.now() - 60 * 60 * 1000,
                ).toISOString(),
                upvotes: 623,
            },
            {
                content: "Placeholder for note 3",
                dateCreated: new Date(
                    Date.now() - 60 * 60 * 2000,
                ).toISOString(),
                upvotes: 974,
            },
        ],
    },
    {
        title: "Top",
        notes: [
            {
                content: "Placeholder for note 1",
                dateCreated: new Date().toISOString(),
                upvotes: 1532,
            },
            {
                content: "Placeholder for note 2",
                dateCreated: new Date(
                    Date.now() - 60 * 60 * 1000,
                ).toISOString(),
                upvotes: 623,
            },
            {
                content: "Placeholder for note 3",
                dateCreated: new Date(
                    Date.now() - 60 * 60 * 2000,
                ).toISOString(),
                upvotes: 974,
            },
        ],
    },
    {
        title: "Top",
        notes: [
            {
                content: "Placeholder for note 1",
                dateCreated: new Date().toISOString(),
                upvotes: 1532,
            },
            {
                content: "Placeholder for note 2",
                dateCreated: new Date(
                    Date.now() - 60 * 60 * 1000,
                ).toISOString(),
                upvotes: 623,
            },
            {
                content: "Placeholder for note 3",
                dateCreated: new Date(
                    Date.now() - 60 * 60 * 2000,
                ).toISOString(),
                upvotes: 974,
            },
        ],
    },
]
