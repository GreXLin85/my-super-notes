import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { MantineProvider, createEmotionCache } from '@mantine/core';

import "~/styles/globals.css";

const myCache = createEmotionCache({
  key: 'mantine',
  prepend: false
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
        emotionCache={myCache}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  );
};

export default MyApp;
