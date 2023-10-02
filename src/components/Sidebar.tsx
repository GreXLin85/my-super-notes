import {
    createStyles,
    Navbar,
    TextInput,
    Code,
    Text,
    Group,
    ActionIcon,
    Tooltip,
    rem,
} from '@mantine/core';
import {
    IconSearch,
    IconPlus,
} from '@tabler/icons-react';
import { UserButton } from './UserButton';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { type Note } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useCurrentNoteStore from '~/store/currentNote';
import useNotesStore from '~/store/notes';

const useStyles = createStyles((theme) => ({
    navbar: {
        paddingTop: 0,
    },

    section: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        marginBottom: theme.spacing.md,

        '&:not(:last-of-type)': {
            borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
                }`,
        },
    },

    searchCode: {
        fontWeight: 700,
        fontSize: rem(10),
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]
            }`,
    },

    mainLinks: {
        paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
        paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
        paddingBottom: theme.spacing.md,
    },

    mainLink: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontSize: theme.fontSizes.xs,
        padding: `${rem(8)} ${theme.spacing.xs}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    mainLinkInner: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
    },

    mainLinkIcon: {
        marginRight: theme.spacing.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    },

    mainLinkBadge: {
        padding: 0,
        width: rem(20),
        height: rem(20),
        pointerEvents: 'none',
    },

    collections: {
        paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
        paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
        paddingBottom: theme.spacing.md,
    },

    collectionsHeader: {
        paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
        paddingRight: theme.spacing.md,
        marginBottom: rem(5),
    },

    collectionLink: {
        display: 'block',
        padding: `${rem(8)} ${theme.spacing.xs}`,
        textDecoration: 'none',
        borderRadius: theme.radius.sm,
        fontSize: theme.fontSizes.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        lineHeight: 1,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },
}));

export default function Sidebar({ notes }: { notes: Note[] }) {
    const { classes } = useStyles();
    const router = useRouter()
    const { data: session, status } = useSession()
    const [isCreatingNote, setIsCreatingNote] = useState(false)
    const { id: currentNoteId, setCurrentNote } = useCurrentNoteStore()
    const { notes: notesState, setNotes } = useNotesStore()
    const [search, setSearch] = useState('')
    useEffect(() => {
        setNotes(notes)
    }, [notes, setNotes])

    const noteLinks = notesState.filter(
        (note) =>
            note.title?.toLowerCase().includes(search.toLowerCase()) ||
            note.content?.toLowerCase().includes(search.toLowerCase())
    ).map((note) => (
        <Link
            href={"/dashboard/note/" + note.id}
            key={note.id}
            className={classes.collectionLink + " truncate"}
            passHref={true}
            shallow={false}
            onClick={() => {
                setCurrentNote?.(note.id)
            }}
        >
            {currentNoteId == note.id ? "* " : null} {note.title ? note.title : <b>{"(Untitled)"}</b>}
        </Link>
    ));

    const handleCreateNote = async () => {
        const note = await axios.post<{ data: Note }>('/api/note/create')

        return note
    }


    return (
        <Navbar p="md" className={classes.navbar + " h-full overflow-y-auto overflow-x-hidden w-96"}>
            <Navbar.Section className={classes.section}>
                <UserButton
                    image="https://i.imgur.com/fGxgcDF.png"
                    name={session?.user.name!}
                    email={session?.user.email!}
                />
            </Navbar.Section>

            <TextInput
                placeholder="Search in your Notes"
                size="xs"
                icon={<IconSearch size="0.8rem" stroke={1.5} />}
                rightSectionWidth={70}
                rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                mb="sm"
            />

            <Navbar.Section className={classes.section}>
                <Group className={classes.collectionsHeader} position="apart">
                    <Text size="xs" weight={500} color="dimmed">
                        Notes
                    </Text>
                    <Tooltip label="Create note" withArrow position="right">
                        <ActionIcon variant="default" loading={isCreatingNote} onClick={async () => {
                            setIsCreatingNote(true)
                            const note = await handleCreateNote()
                            void router.push('/dashboard/note/' + note.data.data.id)
                            setIsCreatingNote(false)
                        }} size={18}>
                            <IconPlus size="0.8rem" stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
                <div className={classes.collections}>{noteLinks}</div>
            </Navbar.Section>
        </Navbar>
    );
}