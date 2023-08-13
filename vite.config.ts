/*
 * @Author: panghu 760695955@qq.com
 * @Date: 2023-08-10 17:10:01
 * @LastEditors: panghu 760695955@qq.com
 * @LastEditTime: 2023-08-13 17:37:06
 * @FilePath: /leafer-board-plugin/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    resolve: {
        alias: {
            "leafer-ui": "./node_modules/leafer-ui/dist/index.js",
            "leaferSignaturePlugin": "./dist/leafer-signature-plugin.js"
        }
    },
    build: {
        lib: {
            entry: './src/package/index.ts',
            name: "leaferSignaturePlugin",
            formats: ['es', 'umd', 'iife'],
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {}
            },
        },
        sourcemap: true
    }
}) 