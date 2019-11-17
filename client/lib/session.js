import cookie from 'cookie';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const parseOptions = {};
const serializeOptions = () => ({
    path: publicRuntimeConfig.URL_BASE,
});

const getExpireDate = (days) => {
    const expireDate = new Date();
    const currentTime = expireDate.getTime();
    const expireTime = currentTime + 1000 * 60 * 60 * 24 * days;

    expireDate.setTime(expireTime);

    return expireDate;
};

const addOrUpdate = (ctx, cookieToAdd) => {
    // Server
    if (ctx && ctx.res) {
        let cookies = ctx.res.getHeader('Set-Cookie') || [];

        if (typeof cookies === 'string') {
            cookies = [cookieToAdd];
        }

        cookies.push(cookieToAdd);

        ctx.res.setHeader('Set-Cookie', cookies);
    }

    // Client
    if (process.browser) {
        document.cookie = cookieToAdd;
    }
};

export const addCookie = (ctx = {}, key, value) => {
    const cookieToAdd = cookie.serialize(
        key,
        value,
        Object.assign({}, serializeOptions(), { expires: getExpireDate(0.1) }),
    );

    addOrUpdate(ctx, cookieToAdd);
};

export const getCookie = (ctx = {}, key) => {
    let rawCookie;

    // Server
    if (ctx.req && ctx.req.headers.cookie) {
        rawCookie = cookie.parse(ctx.req.headers.cookie, parseOptions);
    }

    // Client
    if (process.browser) {
        rawCookie = cookie.parse(document.cookie, parseOptions);
    }

    return (rawCookie && rawCookie[key]) ? rawCookie[key] : undefined;
};

export const removeCookie = (ctx = {}, key) => {
    const cookieToAdd = cookie.serialize(key, '', Object.assign({}, serializeOptions(), { maxAge: -1 }));

    addOrUpdate(ctx, cookieToAdd);
};
