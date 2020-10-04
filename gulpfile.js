
const { series, src, dest } = require("gulp");
const uglify_es = require("gulp-uglify-es").default;
const rename = require("gulp-rename");


function uglify(cb) {
    return src("bitvec.js")
        .pipe(rename("bitvec.min.js"))
        .pipe(uglify_es())
        .pipe(dest("."));
}

exports.default = series(uglify);

