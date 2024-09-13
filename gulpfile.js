import gulp from 'gulp';
import uglify from 'gulp-uglify';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import { deleteAsync } from 'del';

// Tarea para limpiar el directorio de salida
export function clean() {
    return deleteAsync(['frontend/assets/js/*.js', 'frontend/assets/css/*.css']);
}

// Tarea para combinar y minificar archivos JavaScript
export function scripts() {
    return gulp.src('frontend/js/**/*.js') // Asegúrate de que esta ruta sea correcta
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('frontend/assets/js'));
}

// Tarea para combinar y minificar archivos CSS
export function styles() {
    return gulp.src('frontend/css/**/*.css')
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('frontend/assets/css'));
}

// Tarea por defecto que ejecuta clean, scripts y styles
const build = gulp.series(clean, gulp.parallel(scripts, styles));
export default build;
