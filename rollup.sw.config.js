import { terser } from "rollup-plugin-terser"
import commonjs from "@rollup/plugin-commonjs"
import OMT from "@surma/rollup-plugin-off-main-thread"
import replace from "@rollup/plugin-replace"
import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import workboxInjectManifest from "rollup-plugin-workbox-inject"


export default {
    input: "src/sw.ts",
    manualChunks: (id) => {
        if (!id.includes("/node_modules/")) {
            return undefined
        }

        const chunkNames = ["workbox"]
        return chunkNames.find((chunkName) => id.includes(chunkName)) || "misc"
    },
    plugins: [
        resolve({
            browser: true,
        }),
        commonjs(),
        replace({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
        }),
        typescript(),
        OMT(),
        workboxInjectManifest({
          globDirectory: BUILD_DIR,
          globPatterns: [
            "**/*.{json,njk}",
            "index.html",
          ],
        }),
        terser(),
    ],
    output: {
        sourcemap: true,
        format: "amd",
        dir: "public/dist",
    },
}