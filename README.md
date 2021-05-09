# svelte and workbox

try to make [this](https://developers.google.com/web/tools/workbox/guides/using-bundlers) work like an offline PWA

## key takeaways
- put serviceworker in root / - will save you trouble
- you are suppose to build sw.js separately with bundler (rollup) - and not as a part of your regular build - you can define an array of input/output setups in rollup.config.js or you can have separate config files
- you also seem to need webmanifest file for offline to work. And yes, you should also cache this in the sw