module.exports = {
    pwa: {
        name: 'example-vue3',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.ts',
            swDest: 'service-worker.js'
        }
    }
}