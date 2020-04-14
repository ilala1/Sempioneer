module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Meta.js":
/*!****************************!*\
  !*** ./components/Meta.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);



var Meta = function Meta() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(next_head__WEBPACK_IMPORTED_MODULE_1___default.a, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    httpEquiv: "Content-Type",
    content: "text/html; charset=UTF-8"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    httpEquiv: "X-UA-Compatible",
    content: "IE=edge,chrome=1"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("meta", {
    name: "robots",
    content: "noindex"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("title", null, "Enigma DGWWP App"));
};

/* harmony default export */ __webpack_exports__["default"] = (Meta);

/***/ }),

/***/ "./components/Page.js":
/*!****************************!*\
  !*** ./components/Page.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babel-polyfill */ "babel-polyfill");
/* harmony import */ var babel_polyfill__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_polyfill__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Meta */ "./components/Meta.js");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    *, *:before, *:after {\n        box-sizing: border-box;\n        margin: 0;\n        padding: 0;\n    }\n\n    html {\n        @media ", " { font-size: 3vw; }\n        @media ", " { font-size: 1.5vw; }\n        @media ", " { font-size: 10px; }\n        @media ", " { font-size: 10px; }\n    }\n\n    body {\n        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;\n        font-size: 1.4rem;\n\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n\n        text-size-adjust: 100%;\n\n            /*\n        ----- FORM -----\n    */\n\n    input[type=\"text\"],\n    input[type=\"email\"],\n    input[type=\"number\"],\n    input[type=\"password\"],\n    input[type=\"date\"],\n    input[type=\"radio\"],\n    input[type=\"checkbox\"],\n    input[type=\"submit\"],\n    select,\n    textarea {\n        appearance: none;\n        background: none;\n\n        border: none;\n        border-radius: 0;\n        outline: none;\n\n        font-size: 1.4rem;\n    }\n    \n    button {\n        background: none;\n\n        outline: none;\n        border: none;\n\n        font-size: 1.4rem;\n    }\n\n    button,\n    input[type=\"submit\"],\n    input[type=\"button\"] { cursor: pointer; }\n\n    form button {\n        border: 1px solid black;\n\n        padding: 0.6rem 0.8rem;\n    }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }





var theme = {
  mediaMinimum: 'screen and (max-width: 640px)',
  mediaSmall: 'screen and (min-width: 640px) and (max-width: 900px)',
  mediaSmallDown: 'screen and (max-width: 900px)',
  mediaNormal: 'screen and (min-width: 901px) and (max-width: 1440px)',
  mediaMaximum: 'screen and (min-width: 1441px)',
  paddingMinimum: '1.2rem',
  paddingSmall: '2rem',
  paddingNormal: '3rem',
  paddingMaximum: 'calc(50vw - 144rem / 2)'
};
var GlobalStyle = Object(styled_components__WEBPACK_IMPORTED_MODULE_2__["createGlobalStyle"])(_templateObject(), theme.mediaMinimum, theme.mediaSmall, theme.mediaNormal, theme.mediaMaximum);

var Page =
/*#__PURE__*/
function (_Component) {
  _inherits(Page, _Component);

  function Page() {
    _classCallCheck(this, Page);

    return _possibleConstructorReturn(this, _getPrototypeOf(Page).apply(this, arguments));
  }

  _createClass(Page, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(styled_components__WEBPACK_IMPORTED_MODULE_2__["ThemeProvider"], {
        theme: theme
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Meta__WEBPACK_IMPORTED_MODULE_3__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(GlobalStyle, null), this.props.children));
    }
  }]);

  return Page;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ }),

/***/ "./lib/flashes.js":
/*!************************!*\
  !*** ./lib/flashes.js ***!
  \************************/
/*! exports provided: createFlash, removeFlashes, getFlashes, addFlash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFlash", function() { return createFlash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFlashes", function() { return removeFlashes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFlashes", function() { return getFlashes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFlash", function() { return addFlash; });
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid/v4 */ "uuid/v4");
/* harmony import */ var uuid_v4__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid_v4__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./session */ "./lib/session.js");


var createFlash = function createFlash(type, message) {
  return {
    key: uuid_v4__WEBPACK_IMPORTED_MODULE_0___default()(),
    type: type,
    message: message
  };
};
var removeFlashes = function removeFlashes(ctx) {
  Object(_session__WEBPACK_IMPORTED_MODULE_1__["removeCookie"])(ctx, 'evaFlashes');
};
var getFlashes = function getFlashes(ctx) {
  var cookieFlashes = Object(_session__WEBPACK_IMPORTED_MODULE_1__["getCookie"])(ctx, 'evaFlashes');

  if (!cookieFlashes) {
    return [];
  }

  return JSON.parse(cookieFlashes);
};
var addFlash = function addFlash(ctx, flash) {
  var flashes = getFlashes(ctx);
  flashes.push(flash);
  Object(_session__WEBPACK_IMPORTED_MODULE_1__["addCookie"])(ctx, 'evaFlashes', JSON.stringify(flashes));
};

/***/ }),

/***/ "./lib/gsc.js":
/*!********************!*\
  !*** ./lib/gsc.js ***!
  \********************/
