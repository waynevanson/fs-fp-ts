"use strict";
exports.__esModule = true;
exports.opendir = void 0;
/**
 * @since 0.0.0
 */
var fs = require("fs");
var fp_ts_1 = require("fp-ts");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function opendir(options) {
    return function (path) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.opendir(path, options, function (e, dir) {
                    return !e ? resolve(dir) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.opendir = opendir;
