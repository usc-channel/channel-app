module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@components': './src/components',
          '@config': './src/config',
          '@pages': './src/pages',
          '@types': './src/types',
          '@util': './src/util',
          '@actions': './src/actions',
          '@reducers': './src/reducers',
          '@data': './src/data',
        },
      },
    ],
  ],
}
