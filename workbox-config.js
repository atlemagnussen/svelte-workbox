export default {
    globDirectory: "public/",
    globPatterns: ["**/*.{css,html,js}", "manifest.webmanifest"],
    // globIgnores: ["sw.js", "workbox*.js"],
    // modifyURLPrefix: { 
    //     "dist/": "/dist/",
    //     "index.html": "/index.html"
    // },
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
    swSrc: "public/sw.js",
    swDest: "public/sw.js",
}