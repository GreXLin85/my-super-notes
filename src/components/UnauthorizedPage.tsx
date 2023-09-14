import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core';
import SignInButton from './SignInButton';

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

export function Unauthorized() {
  const { classes } = useStyles();

  return (
    <div className={classes.root + " h-screen flex flex-col justify-center items-center"}>
      <Container>
        <Title className={classes.title}>Unauthorized!</Title>
        <Text size="lg" align="center" className={classes.description}>
          Well, you are not authorized to view this page. Please sign in with Google to view this page.
        </Text>
        <Group position="center">
          <SignInButton>Sign in with Google</SignInButton>
        </Group>
      </Container>
    </div>
  );
}