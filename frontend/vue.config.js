module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: 'http://192.168.43.215:3000',
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
    },
    name: 'Wize',
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    backgroundColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    manifestOptions: {
      name: 'Wize',
      start_url: '/dr/dashboard',
      background_color: '#ffffff',
    },
  },
};
