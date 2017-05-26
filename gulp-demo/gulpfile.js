var gulp = require('gulp'),
	copy = require('copy'),
	fs = require('fs-extra'),
	clean = require('del'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	rev = require('gulp-rev'),
	sourcemap = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'),
	notify = require('gulp-notify'),
	borwserSync = require('browser-sync'),
	// css
	scss = require('gulp-sass'),
	autofixer = require('gulp-autoprefixer'),
	cssmin = require('gulp-clean-css'),
	// js
	uglify = require('gulp-uglify'),
	// img
	imgmin = require('gulp-imagemin'),
	// html
	wrap = require('gulp-wrap'),
	htmlreplace = require('gulp-html-replace'),
	htmlmin = require('gulp-htmlmin');

var server = borwserSync.create();

gulp.task('server', function(){
	server.init({
		server: 'src/'
	});
	gulp.watch('src/scss/*.scss', ['scss']);
	gulp.watch('src/css/*.css').on('change', server.reload);
	gulp.watch('src/js/*.js').on('change', server.reload);
	gulp.watch('src/*.html').on('change', server.reload);
});

// 编译scss
gulp.task('scss', function(){
	gulp.src('src/scss/*.scss')
		.pipe(sourcemap.init())
		.pipe(plumber({errorHandler:notify.onError('Error:<%= error.message %>')}))
		.pipe(scss({
			'bundleExec': true
		}))
		.pipe(autofixer())
		.pipe(sourcemap.write('/'))
		.pipe(gulp.dest('src/css'));
});

// 清除历史版本文件
gulp.task('clean', function(cb){
	clean(['dest/*']);
	cb();
});

// 压缩复制css到dist
gulp.task('copycss', function(){
	gulp.src('src/css/*.*')
		.pipe(cssmin())
		.pipe(gulp.dest('dist/css'));
});

// 复制js到dist目录下，【不压缩，传统模式下都需要修改js】
gulp.task('copyjs', function(cb){
	fs.copy('src/js', 'dist/js', err=>{
		if(err) console.log(err);
	})
});

// 压缩复制图片到dist 【不能复制下级目录】
gulp.task('imgmin', function(){
	gulp.src('src/img/*.*')
		.pipe(imgmin({propressive: true}))
		.pipe(gulp.dest('dist/img'))
});

// 复制html到dist
gulp.task('copyhtml', function(){
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'))
})

// default
gulp.task('default', ['clean'], function(){
	gulp.start('scss', 'copycss', 'copyjs', 'imgmin', 'copyhtml');
});


// other demo
// concat、rev、rename、wrap参考api使用 
// https://www.npmjs.com

//压缩js其他方式
gulp.task('uglify',function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		// new: 压缩前修改压缩后新文件名字
		.pipe(rename(function(path){
			path.basename += '.min';
		}))
		.pipe(gulp.dest('dest/js'))
});

// html替换合并后的css和js文件名,再压缩html
gulp.task('htmlReplace',function(){
	var options = {
	    removeComments: true,//清除HTML注释
	    collapseWhitespace: true,//压缩HTML
	    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
	    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
	    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
	    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
	    minifyJS: true,//压缩页面JS
	    minifyCSS: true//压缩页面CSS
    };
	gulp.src('src/*.html')
		.pipe(htmlReplace({
			'css': 'css/style.css',
			'js': 'js/main.js'
		}))
		.pipe(minifyHtml(options))
		.pipe(gulp.dest('dest/'))
});






















