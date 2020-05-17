"use strict";
exports.__esModule = true;
exports.access = void 0;
/**
 * @since 0.0.0
 */
var fp_ts_1 = require("fp-ts");
var pipeable_1 = require("fp-ts/lib/pipeable");
var fs = require("fs");
var util_1 = require("./util");
/**
 * @since 0.0.0
 */
function getAccessMode(a) {
    switch (a) {
        case "executable":
            return fs.constants.X_OK;
        case "readable":
            return fs.constants.R_OK;
        case "writeable":
            return fs.constants.W_OK;
        case "visible":
        default:
            return fs.constants.F_OK;
    }
}
function transformAccessModes(a) {
    return pipeable_1.pipe(a, fp_ts_1.array.uniq(fp_ts_1.eq.eqString), fp_ts_1.array.map(getAccessMode), fp_ts_1.array.reduce(0, function (prev, curr) { return prev | curr; }));
}
/**
 * @todo uniquify `modes` arguments at type level
 *
 *  @since 0.0.0
 */
function access() {
    var modes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        modes[_i] = arguments[_i];
    }
    var newModes = transformAccessModes(modes);
    return function (pathLike) {
        return fp_ts_1.taskEither.tryCatch(function () {
            return new Promise(function (resolve, reject) {
                fs.access(pathLike, newModes, function (e) {
                    !e ? resolve(pathLike) : reject(e);
                });
            });
        }, util_1.enforceErrnoException);
    };
}
exports.access = access;
