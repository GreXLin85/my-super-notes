import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core';
import { useRouter } from 'next/router'

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(120),
    backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor }).background,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: rem(38),
    color: theme.white,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(540),
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    color: theme.colors[theme.primaryColor][1],
  },
}));

export function NotFound() {
  const { classes } = useStyles();
  const router = useRouter()

  return (
    <div className={classes.root + " h-screen flex flex-col justify-center items-center"}>
      <Container>
        <Title className={classes.title}>Not Found!</Title>
        <Text size="lg" align="center" className={classes.description}>
          Well, you wanted is not found.
        </Text>
        <Group position="center">
          <Button onClick={() => router.back()}>Go Back</Button>
        </Group>
      </Container>
    </div>
  );
}