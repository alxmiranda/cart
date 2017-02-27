"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

['a', 1, true].forEach(function (e) {
    console.log(typeof e === "undefined" ? "undefined" : _typeof(e));
});
console.log("molecules".length);