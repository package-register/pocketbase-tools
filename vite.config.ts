import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'pocketbaseTools',
            formats: ['es', 'cjs'],
            fileName: (format) =>
                format === 'es' ? 'index.mjs' : 'index.cjs'
        },
        rollupOptions: {
            external: ['pocketbase'],
            output: {
                globals: {
                    pocketbase: 'PocketBase'
                },
                exports: 'named'
            },
        },
        minify: false
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            rollupTypes: true
        })
    ],
    optimizeDeps: {
        exclude: ['pocketbase-tools']
    }
})