"use strict";
exports.__esModule = true;
exports.fdatasync = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function fdatasync(fileDescriptor) {
    return fp_ts_1.taskEither.tryCatch(function () {
        return new Promise(function (resolve, reject) {
            fs.fdatasync(fileDescriptor, function (e) {
                return !e ? resolve(fileDescriptor) : reject(e);
            });
        });
    }, util_1.enforceErrnoException);
}
exports.fdatasync = fdatasync;
