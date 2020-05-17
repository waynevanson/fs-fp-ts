"use strict";
exports.__esModule = true;
exports.truncate = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function truncate(length) {
    return function (pathLike) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.truncate(pathLike, length, function (e) {
                    return !e ? resolve(pathLike) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.truncate = truncate;
