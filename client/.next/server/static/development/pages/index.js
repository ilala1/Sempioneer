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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Header.js":
/*!******************************!*\
  !*** ./components/Header.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);


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
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    padding: 2rem 0;\n    h1 {\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        width: 100%;\n        height: 100%;\n        text-align: center;\n        letter-spacing: 0.6rem;\n        padding: 7rem 0 5rem;\n        font-size: 2rem;\n    }\n\n    h3 {\n        padding: 2rem 0;\n    }\n\n    span {\n        color: #00a9e0;\n    }\n    @media only screen and (max-width: 640px) {\n        h1 {\n            padding-top: 2rem;\n            letter-spacing: 0;\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }



var HeaderWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject());

var Header =
/*#__PURE__*/
function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _getPrototypeOf(Header).apply(this, arguments));
  }

  _createClass(Header, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(HeaderWrapper, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "D"), "o\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "G"), "reat\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "W"), "ork\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "W"), "in\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "P"), "rizes"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
        src: "./static/images/logo.png",
        alt: "logo"
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, this.props.title));
    }
  }]);

  return Header;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./components/Nav.js":
/*!***************************!*\
  !*** ./components/Nav.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/session */ "./lib/session.js");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    padding: 2rem 2rem 0;\n    width: 100%;\n    a {\n        border: 1px solid black;\n        padding: 0.65rem 0.8rem;\n        color: #000;\n        text-decoration: none;\n        font-size: 1.45rem;\n        :hover {\n            background: #00a9e0;\n            color: #fff;\n        }\n    }\n    .logout {\n        margin-left: auto;\n        padding-right: 2rem;\n        button {\n            border: 1px solid black;\n            padding: 0.6rem 0.8rem;\n            :hover {\n                background: #00a9e0;\n                color: #fff;\n            }\n        }\n    }\n    @media only screen and (max-width: 640px) {\n\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var NavWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject());

var Nav =
/*#__PURE__*/
function (_Component) {
  _inherits(Nav, _Component);

  function Nav() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Nav);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Nav)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "logout", function () {
      var userCookie = Object(_lib_session__WEBPACK_IMPORTED_MODULE_2__["getCookie"])({}, 'user');
      var adminCookie = Object(_lib_session__WEBPACK_IMPORTED_MODULE_2__["getCookie"])({}, 'admin');

      if (userCookie || adminCookie) {
        Object(_lib_session__WEBPACK_IMPORTED_MODULE_2__["removeCookie"])({}, 'user');
        Object(_lib_session__WEBPACK_IMPORTED_MODULE_2__["removeCookie"])({}, 'admin');
        window.location.reload();
      }
    });

    return _this;
  }

  _createClass(Nav, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NavWrapper, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "/"
      }, "Home"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "logout"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        onClick: this.logout
      }, "Logout")));
    }
  }]);

  return Nav;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Nav);

/***/ }),

/***/ "./components/Options.js":
/*!*******************************!*\
  !*** ./components/Options.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/session */ "./lib/session.js");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    padding: 2rem 2rem 0;\n    width: 100%;\n    .optionsWrapper {\n        display: flex;\n        text-align: center;\n        align-content: center;\n        &.inView {\n            .vote {\n                opacity:1;\n                transform:translateX(0);\n                transition:all 1.5s ease;\n            }\n            .nominate {\n                opacity:1;\n                transform:translateX(0);\n                transition:all 1.5s ease;\n            }\n\t    }\n        .options {\n            text-decoration: none;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            width: 15rem;\n            min-height: 15rem;\n            padding: 0 1.125rem;\n            margin: 2rem;\n            transition: all .3s ease;\n            background: none;\n            outline: none;\n            border: 2px solid #00a9e0;\n            box-shadow: 3px 3px 5px 0 rgba(0,0,0,.5);\n            cursor: pointer;\n            font-family: helvetica-regular,Arial,sans-serif;\n            font-size: 2rem;\n            line-height: 1.375rem;\n            color: #000;\n            :hover {\n                    background: #00a9e0;\n                    color: #fff;\n            }\n\n        }\n        .vote {\n            opacity:0.01;\n            transform:translateX(-50%);\n            transition:all 1.5s ease;\n        }\n        .nominate {\n            opacity:0.01;\n            transform:translateX(50%);\n            transition:all 1.5s ease;\n        }\n    }\n    @media only screen and (max-width: 640px) {\n        .optionsWrapper {\n            flex-direction: column;\n        }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var OptionsWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div(_templateObject());

var Options =
/*#__PURE__*/
function (_Component) {
  _inherits(Options, _Component);

  function Options() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Options);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Options)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "logout", function () {
      var userCookie = Object(_lib_session__WEBPACK_IMPORTED_MODULE_2__["getCookie"])({}, 'user');
      var adminCookie = Object(_lib_session__WEBPACK_IMPORTED_MODULE_2__["getCookie"])({}, 'admin');

      if (userCookie || adminCookie) {
        Object(_lib_session__WEBPACK_IMPORTED_MODULE_2__["removeCookie"])({}, 'user');
        Object(_lib_session__WEBPACK_IMPORTED_MODULE_2__["removeCookie"])({}, 'admin');
        window.location.reload();
      }
    });

    return _this;
  }

  _createClass(Options, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      $.fn.isInViewport = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
      };

      $('.optionsWrapper').each(function () {
        if ($(this).isInViewport()) {
          console.log('in view');
          $(this).addClass('inView');
        } else {
          $(this).removeClass('inView');
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(OptionsWrapper, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "optionsWrapper"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "options vote",
        href: "/voting"
      }, "Vote"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "options nominate",
        href: "/nominate"
      }, "Nominate")));
    }
  }]);

  return Options;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Options);

