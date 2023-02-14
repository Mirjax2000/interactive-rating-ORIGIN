/** @format */

const path = require('path');
const { dirname } = require('path');
const fs = require('fs');
const folderNamePath = path.dirname(__filename);
const folderName = path.basename(__dirname).replace(/\s+/g, '-');
const { exec } = require('child_process');
const filename = folderName + '.bat';
const desktopPath = path.join(require('os').homedir(), 'Desktop');
const filePath = path.join(desktopPath, filename);

console.log('jsme v adresari: ' + folderName);

let makeDir = function (cesta, message) {
    fs.mkdir(cesta, { recursive: true }, (err) => {
        if (err) throw err;
        console.log(
            `\x1b[32m- Složka:\x1b[0m \x1b[31m${message}\x1b[0m byla úspěšně vytvořena.`
        );
    });
};

let makefile = function (jmeno, message) {
    fs.writeFile(jmeno, '', function (err) {
        if (err) throw err;
        console.log(
            `\x1b[33m- Soubor:\x1b[0m \x1b[94m${message}\x1b[0m byl úspěšně vytvořen.`
        );
    });
};

let append = function (kam, co, message) {
    fs.appendFile(kam, co, function (err) {
        if (err) throw err;
        console.log(
            `Kód byl úspěšně vložen do souboru. \x1b[94m${message}\x1b[0m`
        );
    });
};

const gulpfile = `/** @format */

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const webp = require('gulp-webp');
const sourcemaps = require('gulp-sourcemaps');

function compileSass() {
    return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init()) // inicializace generování sourcemaps
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.')) // zápis sourcemaps do souboru
    .pipe(gulp.dest('./css'));
}

function compileMini() {
    return gulp
    .src('./scss/**/*.scss')
    .pipe(sourcemaps.init()) // inicializace generování sourcemaps
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.')) // zápis sourcemaps do souboru
    .pipe(gulp.dest('./css'));
}

function generateWebp() {
    return gulp
    .src('./imageInput/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(gulp.dest('./imageOutput'));
}

function watchFiles() {
    gulp.watch('./scss/**/*.scss', compileSass);
    gulp.watch('./image/**/*', gulp.series(generateWebp));
}

exports.default = gulp.series(
    compileSass,
    gulp.parallel(generateWebp),
    watchFiles
    );
    
    exports.working = gulp.series(compileSass, watchFiles);
    exports.picture = gulp.series(generateWebp);
    exports.mini = gulp.series(compileMini);
    `;

const packageJson = `{
        "name": "${folderName}",
        "version": "1.0.0",
        "description": "automaticky vytvoreno",
        "main": "gulpfile.js",
        "scripts": {
            "test": "echo \\"Error: no test specified\\" && exit 1"
        },
        "keywords": [
            "automaticky",
            "vytvoreno"
        ],
        "browserslist": [
            "defaults and supports es6-module",
            "maintained node versions",
            "last 2 version"
        ],
        "author": "Miroslav Viktorin",
        "license": "ISC",
        "devDependencies": {
            "gulp": "^4.0.2",
            "gulp-autoprefixer": "^8.0.0",
            "gulp-sass": "^5.1.0",
            "gulp-sourcemaps": "^3.0.0",
            "gulp-webp": "^4.0.1",
            "sass": "^1.58.0"
        }
    }
`;

const htmlCode = `<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<title>${folderName}</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- zadej popis stranky -->
<meta name="description" content="">
<!-- zadej klicova slova -->
<meta name="keywords" content="responsive">
<!-- zadej jmeno autora -->
<meta name="author" content="Miroslav Viktorin">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/home.css">
<link rel="shortcut icon" href="./favicon-32x32.png" type="image/x-icon">
</head>
<body>
<h1>Lets Go Biatch!!!</h1>
<script src="./js/script.js"></script>
</body>`;

const normalizecode = `html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:rgba(0,0,0,0)}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none}/*# sourceMappingURL=normalize.css.map */`;

const homeScss = `@use 'partials/root';
@use 'partials/reset';
@use 'partials/general';
@use 'partials/debug';`;

