import svelte from "rollup-plugin-svelte"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import livereload from "rollup-plugin-livereload"
import { terser } from "rollup-plugin-terser"
import sveltePreprocess from "svelte-preprocess"
import typescript from "@rollup/plugin-typescript"
import css from "rollup-plugin-css-only"
import serve from "rollup-plugin-serve"

const production = !process.env.ROLLUP_WATCH
let env = production ? "production" : "development"

export default {
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
			sourceMap: !production,
			inlineSources: !production
		}),
		replace({
			"process.env.NODE_ENV": JSON.stringify(env),
			__buildDate__: () => JSON.stringify(new Date()),
			__buildVersion: 15,
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
};
