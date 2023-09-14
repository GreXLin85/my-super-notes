import { createStyles, Title, Text, Button, Container, Group, rem } from '@mantine/core';

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
    color: theme.colors[theme.primaryColor][1],
  },
}));

export function Loading() {
  const { classes } = useStyles();

  return (
    <div className={classes.root + " h-screen flex flex-col justify-center items-center"}>
      <Container>
        <Title className={classes.title}>Well, page is loading...</Title>
        <Text size="lg" align="center" className={classes.description}>
          Please wait a few seconds, we are loading your notes
        </Text>
      </Container>
    </div>
  );
}