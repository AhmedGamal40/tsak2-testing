const globs = {
    htmlPath:'iphone.html',
    cssPath:'style.css',
    jsPath:'iphone.js',
    imagePath:'./image/*'
}


const {src , dest } = require('gulp');
// image

const optimaizeImage = require('gulp-optimize-images')

function images(){
    return   src(globs.imagePath).pipe(optimaizeImage({ compressOptions
         :{
            jpeg: {
                quality: 80,
                progressive: true,
            },
            png: {
                quality: 90,
                progressive: true,
                compressionLevel: 6,
            },
            webp: {
                quality: 80,
            },
        }
    })).pipe(dest('dist/assets/images'))
}
exports.image=images;


 // Html 
 const htmlMini = require('gulp-html-minifier-terser')

function htmlTask(){
    return src(globs.htmlPath).pipe(htmlMini({ collapseWhitespace: true , removeComments: true})).pipe(dest('dist'))  
}
 exports.html=htmlTask;



 // Css
 var concat = require('gulp-concat');
 const cleanCSS = require('gulp-clean-css');


function cssTask(){
    return src(globs.cssPath)
    .pipe(concat('style.min.css'))
     .pipe(cleanCSS())
     .pipe(dest('dist/assets/css'))
}
exports.css=cssTask;



 // JS 
 const terser = require('gulp-terser')
 function jsTask(){
    return src(globs.jsPath)
    .pipe(concat('script.min.js'))
     .pipe(terser())
     .pipe(dest('dist/assets/js'))
}
exports.js=jsTask;
