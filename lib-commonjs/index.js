'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopNamespace(e) {
    if (e && e.__esModule) { return e; } else {
        var n = {};
        if (e) {
            Object.keys(e).forEach(function (k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            });
        }
        n['default'] = e;
        return n;
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var Queue = /** @class */ (function () {
    function Queue() {
    }
    Queue.enqueue = function (promise) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queue.push({
                promise: promise,
                resolve: resolve,
                reject: reject,
            });
            _this.dequeue();
        });
    };
    Queue.dequeue = function () {
        var _this = this;
        if (this.workingOnPromise) {
            return false;
        }
        var item = this.queue.shift();
        if (!item) {
            return false;
        }
        try {
            this.workingOnPromise = true;
            item.promise()
                .then(function (value) {
                _this.workingOnPromise = false;
                item.resolve(value);
                _this.dequeue();
            })
                .catch(function (err) {
                _this.workingOnPromise = false;
                item.reject(err);
                _this.dequeue();
            });
        }
        catch (err) {
            this.workingOnPromise = false;
            item.reject(err);
            this.dequeue();
        }
        return true;
    };
    Queue.queue = [];
    Queue.workingOnPromise = false;
    return Queue;
}());

function importModulePromise(loadPath) {
    return __awaiter(this, void 0, void 0, function () {
        function defineLoader(_requirment, factory) {
            var result = factory();
            if (typeof result === 'function') {
                defined = __assign({ default: result() }, result.prototype);
            }
            else {
                defined = result;
            }
        }
        var _module, _exports, _define, defined, exported, mergeExports;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _module = window.module;
                    _exports = window.exports;
                    _define = window.define;
                    defined = {};
                    defineLoader.amd = true;
                    window.module = {};
                    window.exports = {};
                    window.define = defineLoader;
                    return [4 /*yield*/, Promise.resolve().then(function () { return _interopNamespace(require(loadPath)); })];
                case 1:
                    exported = _a.sent();
                    mergeExports = __assign(__assign(__assign(__assign({}, window.module.exports), exported), window.exports), defined);
                    window.module = _module;
                    window.define = _define;
                    window.exports = _exports;
                    return [2 /*return*/, mergeExports];
            }
        });
    });
}
var importModule = function (path) {
    return Queue.enqueue(function () { return importModulePromise(path); });
};

exports.importModule = importModule;
