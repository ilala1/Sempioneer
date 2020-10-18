import { createFlash, addFlash } from './flashes';
import redirect from './redirect';
import { addCookie, getCookie } from './session';
import { apiGet, apiPost } from '../lib/api';

export const login = async (id) => {
    addCookie({}, 'user', `${id}`);
    // redirect('/');
};

export const isLoggedIn = (ctx) => {
    const userCookie = getCookie(ctx, 'user');
    console.log('checking if user is logged in')


    if (userCookie) {
        if (userCookie === undefined) {
            console.log('no user ID -- auth.js ----- not logged in')
            // redirect('/login');
        }
    }
    console.log('user ID -- auth.js ------ Logged in')
    return true;
};

export const isAdmin = (ctx) => {
    const adminCookie = getCookie(ctx, 'admin');

    if (adminCookie) {
        return true;
    }
    return false;
};

export const redirectIfAuthenticated = (ctx) => {
    if (isLoggedIn(ctx)) {
        redirect('/index', ctx);
        return true;
    }

    return false;
};

export const redirectIfNotAuthenticated = (ctx) => {
    console.log('redirect if not Authenticated')
    if (!isLoggedIn(ctx)) {
        console.log('not logged in')
        // Build error flash and then bounce to login`
        const flash = createFlash('error', 'You must be logged in to view this page');
        addFlash(ctx, flash);

        redirect('/login', ctx);
        return true;
    }

    return false;
};

export const redirectIfNoAccess = (ctx) => {
    if (!isAdmin(ctx)) {
        // Build error flash and then bounce to login`
        const flash = createFlash('error', 'You must be admin to view this page');

        addFlash(ctx, flash);

        redirect('/admin', ctx);
        return true;
    }

    return false;
};
