"use strict";
exports.__esModule = true;
exports.writeFile = void 0;
/**
 * @since 0.0.0
 */
var fs = require("fs");
var fp_ts_1 = require("fp-ts");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function writeFile(options) {
    return function (path, data) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.writeFile(path, data, options, function (e) {
                    return !e ? resolve(path) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.writeFile = writeFile;
