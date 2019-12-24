const transformRemoveConsolePlugin = []
if (process.env.NODE_ENV === 'production') {
  transformRemoveConsolePlugin.push('transform-remove-console')
}
module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: '~theme'
        // styleLibraryName: 'theme-chalk'
      }
    ]
  ].concat(transformRemoveConsolePlugin)
}
