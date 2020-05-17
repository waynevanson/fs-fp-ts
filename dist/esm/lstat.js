"use strict";
exports.__esModule = true;
exports.lstat = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function lstat(path) {
    return fp_ts_1.taskEither.tryCatch(function () {
        return new Promise(function (resolve, reject) {
            fs.lstat(path, function (e, stats) { return (!e ? resolve(stats) : reject(e)); });
        });
    }, util_1.enforceErrnoException);
}
exports.lstat = lstat;
