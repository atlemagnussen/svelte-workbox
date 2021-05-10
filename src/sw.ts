declare const self: ServiceWorkerGlobalScope

import { precacheAndRoute } from "workbox-precaching"
import { registerRoute } from "workbox-routing"
import { CacheFirst } from "workbox-strategies"
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

precacheAndRoute(self.__WB_MANIFEST);
registerRoute(
    ({ request }) => {
        console.log(`request.destination: ${request.destination}`)
        console.log(`request.url: ${request.url}`)
        return request.destination === "image"
    },
    new CacheFirst({
        cacheName: "images"
    })
)

registerRoute(
    ({ url }) => {
        //console.log(`origin: ${JSON.stringify(url.origin)}`)
        //console.log(`pathname: ${JSON.stringify(url.pathname)}`)
        return url.origin === "https://jsonplaceholder.typicode.com" //&&
        //url.pathname.startsWith('/todos'),
    },
    new CacheFirst({
        cacheName: 'api-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0,200]
            })
        ]
    })
);