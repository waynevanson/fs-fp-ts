"use strict";
exports.__esModule = true;
exports.symlink = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @todo research fs.symlink
 * @since 0.0.0
 */
function symlink() {
    return function () {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.symlink;
            });
        }, util_1.enforceErrnoException);
    };
}
exports.symlink = symlink;
