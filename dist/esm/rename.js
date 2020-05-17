"use strict";
exports.__esModule = true;
exports.rename = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function rename(f) {
    return function (currentPath) {
        var newPath = f(currentPath);
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.rename(currentPath, newPath, function (e) {
                    return !e ? resolve(newPath) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.rename = rename;