/*! exports provided: test */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "test", function() { return test; });
var schedule = __webpack_require__(/*! node-schedule */ "node-schedule");

var test = function test(ctx) {
  console.log('hellooo');
  var j = schedule.scheduleJob('0 0 * * *', function () {
    console.log('The answer to life, the universe, and everything!');
  });
}; // test();

/***/ }),

/***/ "./lib/session.js":
/*!************************!*\
  !*** ./lib/session.js ***!
  \************************/
/*! exports provided: addCookie, getCookie, removeCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addCookie", function() { return addCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCookie", function() { return removeCookie; });
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ "cookie");
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/config */ "next/config");
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_1__);



var _getConfig = next_config__WEBPACK_IMPORTED_MODULE_1___default()(),
    publicRuntimeConfig = _getConfig.publicRuntimeConfig;

var parseOptions = {};

var serializeOptions = function serializeOptions() {
  return {
    path: publicRuntimeConfig.URL_BASE
  };
};

var getExpireDate = function getExpireDate(days) {
  var expireDate = new Date();
  var currentTime = expireDate.getTime();
  var expireTime = currentTime + 1000 * 60 * 60 * 24 * days;
  expireDate.setTime(expireTime);
  return expireDate;
};

var addOrUpdate = function addOrUpdate(ctx, cookieToAdd) {
  // Server
  if (ctx && ctx.res) {
    var cookies = ctx.res.getHeader('Set-Cookie') || [];

    if (typeof cookies === 'string') {
      cookies = [cookieToAdd];
    }

    cookies.push(cookieToAdd);
    ctx.res.setHeader('Set-Cookie', cookies);
  } // Client


  if (false) {}
};

var addCookie = function addCookie() {
  var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = arguments.length > 1 ? arguments[1] : undefined;
  var value = arguments.length > 2 ? arguments[2] : undefined;
  var cookieToAdd = cookie__WEBPACK_IMPORTED_MODULE_0___default.a.serialize(key, value, Object.assign({}, serializeOptions(), {
    expires: getExpireDate(0.1)
  }));
  addOrUpdate(ctx, cookieToAdd);
};
var getCookie = function getCookie() {
  var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = arguments.length > 1 ? arguments[1] : undefined;
  var rawCookie; // Server

  if (ctx.req && ctx.req.headers.cookie) {
    rawCookie = cookie__WEBPACK_IMPORTED_MODULE_0___default.a.parse(ctx.req.headers.cookie, parseOptions);
  } // Client


  if (false) {}

  return rawCookie && rawCookie[key] ? rawCookie[key] : undefined;
};
var removeCookie = function removeCookie() {
  var ctx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = arguments.length > 1 ? arguments[1] : undefined;
  var cookieToAdd = cookie__WEBPACK_IMPORTED_MODULE_0___default.a.serialize(key, '', Object.assign({}, serializeOptions(), {
    maxAge: -1
  }));
  addOrUpdate(ctx, cookieToAdd);
};

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/app */ "next/app");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Page */ "./components/Page.js");
/* harmony import */ var _lib_flashes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/flashes */ "./lib/flashes.js");
/* harmony import */ var _lib_gsc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/gsc */ "./lib/gsc.js");



function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var MyApp =
/*#__PURE__*/
function (_App) {
  _inherits(MyApp, _App);

  function MyApp() {
    _classCallCheck(this, MyApp);

    return _possibleConstructorReturn(this, _getPrototypeOf(MyApp).apply(this, arguments));
  }

  _createClass(MyApp, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Component = _this$props.Component,
          pageProps = _this$props.pageProps;
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(next_app__WEBPACK_IMPORTED_MODULE_2__["Container"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Page__WEBPACK_IMPORTED_MODULE_3__["default"], null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(Component, pageProps)));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(_ref) {
        var Component, ctx, pageProps;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Component = _ref.Component, ctx = _ref.ctx;
                pageProps = {}; // Props from component

                if (!Component.getInitialProps) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return Component.getInitialProps(ctx);

              case 5:
                pageProps = _context.sent;

              case 6:
                // Flashes
                pageProps.flashes = Object(_lib_flashes__WEBPACK_IMPORTED_MODULE_4__["getFlashes"])(ctx);
                return _context.abrupt("return", {
                  pageProps: pageProps
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return MyApp;
}(next_app__WEBPACK_IMPORTED_MODULE_2___default.a);

/* harmony default export */ __webpack_exports__["default"] = (MyApp);

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./pages/_app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "babel-polyfill":
/*!*********************************!*\
  !*** external "babel-polyfill" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie");

/***/ }),

/***/ "next/app":
/*!***************************!*\
  !*** external "next/app" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/app");

/***/ }),

/***/ "next/config":
/*!******************************!*\
  !*** external "next/config" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/config");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/head");

/***/ }),

/***/ "node-schedule":
/*!********************************!*\
  !*** external "node-schedule" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-schedule");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),

/***/ "uuid/v4":
/*!**************************!*\
  !*** external "uuid/v4" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid/v4");

/***/ })

/******/ });
//# sourceMappingURL=_app.js.map