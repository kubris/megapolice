const gulp 	= require('gulp');

// Tasks
require('./gulp/dev.js');
require('./gulp/docs.js');

// ===  RUN ===
// gulp
gulp.task('default', 
	gulp.series('clean:dev', 
	gulp.parallel('pug:dev', 'sass:dev', 
	'images:dev', 'imagesWebp:dev', 
	'uploads:dev', 'uploadsWebp:dev',
	'svgSprite:dev', 'imageSvg:dev',
	'fonts:dev', 
	'js:dev', 'jsVendor:dev',
	'root:dev'),
	gulp.parallel( 'watch:dev')
));

// gulp docs
gulp.task('docs', 
	gulp.series('clean:docs', 
	gulp.parallel('pug:docs', 'sass:docs', 
	'images:docs', 'imagesWebp:docs', 
	'uploads:docs', 'uploadsWebp:docs',
	'svgSprite:docs', 'imageSvg:docs',
	'fonts:docs', 
	'js:docs', 'jsVendor:docs',
	'root:docs'),
));
// === end GULP RUN ===