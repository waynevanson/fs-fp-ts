"use strict";
exports.__esModule = true;
exports.ftruncate = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function ftruncate(length) {
    return function (fileDescriptor) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.ftruncate(fileDescriptor, function (e) {
                    return !e ? resolve(fileDescriptor) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.ftruncate = ftruncate;
