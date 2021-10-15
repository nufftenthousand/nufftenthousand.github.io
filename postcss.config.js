module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('postcss-mixins'),
    require('postcss-each'),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('postcss-custom-properties')({ preserve: false }),
    require('autoprefixer')({ grid: true }),
    require('cssnano'),
  ]
}
