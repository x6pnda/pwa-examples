const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = {
    configureWebpack: {
        plugins: [
            new InjectManifest({
                swSrc: './src/service-worker.ts',
                swDest: '/service-worker.js',
                injectionPoint: "__WB_MANIFEST",
            })
        ]
    },
}