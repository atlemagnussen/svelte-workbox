import svelte from "rollup-plugin-svelte"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import livereload from "rollup-plugin-livereload"
import { terser } from "rollup-plugin-terser"
import sveltePreprocess from "svelte-preprocess"
import typescript from "@rollup/plugin-typescript"
import css from "rollup-plugin-css-only"
import serve from "rollup-plugin-serve"
import replace from "@rollup/plugin-replace"
import OMT from "@surma/rollup-plugin-off-main-thread"
//import workboxInjectManifest from "rollup-plugin-workbox-inject"
import { injectManifest } from "rollup-plugin-workbox"
//import { injectManifest } from "workbox-build"
import workboxConfig from "./workbox-config"


const production = !process.env.ROLLUP_WATCH
let env = production ? "production" : "development"
console.log(`process.env.NODE_ENV=${process.env.NODE_ENV}`)
console.log(`process.env.ROLLUP_WATCH=${process.env.ROLLUP_WATCH}`)
export default [{
	input: 'src/main.ts',
	output: {
        sourcemap: true,
        format: "esm",
        name: "app",
        dir: "public/dist"
    },
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				dev: !production
			}
		}),
		css({ output: 'bundle.css' }),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: true,
			inlineSources: true
		}),
		!production && serve({
            contentBase: "public",
            open: true,
            host: "localhost",
            port: 8000,
            historyApiFallback: true,
        }),
		!production && livereload("public"),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
},{
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
            "process.env.NODE_ENV": JSON.stringify(env),
        }),
        typescript(),
		OMT(),
		injectManifest(workboxConfig),
        terser(),
    ],
    output: {
        sourcemap: true,
        format: "amd",
        dir: "public/dist",
    },
}]
