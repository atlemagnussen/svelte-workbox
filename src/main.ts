import App from "./App.svelte"

const app = new App({
	target: document.body,
	props: {
		name: "workbox"
	}
})

export default app

if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.register("./sw.js", {
		"scope": "/"
	})
}