const debugScss = `
@use 'var' as *;
@use 'mix' as *;
// ---------------------
// Debug
// ---------------------

@if ($debug) {

    * {
        outline: 2px solid red
    }

    div:empty,
    span:empty,
    li:empty,
    p:empty,
    td:empty,
    th:empty {
        padding: 0.5em;
        background: yellow;
    }

    *[style],
    font,
    center {
        outline: 5px solid red;
    }

    *[class=""],
    *[id=""] {
        outline: 5px dotted red;
    }

    img[alt=""] {
        border: 3px dotted red;
    }

    img:not([alt]) {
        border: 5px solid red;
    }

    img[title=""] {
        outline: 3px dotted fuchsia;
    }

    img:not([title]) {
        outline: 5px solid fuchsia;
    }

    table:not([summary]) {
        outline: 5px solid red;
    }

    table[summary=""] {
        outline: 3px dotted red;
    }

    th {
        border: 2px solid red;
    }

    th[scope="col"],
    th[scope="row"] {
        border: none;
    }

    a[href]:not([title]) {
        border: 5px solid red;
    }

    a[title=""] {
        outline: 3px dotted red;
    }

    a[href="#"] {
        background: lime;
    }

    a[href=""] {
        background: fuchsia;
    }
}`;
const generalScss = `
@use 'var' as *;
@use 'mix' as *;

@import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;700&display=swap');

/* border-box */
*,
*::before,
*::after {
    box-sizing: inherit;
}

// --- HTML settings: box sizing, selection
html {
    @include box-sizing (border-box);
    @include selection;
}


body {
    font-family: 'Overpass', sans-serif;
    @include beathingBackround($clr11, $clr12);
}

// @media only screen and (max-width: 500px) {}
}`;

const mixScss = `
@use 'var' as *;

// --- function ---
// --- funkce 'em' na line height prepocet na em
@function em($height, $size) {
    @return calc(($height / $size) *1em);
}


// ---------------------
// Mixins
// ---------------------

// vlastnost vyberu
@mixin selection {
    ::-moz-selection {
        @content;
    }

    ::selection {
        @content;
    }
}

// zadny vyber
@mixin noSelection {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}


// $value= border-box, content-box, inherit
@mixin box-sizing ($value) {
    box-sizing: $value;
    -webkit-box-sizing: $value;
}


// zakladni layout
@mixin flex($justify: space-between, $align: flex-start, $gap: 0rem, $direction: row, $wrap: nowrap) {
    display: flex;
    flex-direction: $direction;
    flex-wrap: $wrap;
    justify-content: $justify;
    align-items: $align;
    gap: $gap;
}

// zarovnani na stred
@mixin flexCenter($justify: center, $align: center) {
    display: flex;
    justify-content: $justify;
    align-items: $align;
}


@mixin container($width: 90rem) {
    max-width: $width;
    margin: 0 auto;
    padding: 0 0rem;
}

@mixin radialGradient($background: $backroundGradient) {
    background: -webkit-radial-gradient($background);
    background: -moz-radial-gradient($background);
    background: -o-radial-gradient($background);
    background: radial-gradient($background);
}


// --- placeholders ---
%autoMargin {
    margin: 0 auto;
}

%autoWidth {
    max-width: 70%;
    @extend %autoMargin;
}

%borderRadius50 {
    border-radius: 50%;
}

%borderRadius30 {
    border-radius: 1.875rem;
}

%weight-300 {
    font-weight: 300;
}

%weight-400 {
    font-weight: 400;
}

%weight-500 {
    font-weight: 500;
}

%weight-700 {
    font-weight: 700;
}

%weight-800 {
    font-weight: 800;
}

%clr10 {
    color: $clr10;
}

%backClr10 {
    background-color: $clr10;
}

%clr11 {
    color: $clr11;
}

%backClr11 {
    background-color: $clr11;
}

%clr12 {
    color: $clr12;
}

%backClr12 {
    background-color: $clr12;
}

%clr13 {
    color: $clr13;
}

%backClr13 {
    background-color: $clr13;
}

%clr14 {
    color: $clr14;
}

%backClr14 {
    background-color: $clr14;
}

%clr15 {
    color: $clr15;
}

%backClr15 {
    background-color: $clr15;
}

%inputReset {
    outline: none;
    border: none;
}

%btn {
    @extend %clr10;
    @extend %weight-700;
    @extend %backClr12;
    width: 100%;
    padding: .8rem 0 .4rem 0;
    text-align: center;
    border-radius: 1.375rem;
    font-size: var(--btn-fs);
    line-height: em(19px, 15px);
    letter-spacing: .125rem;
    transition: background-color ease-in-out .2s, color ease-in-out .2s;
    @extend %inputReset;
}

%btn1Idle {
    @extend %btn;
    @extend %backClr12;
}

%btn1Hover {
    @extend %btn;
    @extend %backClr12;
}

%heading {
    @extend %clr10;
    @extend %weight-700;
    font-size: var(--h1-fs);
    line-height: em(35, 28);
}

%output {
    @extend %weight-400;
    @extend %clr12;
    font-size: var(--par-fs);
    line-height: em(24, 15)
}

%listItemFont {
    @extend %weight-700;
    color: $clr15;
    font-size: var(--num-fs);
    line-height: em(24, 16);
}`;

