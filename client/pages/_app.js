import App, { Container } from 'next/app';
import Page from '../components/Page';

import { getFlashes } from '../lib/flashes';

// import test from '../lib/gsc';
import { apiGet, apiPut, apiPost } from '../lib/api';


class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        // Props from component
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        // Flashes
        pageProps.flashes = getFlashes(ctx);

        return { pageProps };
    }

    componentDidMount() {
        // const oneUser = apiGet({}, '/schedule', {});
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Page>
                    <Component {...pageProps} />
                </Page>
            </Container>
        );
    }
}

export default MyApp;
