"use strict";
exports.__esModule = true;
exports.realpath = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function realpath(type) {
    var options = {
        encoding: type === "Buffer" ? null : type
    };
    return function (pathLike) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.realpath(pathLike, options, function (e, data) {
                    return !e ? resolve(data) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.realpath = realpath;
