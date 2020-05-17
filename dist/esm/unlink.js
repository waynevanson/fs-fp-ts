"use strict";
exports.__esModule = true;
exports.unlink = void 0;
/**
 * @since 0.0.0
 */
var fs = require("fs");
var fp_ts_1 = require("fp-ts");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function unlink(path) {
    return fp_ts_1.taskEither.tryCatch(function () {
        return new Promise(function (resolve, reject) {
            fs.unlink(path, function (e) { return (!e ? resolve(path) : reject(e)); });
        });
    }, util_1.enforceErrnoException);
}
exports.unlink = unlink;
