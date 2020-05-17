"use strict";
exports.__esModule = true;
exports.copyFile = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @todo
 *
 *  fs.constants.COPYFILE_EXCL: The copy operation will fail if dest already exists.
 *  fs.constants.COPYFILE_FICLONE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used.
 *  fs.constants.COPYFILE_FICLONE_FORCE: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.
 *
 * @since 0.0.0
 */
function copyFile(flags) {
    return function (src, dest) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.copyFile(src, dest, flags, function (e) {
                    return !e ? resolve([src, dest]) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.copyFile = copyFile;
