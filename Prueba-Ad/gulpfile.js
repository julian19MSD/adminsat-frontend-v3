var gulp = require('gulp');
var streamqueue = require('streamqueue');
var concat = require('gulp-concat');
var minifyCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify-es').default;
var fs = require("fs");
var tinycolor = require("tinycolor2");


 //var s3 = require('gulp-s3-upload')(JSON.parse(fs.readFileSync('./awsaccess.json')), { /* S3 Config */});

const items = [['##0026e3', 210]];

var index = 0;

//  ['constantin', 'traditional'];
const algorithms = 'constantin';

gulp.task('theme-css', done => {
  compileTask(index);
  done();
});

gulp.task('build-css', (done) => {
  gulp.src('node_modules/quill/dist/quill.snow.css')
    .pipe(minifyCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('src/assets/css'));

  gulp.src('node_modules/quill/dist/quill.bubble.css')
    .pipe(minifyCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('src/assets/css'));

  gulp.src('node_modules/quill/dist/quill.bubble.css')
    .pipe(minifyCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('src/assets/css'));

  done();
});

gulp.task('build-js', (done) => {
  gulp.src([
    'node_modules/simple-web-notification/web-notification.js',
  ])
    .pipe(concat({path: 'web-notification.js'}))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('src/assets/js'));

  gulp.src([
    'node_modules/quill/dist/quill.min.js',
  ])
    .pipe(gulp.dest('src/assets/js'));

  gulp.src([
    'node_modules/quill/dist/quill.min.js.map',
  ])
    .pipe(gulp.dest('src/assets/js'));

  gulp.src([
    'node_modules/@google/markerclustererplus/dist/markerclustererplus.min.js',
  ])
    .pipe(gulp.dest('src/assets/js'));

  done();
});

function compileTask() {

  const color = computeColors(items[index][0]);

  var data = createMTwoPaletteCode({name: 'adminsat', colors: color});

  fs.writeFile("src/assets-sources/scss/material/custom/_material.palette.scss", data, (err) => {
    if (err) console.log('error',err);
    console.log("Successfully Written to File.");
  });

  return gulp.src('src/assets-sources/scss/material/custom/material.scss').pipe(sass().on('error', sass.logError))
    .pipe(concat({path: 'theme.css'}))
    .pipe(minifyCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    // .pipe(gulp.dest('src/assets-sources/scss/material/custom/output'))
    .pipe(s3({
      Bucket: 'adminsat',
      ACL: 'public-read',
      keyTransform: function (relative_filename) {
        return `uploads/clientes/${items[index][1]}/tema/${relative_filename}`;
      }
    }))
    .on('end', function () {
      index++;
      if (index < items.length) {
        compileTask(index)
      }
    });
}

function computeColors(hex) {
  // Return array of color objects.
  if (algorithms === 'constantin') {
    var baseLight = tinycolor('#00386b');
    var baseDark = multiply(tinycolor(hex).toRgb(), tinycolor(hex).toRgb());
    var baseTriad = tinycolor(hex).tetrad();
    return [
      getColorObject(tinycolor.mix(baseLight, hex, 12), '50'),
      getColorObject(tinycolor.mix(baseLight, hex, 30), '100'),
      getColorObject(tinycolor.mix(baseLight, hex, 50), '200'),
      getColorObject(tinycolor.mix(baseLight, hex, 70), '300'),
      getColorObject(tinycolor.mix(baseLight, hex, 85), '400'),
      getColorObject(tinycolor.mix(baseLight, hex, 100), '500'),
      getColorObject(tinycolor.mix(baseDark, hex, 87), '600'),
      getColorObject(tinycolor.mix(baseDark, hex, 70), '700'),
      getColorObject(tinycolor.mix(baseDark, hex, 54), '800'),
      getColorObject(tinycolor.mix(baseDark, hex, 25), '900'),
      getColorObject(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(80).lighten(65), 'A100'),
      getColorObject(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(80).lighten(55), 'A200'),
      getColorObject(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(100).lighten(45), 'A400'),
      getColorObject(tinycolor.mix(baseDark, baseTriad[4], 15).saturate(100).lighten(40), 'A700')
    ];
  } else {
    return [
      getColorObject(tinycolor(hex).lighten(52), '50'),
      getColorObject(tinycolor(hex).lighten(37), '100'),
      getColorObject(tinycolor(hex).lighten(26), '200'),
      getColorObject(tinycolor(hex).lighten(12), '300'),
      getColorObject(tinycolor(hex).lighten(6), '400'),
      getColorObject(tinycolor(hex), '500'),
      getColorObject(tinycolor(hex).darken(6), '600'),
      getColorObject(tinycolor(hex).darken(12), '700'),
      getColorObject(tinycolor(hex).darken(18), '800'),
      getColorObject(tinycolor(hex).darken(24), '900'),
      getColorObject(tinycolor(hex).lighten(50).saturate(30), 'A100'),
      getColorObject(tinycolor(hex).lighten(30).saturate(30), 'A200'),
      getColorObject(tinycolor(hex).lighten(10).saturate(15), 'A400'),
      getColorObject(tinycolor(hex).lighten(5).saturate(5), 'A700')
    ];
  }
}

// Utility function to combine two rgb objects via Multiply
function multiply(rgb1, rgb2) {
  rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
  rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
  rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
  return tinycolor('rgb ' + rgb1.r + ' ' + rgb1.g + ' ' + rgb1.b);
}


function getColorObject(value, name) {
  var c = tinycolor(value);
  return {
    name: name,
    hex: c.toHexString(),
    darkContrast: c.isLight()
  };
}


// Code for Angular Material 2
function createMTwoPaletteCode(palette) {
  var code = '';

  // Generate base colors
  code += '$mat-' + palette.name + ': (\n';

  palette.colors.forEach(value => {
    code += "    " + value.name + " : " + tinycolor(value.hex).toHexString() + ',\n';
  });


  // Generate the contrast variables
  code += '    contrast: (\n';


  palette.colors.forEach(value => {
    var contrast = ''
    if (value.darkContrast) {
      contrast = '#000000';
    } else {
      contrast = '#ffffff';
    }
    code += "        " + value.name + " : " + contrast + ',\n';
  });


  code += '    )\n';

  code += ');\n\n';

  return code;
}
