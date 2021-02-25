"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFromTuplet = exports.promise = exports.handleErrors = exports.declass = exports.tryCatchNodeJSError = exports.asNodeJSError = void 0;
var fp_ts_1 = require("fp-ts");
var function_1 = require("fp-ts/lib/function");
var asNodeJSError = function (a) { return a; };
exports.asNodeJSError = asNodeJSError;
var tryCatchNodeJSError = function (f) {
    return fp_ts_1.taskEither.tryCatch(f, exports.asNodeJSError);
};
exports.tryCatchNodeJSError = tryCatchNodeJSError;
var declass = function (constructor) { return function () {
    var r = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        r[_i] = arguments[_i];
    }
    return new (constructor.bind.apply(constructor, __spreadArrays([void 0], r)))();
}; };
exports.declass = declass;
var handleErrors = function (_a) {
    var res = _a[0], rej = _a[1];
    return function (error) {
        var ax = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            ax[_i - 1] = arguments[_i];
        }
        return function_1.pipe(error, fp_ts_1.either.fromNullable(ax), fp_ts_1.either.swap, fp_ts_1.either.fold(rej, res));
    };
};
exports.handleErrors = handleErrors;
var promise = function (f) { return function () { return new Promise(function (res, rej) { return f([res, rej]); }); }; };
exports.promise = promise;
var extractFromTuplet = function (fa) { return fa[0]; };
exports.extractFromTuplet = extractFromTuplet;
