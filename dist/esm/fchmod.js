"use strict";
exports.__esModule = true;
exports.fchmod = void 0;
/**
 * @since 0.0.0
 */
var fs = require("fs");
var fp_ts_1 = require("fp-ts");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function fchmod(permissions) {
    return function (fileDescriptot) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.fchmod(fileDescriptot, permissions, function (e) {
                    !e ? resolve(fileDescriptot) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.fchmod = fchmod;
