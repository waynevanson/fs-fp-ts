"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.access = exports.writeFile = exports.readFile = void 0;
var fp_ts_1 = require("fp-ts");
var function_1 = require("fp-ts/lib/function");
var FS = __importStar(require("fs"));
var utilities_1 = require("../utilities");
var readFile = function (flag) { return function (path) {
    return function_1.pipe(fp_ts_1.taskEither.tryCatch(utilities_1.promise(function (executor) {
        FS.readFile(path, { flag: flag, encoding: null }, utilities_1.handleErrors(executor));
    }), utilities_1.asNodeJSError), fp_ts_1.taskEither.map(utilities_1.extractFromTuplet));
}; };
exports.readFile = readFile;
var writeFile = function (options) {
    if (options === void 0) { options = {}; }
    return function (path) { return function (data) {
        return function_1.pipe(fp_ts_1.taskEither.tryCatch(utilities_1.promise(function (executor) {
            FS.writeFile(path, data, options, utilities_1.handleErrors(executor));
        }), utilities_1.asNodeJSError), fp_ts_1.taskEither.map(function_1.constVoid));
    }; };
};
exports.writeFile = writeFile;
var access = function (mode) { return function (path) {
    return function_1.pipe(fp_ts_1.taskEither.tryCatch(utilities_1.promise(function (executor) {
        FS.access(path, mode, utilities_1.handleErrors(executor));
    }), utilities_1.asNodeJSError), fp_ts_1.taskEither.map(function_1.constVoid));
}; };
exports.access = access;
