const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "./src/styles/_variables.scss", "./src/styles/_normalize.scss", "./src/styles/_global.scss";`,
            }
        }
    },
    configureWebpack: {
        plugins: [
            new InjectManifest({
                swSrc: './src/service-worker.ts',
                swDest: '/service-worker.js',
                injectionPoint: "__WB_MANIFEST",
                maximumFileSizeToCacheInBytes: 5000000 // 5 MB
            })
        ]
    },
}