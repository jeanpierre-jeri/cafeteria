const { src, dest, watch, series, parallel } = require('gulp')

// CSS Y SASS
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const cssnano = require('cssnano')

// IMAGENES
const squoosh = require('gulp-libsquoosh')

const css = () =>
  src('./src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./build/css'))

const imagenes = () =>
  src('./src/img/**/*').pipe(squoosh()).pipe(dest('build/img'))

const webpAvif = () =>
  src('src/img/**/*.{png,jpg}')
    .pipe(
      squoosh({
        webp: {},
        avif: {},
      })
    )
    .pipe(dest('build/img'))

const dev = () => {
  watch('./src/scss/**/*.scss', css)
  watch('./src/img/**/*', imagenes)
  watch('./src/img/**/*', webpAvif)
}

exports.css = css
exports.dev = series(css, dev)
exports.imagenes = imagenes
exports.webpAvif = webpAvif
exports.default = series(imagenes, webpAvif, css, dev)
