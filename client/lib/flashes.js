import uuidv4 from 'uuid/v4';

import { getCookie, addCookie, removeCookie } from './session';

export const createFlash = (type, message) => ({
    key: uuidv4(),
    type,
    message,
});

export const removeFlashes = (ctx) => {
    removeCookie(ctx, 'evaFlashes');
};

export const getFlashes = (ctx) => {
    const cookieFlashes = getCookie(ctx, 'evaFlashes');

    if (!cookieFlashes) {
        return [];
    }

    return JSON.parse(cookieFlashes);
};

export const addFlash = (ctx, flash) => {
    const flashes = getFlashes(ctx);

    flashes.push(flash);

    addCookie(ctx, 'evaFlashes', JSON.stringify(flashes));
};
