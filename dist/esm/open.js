"use strict";
exports.__esModule = true;
exports.open = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function open(flags, mode) {
    return function (path) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.open(path, flags, mode, function (e, fd) { return (!e ? resolve(fd) : reject(e)); });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.open = open;
