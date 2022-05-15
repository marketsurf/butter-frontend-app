import { AppProps } from 'next/app';
import Head from 'next/head';
import {
  Center,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import DocumentProvider from '@/common/context/document';
import useWindowSize from '@/hooks/useWindowSize';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const { width, _ } = useWindowSize();

  return (
    <>
      <Head>
        <title>Home | buTTer</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <DocumentProvider>
            {(width ?? 1920) < 768 ? (
              <>
                <Center
                  style={{
                    width: '100vw',
                    height: '100vh',
                  }}
                >
                  <Title align="center">
                    Sorry, this website is only available on desktop devices.
                  </Title>
                </Center>
              </>
            ) : (
              <Component {...pageProps} />
            )}
          </DocumentProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