/***/ }),

/***/ "./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/*! exports provided: login, adminLogin, isLoggedIn, isAdmin, redirectIfAuthenticated, redirectIfNotAuthenticated, redirectIfNoAccess */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "adminLogin", function() { return adminLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLoggedIn", function() { return isLoggedIn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAdmin", function() { return isAdmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redirectIfAuthenticated", function() { return redirectIfAuthenticated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redirectIfNotAuthenticated", function() { return redirectIfNotAuthenticated; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redirectIfNoAccess", function() { return redirectIfNoAccess; });
/* harmony import */ var _flashes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flashes */ "./lib/flashes.js");
/* harmony import */ var _redirect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./redirect */ "./lib/redirect.js");
/* harmony import */ var _session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./session */ "./lib/session.js");



var login = function login(user) {
  console.log(user);
  Object(_session__WEBPACK_IMPORTED_MODULE_2__["addCookie"])({}, 'user', user);
  Object(_redirect__WEBPACK_IMPORTED_MODULE_1__["default"])('/');
};
var adminLogin = function adminLogin(email, password) {
  var admin = [email, password];
  Object(_session__WEBPACK_IMPORTED_MODULE_2__["addCookie"])({}, 'admin', admin);
  Object(_redirect__WEBPACK_IMPORTED_MODULE_1__["default"])('/nominations');
};
var isLoggedIn = function isLoggedIn(ctx) {
  var userCookie = Object(_session__WEBPACK_IMPORTED_MODULE_2__["getCookie"])(ctx, 'user');
  var adminCookie = Object(_session__WEBPACK_IMPORTED_MODULE_2__["getCookie"])(ctx, 'admin');

  if (userCookie) {
    return true;
  }

  if (adminCookie) {
    return true;
  }

  return false;
};
var isAdmin = function isAdmin(ctx) {
  var adminCookie = Object(_session__WEBPACK_IMPORTED_MODULE_2__["getCookie"])(ctx, 'admin');

  if (adminCookie) {
    return true;
  }

  return false;
};
var redirectIfAuthenticated = function redirectIfAuthenticated(ctx) {
  if (isLoggedIn(ctx)) {
    Object(_redirect__WEBPACK_IMPORTED_MODULE_1__["default"])('/', ctx);
    return true;
  }

  return false;
};
var redirectIfNotAuthenticated = function redirectIfNotAuthenticated(ctx) {
  if (!isLoggedIn(ctx)) {
    // Build error flash and then bounce to login`
    var flash = Object(_flashes__WEBPACK_IMPORTED_MODULE_0__["createFlash"])('error', 'You must be logged in to view this page');
    Object(_flashes__WEBPACK_IMPORTED_MODULE_0__["addFlash"])(ctx, flash);
    Object(_redirect__WEBPACK_IMPORTED_MODULE_1__["default"])('/login', ctx);
    return true;
  }

  return false;
};
var redirectIfNoAccess = function redirectIfNoAccess(ctx) {
  if (!isAdmin(ctx)) {
    // Build error flash and then bounce to login`
    var flash = Object(_flashes__WEBPACK_IMPORTED_MODULE_0__["createFlash"])('error', 'You must be admin to view this page');
    Object(_flashes__WEBPACK_IMPORTED_MODULE_0__["addFlash"])(ctx, flash);
    Object(_redirect__WEBPACK_IMPORTED_MODULE_1__["default"])('/admin', ctx);
    return true;
  }

  return false;
};

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var GoogleAuth;
console.log('hello'); // var SCOPE = 'https://www.googleapis.com/auth/drive.metadata.readonly';

var SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

function handleClientLoad() {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient);
}

function initClient() {
  // Retrieve the discovery document for version 3 of Google Drive API.
  // In practice, your app can retrieve one or more discovery documents.
  // var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/webmasters/v3/rest'; // Initialize the gapi.client object, which app uses to make API requests.
  // Get API key and client ID from API Console.
  // 'scope' field specifies space-delimited list of access scopes.

  gapi.client.init({
    'apiKey': 'AIzaSyCz5sRFBdIGYZ8GN6ax0q35SxiLeB7P03M',
    'discoveryDocs': [discoveryUrl],
    'access_type': 'offline',
    'clientId': '1056569297986-ghu1ojg1bedpfpghh4k9at82ngoajg1i.apps.googleusercontent.com',
    'scope': SCOPE,
    'include_granted_scopes': true
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance(); // Listen for sign-in state changes.

    GoogleAuth.isSignedIn.listen(updateSigninStatus); // Handle initial sign-in state. (Determine if user is already signed in.)

    var user = GoogleAuth.currentUser.get();
    setSigninStatus(); // Call handleAuthClick function when user clicks on
    //      "Sign In/Authorize" button.

    $('#sign-in-or-out-button').click(function () {
      handleAuthClick();
    });
    $('#revoke-access-button').click(function () {
      revokeAccess();
    });
  });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked 'Sign out' button.
    GoogleAuth.signOut();
  } else {
    // User is not signed in. Start Google auth flow.
    GoogleAuth.signIn(); // get refresh token

    var authInstance = window.gapi.auth2.getAuthInstance();
    authInstance.grantOfflineAccess().then(function (res) {
      console.log(res);
    });
  }
}

