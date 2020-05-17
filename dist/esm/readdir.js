"use strict";
exports.__esModule = true;
exports.readdir = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var fs = require("fs");
var util_1 = require("./util");
function transformTypeToOptions(type) {
    switch (type) {
        case "Buffer": {
            return { encoding: null, withFileTypes: false };
        }
        case "Dirent": {
            return { encoding: null, withFileTypes: true };
        }
        default: {
            return { encoding: type, withFileTypes: false };
        }
    }
}
function readdir(type) {
    var options = transformTypeToOptions(type);
    return function (path) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.readdir(path, options, function (e, strings) {
                    return !e ? resolve(strings) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.readdir = readdir;
