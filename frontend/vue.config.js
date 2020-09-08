module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    proxy: 'http://localhost:3000/api/v1',
  },
};
