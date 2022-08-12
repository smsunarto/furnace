import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class FurnaceDocument extends Document {
  render() {
    return (
      <Html className="h-full bg-gray-100">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
