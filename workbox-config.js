export default {
    globDirectory: "public/",
    globPatterns: ["**/*.{css,html,js}"],
    // globIgnores: ["sw.js", "workbox*.js"],
    modifyURLPrefix: { 
        "dist/": "/dist/",
        "index.html": "/index.html"
    },
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
    swSrc: "public/dist/sw.js",
    swDest: "public/dist/sw.js",
}