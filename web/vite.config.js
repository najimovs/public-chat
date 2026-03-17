import path from "node:path"
import { defineConfig } from "vite"

export default defineConfig( {
	server: {
		host: true,
		port: 5173,
	},
	build: {
		target: "esnext",
		chunkSizeWarningLimit: 1024,
	},
	resolve: {
		alias: {
			"@app": path.resolve( __dirname, "./src/app" ),
			"@css": path.resolve( __dirname, "./src/css" ),
			"@lib": path.resolve( __dirname, "./src/library" ),
		},
	},
} )
