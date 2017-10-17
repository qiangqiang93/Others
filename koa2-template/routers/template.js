module.exports = [
    // normal
    {
        url: '/',
        method: 'get',
        controller: controller
    },
    // valid-code
    {
        url: '/validCode',
        method: 'get',
        controller: controller
    },
    // upload-file
    {
        url: '/upload',
        method: 'post',
        config: uploadConfig.array('files'),
        controller: controller
    }
]