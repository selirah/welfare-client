const CracoLessPlugin = require('craco-less')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@font-family': 'Play',
              '@primary-color': '#7367f0',
              '@link-color': '#7367f0',
              '@success-color': '#28c76f',
              '@warning-color': '#ff9f43',
              '@error-color': '#ea5455',
              '@font-size-base': '14px',
              '@heading-color': '#5e5873',
              '@text-color': '#596879',
              '@text-color-secondary': '#677585',
              '@disabled-color': '#b9b9c3',
              '@border-radius-base': '0.2rem',
              '@border-color-base': '#ebe9f1'
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
}
