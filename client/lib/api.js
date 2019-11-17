import axios from 'axios';
import getConfig from 'next/config';

import { createFlash, addFlash } from './flashes';
import redirect from './redirect';

const { publicRuntimeConfig } = getConfig();


const errors = (ctx, error) => {
    if (error.response && error.response.status) {
        const { status } = error.response;

        if (status === 401) {
            addFlash(ctx, createFlash('error', 'You must be logged in to view this page'));

            redirect('/login');

            return false;
        }
    }

    // Unknown error
    console.error(error);

    addFlash(ctx, createFlash('error', 'Unknown error. Please contact the site administrators'));

    redirect('/');

    return false;
};

const request = async (ctx, method, url, requestData = {}) => {
    const host = publicRuntimeConfig.URL_HOST;
    const base = publicRuntimeConfig.URL_BASE;

    // Format data
    const params = (method === 'get') ? requestData : {};
    const data = (method !== 'get') ? requestData : {};

    // Put it all together
    const config = {
        baseURL: `${host}${base}api`,
        url,
        method,
        params,
        data,
        withCredentials: (method === 'delete'),
    };

    // Make the request
    try {
        const response = await axios.request(config);

        return response.data;
    } catch (error) {
        return errors(ctx, error);
    }
};


export const apiGet = async (ctx, url, data = {}) => {
    const response = await request(ctx, 'get', url, data);

    return response;
};

export const apiPost = async (ctx, url, data = {}) => {
    const response = await request(ctx, 'post', url, data);

    return response;
};

export const apiPut = async (ctx, url, data = {}) => {
    const response = await request(ctx, 'put', url, data);

    return response;
};

export const apiDelete = async (ctx, url, data = {}) => {
    const response = await request(ctx, 'delete', url, data);

    return response;
};
