import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();

        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags };
    }

    render() {
        return (
            <html>
                <Head>{this.props.styleTags}</Head>
                <body>
                    <Main />
                    <NextScript />
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
                </body>
            </html>
        );
    }
}
