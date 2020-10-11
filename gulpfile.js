
const { series, src, dest } = require("gulp");
const uglify_es = require("gulp-uglify-es").default;
const rename = require("gulp-rename");
const header = require('gulp-header');


function uglify(cb) {
    return src("bitvec.js")
        .pipe(rename("bitvec.min.js"))
        .pipe(uglify_es())
        .pipe(dest("."));
}

function addCopyright(cb) {
    return src("bitvec.min.js")
        .pipe(header(copyright))
        .pipe(dest("."));
}

let copyright = [
    "// BitVec.js - A high performance JavaScript bit vector class.",
    "// Copyright (C) 2020 William Wong (williamw520@gmail.com).  All rights reserved.",
    "",
].join("\n");

exports.default = series(uglify);

