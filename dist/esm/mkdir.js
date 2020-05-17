"use strict";
exports.__esModule = true;
exports.mkdir = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function mkdir(options) {
    return function (path) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.mkdir(path, options, function (e) { return (!e ? resolve(path) : reject(e)); });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.mkdir = mkdir;