const resetScss = `

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li {
    margin: 0;
    padding: 0;
}

li {
    list-style-type: none;
}

a {
    text-decoration: none;
}

img {
    max-width: 100%;
    height: auto;
}`;

const varScss = `
// ---------------------
// Variables
// ---------------------

$debug: false;

// --- colors ---
$clr10: #ffffff;
$clr11: #969FAD;
$clr12: #FC7614;
$clr13: #262E38;
$clr14: #131518;
$clr15: #7C8798;


$backroundGradient: (
    98.96% 98.96% at 50% 0%,
    #232A34 0%,
    #181E27 100%
);
// --- break points ---


// --- font-sizes ---

$h1Max: 1.75rem; //28px
$h1Min: 1.5rem; //24px

$parMax: .9375rem; //15px
$parMin: .875rem; //14px

$btnMax: .9375rem; //15px
$btnMin: .875rem; //14px

$numMax: 1rem; //16px
$numMin: .875rem; //14px`;

const gitIgnore = `node_modules/`;

const content = `@echo off

mode con:cols=100 lines=50
color 0A
title Sass Script

start "" "C:\\Users\\Vigo\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe" -r ${folderNamePath} --wait


cd ${folderNamePath}

timeout 2
:Menu
color 0A
cls
echo -----------------------------
echo Interaktivni komponenta
echo -----------------------------
echo.

echo --------------------------------
echo Choose an option:
echo 1. DartSass service
echo 2. GulpSass service
echo 3. WebP kompilace
echo 4. Minifikace
echo --------------------------------

set /p choice=Enter choice (default is 1): 

if "%choice%"=="2" (
  call gulp working
  pause
  goto Menu
) else if "%choice%"=="3" (
  call gulp picture
  pause
  goto Menu
)else if "%choice%"=="4" (
  call gulp mini
  pause
  goto Menu
 )else (
  call sass --watch scss:css
)
`;
makeDir('./css', 'css');
makeDir('./img', 'img');
makeDir('./scss', 'scss');
makeDir('./scss/partials', 'partials');

makefile('./index.html', 'index.html');
makefile('./css/normalize.css', 'normalize.css');
makefile('./scss/home.scss', 'home.scss');
makefile('./package.json', 'package.json');
makefile('./gulpfile.js', 'gulpfile.js');
makefile('./scss/partials/_debug.scss', '_debug.scss');
makefile('./scss/partials/_general.scss', '_general.scss');
makefile('./scss/partials/_mix.scss', '_mix.scss');
makefile('./scss/partials/_reset.scss', '_reset.scss');
makefile('./scss/partials/_root.scss', '_root.scss');
makefile('./scss/partials/_var.scss', '_var.scss');
makefile('./.gitignore', 'gitignore.scss');

append('./index.html', htmlCode, 'index.html');
append('./css/normalize.css', normalizecode, 'normalize.css');
append('package.json', packageJson, 'package.json');
append('gulpfile.js', gulpfile, 'gulpfile.js');
append('./scss/home.scss', homeScss, 'home.scss');
append('./scss/partials/_debug.scss', debugScss, '_debug.scss');
append('./scss/partials/_general.scss', generalScss, '_general.scss');
append('./scss/partials/_mix.scss', mixScss, '_mix.scss');
append('./scss/partials/_reset.scss', resetScss, '_reset.scss');
append('./scss/partials/_var.scss', varScss, '_var.scss');
append('.gitignore', gitIgnore, '.gitignore');
append(filePath, content, filename);

console.log('- cekej: instaluju moduly.');

exec('npm install', (error, stdout, stderr) => {
    if (error) {
        console.error(`Chyba při spouštění příkazu: ${error}`);
        return;
    }
    console.log(`Výstup: ${stdout}`);

    exec('npm list', (error, stdout, stderr) => {
        if (error) {
            console.error(`Chyba při spouštění příkazu: ${error}`);
            return;
        }
        console.log(`Výstup: ${stdout}`);
    });
    exec('git init', (error, stdout, stderr) => {
        if (error) {
            console.error(`Chyba při spouštění příkazu: ${error}`);
            return;
        }

        console.log(`Výstup: ${stdout}`);

        exec('git add .', (error, stdout, stderr) => {
            if (error) {
                console.error(`Chyba při spouštění příkazu: ${error}`);
                return;
            }
            console.log(`Výstup: ${stdout}`);
            exec('git commit -m "init"', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Chyba při spouštění příkazu: ${error}`);
                    return;
                }
                console.log(`Výstup: ${stdout}`);
                exec('git status', (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Chyba při spouštění příkazu: ${error}`);
                        return;
                    }
                    console.log(`Výstup: ${stdout}`);
                    console.log('git byl inicializovan');
                });
            });
        });
    });
});
