import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head>
        <link rel="icon" href="/assets/Logo-Tab.png" type="image/png" />
        <title>LPK Merdeka</title>
        <meta name="description" content="LPK PB Merdeka - Lembaga pelatihan vokasi terkemuka" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
