import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';

// @ts-ignore
const PACKAGED_FILES = __WB_MANIFEST;

const API_CACHE = 'API_CACHE';

precacheAndRoute(PACKAGED_FILES);

registerRoute(({ url }) => {
    return url.hostname.startsWith('content.guardianapis.com');
}, new NetworkFirst({ cacheName: API_CACHE }));

/*
 *  https://developers.google.com/web/ilt/pwa/lab-caching-files-with-service-worker
 *  https://cli.vuejs.org/core-plugins/pwa.html#configuration
 *  https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
 */
// https://github.com/vuejs/vue-cli/issues/5119