function revokeAccess() {
  GoogleAuth.disconnect();
}

function setSigninStatus(isSignedIn) {
  var user = GoogleAuth.currentUser.get();
  console.log(user.Zi);
  var isAuthorized = user.hasGrantedScopes(SCOPE);

  if (isAuthorized) {
    $('#sign-in-or-out-button').html('Sign out');
    $('#revoke-access-button').css('display', 'inline-block');
    $('#auth-status').html('You are currently signed in and have granted ' + 'access to this app.');
  } else {
    $('#sign-in-or-out-button').html('Sign In/Authorize');
    $('#revoke-access-button').css('display', 'none');
    $('#auth-status').html('You have not authorized this app or you are ' + 'signed out.');
  }
}

function updateSigninStatus(isSignedIn) {
  setSigninStatus();
}

/* harmony default export */ __webpack_exports__["default"] = (handleClientLoad);

/***/ }),

/***/ "./lib/redirect.js":
/*!*************************!*\
  !*** ./lib/redirect.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function (target) {
  var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (ctx.res) {
    // server
    // 303: "See other"
    ctx.res.writeHead(303, {
      Location: target
    });
    ctx.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    next_router__WEBPACK_IMPORTED_MODULE_0___default.a.replace(target);
  }
});

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

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/session */ "./lib/session.js");
/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lib/auth */ "./lib/auth.js");
/* harmony import */ var _lib_gsc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lib/gsc */ "./lib/gsc.js");
/* harmony import */ var _components_Nav__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Nav */ "./components/Nav.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Header */ "./components/Header.js");
/* harmony import */ var _components_Options__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Options */ "./components/Options.js");



function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    padding: 2rem 0 10rem;\n    #sign-in-or-out-button {\n        margin-left: 25px\n    }\n\n    #revoke-access-button {\n        display: none; \n        margin-left: 25px;\n    }\n\n    #auth-status {\n        display: inline; \n        padding-left: 25px\n    }\n    @media only screen and (max-width: 640px) {\n        padding: 0 2rem;\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









var HomeStyle = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.section(_templateObject());

var Home =
/*#__PURE__*/
function (_Component) {
  _inherits(Home, _Component);

  _createClass(Home, null, [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ctx) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!Object(_lib_auth__WEBPACK_IMPORTED_MODULE_4__["redirectIfNotAuthenticated"])(ctx)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return", {});

              case 2:
                return _context.abrupt("return", {});

              case 3:
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

  function Home(props) {
    var _this;

    _classCallCheck(this, Home);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Home).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "googleSign", function () {
      document.querySelector('#sign-in-or-out-button').addEventListener('click', function () {
        console.log('hello');
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "logout", function () {
      var userCookie = Object(_lib_session__WEBPACK_IMPORTED_MODULE_3__["getCookie"])({}, 'user');
      var adminCookie = Object(_lib_session__WEBPACK_IMPORTED_MODULE_3__["getCookie"])({}, 'admin');

      if (userCookie || adminCookie) {
        Object(_lib_session__WEBPACK_IMPORTED_MODULE_3__["removeCookie"])({}, 'user');
        Object(_lib_session__WEBPACK_IMPORTED_MODULE_3__["removeCookie"])({}, 'admin');
        window.location.reload();
      }
    });

    _this.state = {
      user: ''
    };
    return _this;
  }

  _createClass(Home, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var userCookie = Object(_lib_session__WEBPACK_IMPORTED_MODULE_3__["getCookie"])({}, 'user');

      if (userCookie) {
        var user = userCookie.split('@')[0];
        this.setState({
          user: user
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(HomeStyle, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Nav__WEBPACK_IMPORTED_MODULE_6__["default"], null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_7__["default"], {
        title: "What do you want to do?"
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Options__WEBPACK_IMPORTED_MODULE_8__["default"], null), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
        id: "sign-in-or-out-button"
      }, "Sign In/Authorize"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
        id: "revoke-access-button"
      }, "Revoke access"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        id: "auth-status"
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("hr", null));
    }
  }]);

  return Home;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ 4:
/*!******************************!*\
  !*** multi ./pages/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/index.js */"./pages/index.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cookie");

/***/ }),

/***/ "next/config":
/*!******************************!*\
  !*** external "next/config" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/config");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

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
//# sourceMappingURL=index.js.map