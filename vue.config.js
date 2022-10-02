const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/admin/',
  // baseUrl: "/public/",
  transpileDependencies: [
    'vuetify'
  ]
})
