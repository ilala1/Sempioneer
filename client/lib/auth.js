import { createFlash, addFlash } from './flashes';
import redirect from './redirect';
import { addCookie, getCookie } from './session';
import { apiGet, apiPost } from '../lib/api';

export const login = async () => {

    addCookie({}, 'user', 'confirmed');
    // redirect('/login');
    console.log('tokenss');
    const testTokens = await apiPost({}, '/test', {});

    // console.log("test" + test);
    // if (response) {
    //     login();
    // }
    console.log(testTokens);
};

export const adminLogin = (email, password) => {
    const admin = [email, password];
    addCookie({}, 'admin', admin);
    redirect('/nominations');
};

export const isLoggedIn = (ctx) => {
    const userCookie = getCookie(ctx, 'user');
    const adminCookie = getCookie(ctx, 'admin');

    if (userCookie) {
        return true;
    }

    if (adminCookie) {
        return true;
    }
    return false;
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
        redirect('/', ctx);
        return true;
    }

    return false;
};

export const redirectIfNotAuthenticated = (ctx) => {
    if (!isLoggedIn(ctx)) {
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
