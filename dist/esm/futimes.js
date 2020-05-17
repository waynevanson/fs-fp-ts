"use strict";
exports.__esModule = true;
exports.futimes = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function futimes(accessTime, modifyTime) {
    return function (fileDescriptor) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.futimes(fileDescriptor, accessTime, modifyTime, function (e) {
                    return !e ? resolve(fileDescriptor) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.futimes = futimes;
