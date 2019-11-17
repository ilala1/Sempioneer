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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Flashes.js":
/*!*******************************!*\
  !*** ./components/Flashes.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_flashes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/flashes */ "./lib/flashes.js");


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
  var data = _taggedTemplateLiteral(["\n    div {\n        &:not(:first-of-type) { margin-top: 1.875rem; }\n\n        display: flex;\n        align-items: flex-start;\n        justify-content: space-between;\n\n        padding: 1rem 1.4rem;\n        margin-top: 2rem;\n\n        border: 2px solid #000000;\n\n        font-size: 1.4rem;\n        line-height: 2rem;\n        color: #000000;\n\n        p {\n            flex: 1 1 auto;\n\n            padding-right: 2rem;\n        }\n\n        button {\n            flex: 0 0 auto;\n\n            outline: none;\n            border: none;\n\n            cursor: pointer;\n\n            font-size: 1.6rem;\n        }\n\n        &.success { border-color: #00FF00; }\n        &.error { border-color: #FF0000; }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var FlashStyle = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.aside(_templateObject());

var Flash =
/*#__PURE__*/
function (_Component) {
  _inherits(Flash, _Component);

  function Flash(props) {
    var _this;

    _classCallCheck(this, Flash);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Flash).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addFlash", function (flash) {
      var flashes = _toConsumableArray(_this.state.flashes);

      flashes.push(flash);

      _this.setState({
        flashes: flashes
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "removeFlash", function (key) {
      var flashes = _toConsumableArray(_this.state.flashes).filter(function (flash) {
        return flash.key !== key;
      });

      _this.setState({
        flashes: flashes
      });
    });

    _this.state = {
      flashes: _this.props.flashes || []
    };
    Object(_lib_flashes__WEBPACK_IMPORTED_MODULE_2__["removeFlashes"])();
    return _this;
  }

  _createClass(Flash, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      if (this.state.flashes.length > 0) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FlashStyle, null, this.state.flashes.map(function (flash) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: flash.key,
            className: flash.type
          }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
            dangerouslySetInnerHTML: {
              __html: flash.message
            }
          }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
            onClick: function onClick() {
              _this2.removeFlash(flash.key);
            }
          }, "\u2716"));
        }));
      }

      return null;
    }
  }]);

  return Flash;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Flash);

/***/ }),

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

/***/ "./components/forms/Input.js":
/*!***********************************!*\
  !*** ./components/forms/Input.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);


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
  var data = _taggedTemplateLiteral(["\n    padding-top: 0.6rem;\n\n    .floatingLabel {\n        position: relative;\n        display: inline-block;\n\n        width: 22rem;\n\n        border: 1px solid #000000;\n\n        padding: 1rem 0.8rem;\n        margin-bottom: 0.8rem;\n\n        label {\n            position: absolute;\n\n            pointer-events: none;\n\n            top: 50%;\n            transform: translateY(-50%);\n            left: 0;\n\n            padding: 0 0.8rem;\n\n            background: white;\n\n            transition: all .1s;\n        }\n\n        input {\n            width: 100%;\n\n            opacity: 0;\n        }\n\n        &.show {\n            label {\n                top: -11px;\n                transform: none;\n\n                font-size: 1.1rem;\n\n                padding: 0 0.6rem;\n                margin-left: 0.2rem;\n\n                color: #333333;\n            }\n\n            input { opacity: 1; }\n        }\n\n        &.error {\n            border-color: #FF0000;\n\n            &.show label { color: #FF0000; }\n        }\n\n        &.disabled { opacity: 0.3; }\n    }\n\n    .helperMessage, .errorMessage {\n        font-size: 1.2rem;\n\n        padding-left: 0.6rem;\n    }\n\n    .errorMessage { color: #FF0000; }\n\n\n    /*\n        ----- RESPONSIVE -----\n    */\n\n    @media ", " {\n        .floatingLabel { width: 100%; }\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }




var InputStyle = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.div(_templateObject(), function (props) {
  return props.theme.mediaMinimum;
});

var Input =
/*#__PURE__*/
function (_Component) {
  _inherits(Input, _Component);

  function Input(props) {
    var _this;

    _classCallCheck(this, Input);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Input).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "showFloatingLabel", function (show) {
      var floatingLabelClass = show ? ' show' : '';

      _this.setState({
        floatingLabelClass: floatingLabelClass
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleFocus", function () {
      return _this.showFloatingLabel(true);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e) {
      var value = e.target.value;

      _this.setState({
        value: value
      }); // Continue to parent


      _this.props.changeState(value);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleBlur", function (e) {
      return _this.showFloatingLabel(e.target.value.trim().length > 0);
    });

    _this.state = {
      value: _this.props.value,
      floatingLabelClass: _this.props.value.trim() !== '' ? ' show' : '',
      errorClass: '',
      disabledClass: '',
      showHelperMessage: true,
      showErrorMessage: false
    };
    return _this;
  }

  _createClass(Input, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Validation change
      if (prevProps.isValid !== this.props.isValid) {
        this.setState({
          showErrorMessage: !this.props.isValid,
          errorClass: this.props.isValid ? '' : ' error'
        });
      } // Value change - from parent only (not a bounce from child onchange event)


      if (prevProps.value !== this.props.value && this.props.value !== this.state.value) {
        if (this.props.name === document.activeElement.name) {
          // Currently in focus
          this.showFloatingLabel(true);
        } else {
          this.showFloatingLabel(this.props.value.trim().length > 0);
        }
      } // Disabed change


      if (prevProps.disabled !== this.props.disabled) {
        this.setState({
          disabledClass: this.props.disabled ? ' disabled' : ''
        });
      }
    }
  }, {
    key: "render",
    // Output
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(InputStyle, null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "floatingLabel".concat(this.state.floatingLabelClass).concat(this.state.errorClass).concat(this.state.disabledClass)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", null, this.props.label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: this.props.type,
        name: this.props.name,
        value: this.props.value,
        disabled: this.props.disabled,
        onChange: this.handleChange,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur
      })), this.state.showHelperMessage && !this.state.showErrorMessage && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "helperMessage"
      }, this.props.helperMessage), this.state.showErrorMessage && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        className: "errorMessage"
      }, this.props.errorMessage));
    }
  }]);

  return Input;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(Input, "propTypes", {
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  type: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  isValid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  disabled: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  changeState: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  helperMessage: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  errorMessage: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
});

/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),

/***/ "./lib/api.js":
/*!********************!*\
  !*** ./lib/api.js ***!
  \********************/
/*! exports provided: apiGet, apiPost, apiPut, apiDelete */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiGet", function() { return apiGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiPost", function() { return apiPost; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiPut", function() { return apiPut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apiDelete", function() { return apiDelete; });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "@babel/runtime/regenerator");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/config */ "next/config");
/* harmony import */ var next_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_config__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _flashes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./flashes */ "./lib/flashes.js");
/* harmony import */ var _redirect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./redirect */ "./lib/redirect.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }






var _getConfig = next_config__WEBPACK_IMPORTED_MODULE_2___default()(),
    publicRuntimeConfig = _getConfig.publicRuntimeConfig;

var errors = function errors(ctx, error) {
  if (error.response && error.response.status) {
    var status = error.response.status;

    if (status === 401) {
      Object(_flashes__WEBPACK_IMPORTED_MODULE_3__["addFlash"])(ctx, Object(_flashes__WEBPACK_IMPORTED_MODULE_3__["createFlash"])('error', 'You must be logged in to view this page'));
      Object(_redirect__WEBPACK_IMPORTED_MODULE_4__["default"])('/login');
      return false;
    }
  } // Unknown error


  console.error(error);
  Object(_flashes__WEBPACK_IMPORTED_MODULE_3__["addFlash"])(ctx, Object(_flashes__WEBPACK_IMPORTED_MODULE_3__["createFlash"])('error', 'Unknown error. Please contact the site administrators'));
  Object(_redirect__WEBPACK_IMPORTED_MODULE_4__["default"])('/');
  return false;
};

var request =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ctx, method, url) {
    var requestData,
        host,
        base,
        params,
        data,
        config,
        response,
        _args = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requestData = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
            host = publicRuntimeConfig.URL_HOST;
            base = publicRuntimeConfig.URL_BASE; // Format data

            params = method === 'get' ? requestData : {};
            data = method !== 'get' ? requestData : {}; // Put it all together

            config = {
              baseURL: "".concat(host).concat(base, "api"),
              url: url,
              method: method,
              params: params,
              data: data,
              withCredentials: method === 'delete'
            }; // Make the request

            _context.prev = 6;
            _context.next = 9;
            return axios__WEBPACK_IMPORTED_MODULE_1___default.a.request(config);

          case 9:
            response = _context.sent;
            return _context.abrupt("return", response.data);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](6);
            return _context.abrupt("return", errors(ctx, _context.t0));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[6, 13]]);
  }));

  return function request(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var apiGet =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(ctx, url) {
    var data,
        response,
        _args2 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
            _context2.next = 3;
            return request(ctx, 'get', url, data);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function apiGet(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();
var apiPost =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3(ctx, url) {
    var data,
        response,
        _args3 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            data = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
            _context3.next = 3;
            return request(ctx, 'post', url, data);

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function apiPost(_x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();
var apiPut =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(ctx, url) {
    var data,
        response,
        _args4 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            data = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
            _context4.next = 3;
            return request(ctx, 'put', url, data);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function apiPut(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();
var apiDelete =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee5(ctx, url) {
    var data,
        response,
        _args5 = arguments;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            data = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
            _context5.next = 3;
            return request(ctx, 'delete', url, data);

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", response);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function apiDelete(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

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

/***/ "./lib/validation.js":
/*!***************************!*\
  !*** ./lib/validation.js ***!
  \***************************/
/*! exports provided: entryValidate, emailValidate, passwordValidate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entryValidate", function() { return entryValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emailValidate", function() { return emailValidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passwordValidate", function() { return passwordValidate; });
var emailRegex = new RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$');
var passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
var entryValidate = function entryValidate(value) {
  return value.trim().length > 0;
};
var emailValidate = function emailValidate(value) {
  return entryValidate(value) && emailRegex.test(value);
};
var passwordValidate = function passwordValidate(value) {
  return entryValidate(value) && passwordRegex.test(value);
};

/***/ }),

/***/ "./pages/login.js":
/*!************************!*\
  !*** ./pages/login.js ***!
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
/* harmony import */ var _components_Flashes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Flashes */ "./components/Flashes.js");
/* harmony import */ var _components_forms_Input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/forms/Input */ "./components/forms/Input.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Header */ "./components/Header.js");
/* harmony import */ var _lib_flashes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lib/flashes */ "./lib/flashes.js");
/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lib/auth */ "./lib/auth.js");
/* harmony import */ var _lib_validation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lib/validation */ "./lib/validation.js");
/* harmony import */ var _lib_api__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/api */ "./lib/api.js");



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
  var data = _taggedTemplateLiteral(["\n    padding: 2rem 0 10rem;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n    .admin {\n        margin-left: auto;\n        padding-top: 2rem;\n        padding-right: 2rem;\n        .button {\n            text-decoration: none;\n            color: #000;\n            border: 1px solid black;\n            padding: 0.6rem 0.8rem;\n            :hover {\n                background: #00a9e0;\n                color: #fff;\n            }\n        }\n    }\n    h2 { \n        padding-top: 7rem;\n        margin-bottom: 1.2rem;\n    }\n\n    button { \n        margin-top: 1.6rem; \n        text-align: center;\n        :hover {\n            background: #00a9e0;\n            color: #fff;\n        } \n    }\n\n    >p { margin-top: 1.4rem; }\n\n    .login {\n        padding-top: 2rem;\n    }\n\n    .loginBtn {\n        text-align: center;\n    }\n\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }









 // import { login } from '../services/userApi';

var LoginStyle = styled_components__WEBPACK_IMPORTED_MODULE_2___default.a.section(_templateObject());

var Login =
/*#__PURE__*/
function (_Component) {
  _inherits(Login, _Component);

  _createClass(Login, null, [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(ctx) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!Object(_lib_auth__WEBPACK_IMPORTED_MODULE_7__["redirectIfAuthenticated"])(ctx)) {
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

  function Login(props) {
    var _this;

    _classCallCheck(this, Login);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Login).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updateEmailState", function (value) {
      if (value.length === 0 || value.length > 2) {
        _this.validateEmail(value);
      }

      _this.setState({
        email: value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "updatePasswordState", function (value) {
      if (value.length === 0 || value.length > 2) {
        _this.validatePassword(value);
      }

      _this.setState({
        password: value
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "validateEmail", function (value) {
      var email = value.trim();
      var emailValid = '';

      if (email) {
        emailValid = email.length > 0 && Object(_lib_validation__WEBPACK_IMPORTED_MODULE_8__["emailValidate"])(email);

        _this.setState({
          emailValid: emailValid
        });

        return emailValid;
      }

      _this.setState({
        emailValid: emailValid
      });

      return emailValid;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "validatePassword", function (value) {
      var password = value;
      console.log(password);
      var passwordValid = '';

      if (password.endsWith('Test!234')) {
        passwordValid = password.length > 0 && Object(_lib_validation__WEBPACK_IMPORTED_MODULE_8__["passwordValidate"])(password);

        _this.setState({
          passwordValid: passwordValid
        });

        return passwordValid;
      }

      _this.setState({
        passwordValid: passwordValid
      });

      console.log(_this.state.passwordValid);
      return passwordValid;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "validateForm", function () {
      var isValid = true;

      if (!_this.validatePassword(_this.state.password)) {
        isValid = false; // Add a flash error

        var flash = Object(_lib_flashes__WEBPACK_IMPORTED_MODULE_6__["createFlash"])('error', 'Wrong Email or Password');

        _this.flashesComponent.current.addFlash(flash);
      }

      return isValid;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "submitForm",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(e) {
        var _this$state, email, password, response, flash;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e.preventDefault();

                if (!_this.validateForm()) {
                  _context2.next = 7;
                  break;
                }

                _this$state = _this.state, email = _this$state.email, password = _this$state.password;
                _context2.next = 5;
                return Object(_lib_api__WEBPACK_IMPORTED_MODULE_9__["apiPost"])({}, '/valid', {
                  email: email,
                  password: password
                });

              case 5:
                response = _context2.sent;

                if (response.status === 200) {
                  Object(_lib_auth__WEBPACK_IMPORTED_MODULE_7__["login"])(_this.state.email);
                } else if (response.status === 400) {
                  flash = Object(_lib_flashes__WEBPACK_IMPORTED_MODULE_6__["createFlash"])('error', 'Wrong Email and password');

                  _this.flashesComponent.current.addFlash(flash);
                }

              case 7:
                return _context2.abrupt("return", {});

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }());

    _this.flashesComponent = Object(react__WEBPACK_IMPORTED_MODULE_1__["createRef"])();
    _this.state = {
      email: '',
      emailValid: true,
      password: '',
      passwordValid: true
    };
    return _this;
  } // State handlers


  _createClass(Login, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(LoginStyle, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "admin"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
        href: "/admin",
        className: "button"
      }, "Admin")), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Header__WEBPACK_IMPORTED_MODULE_5__["default"], {
        title: "Login"
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_Flashes__WEBPACK_IMPORTED_MODULE_3__["default"], {
        ref: this.flashesComponent,
        flashes: this.props.flashes
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("form", {
        className: "login",
        onSubmit: this.submitForm
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_forms_Input__WEBPACK_IMPORTED_MODULE_4__["default"], {
        label: "Email Address",
        type: "email",
        name: "email",
        value: this.state.email,
        changeState: this.updateEmailState,
        isValid: this.state.emailValid,
        helperMessage: "* Required",
        errorMessage: "Must be a valid Enigma address"
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_components_forms_Input__WEBPACK_IMPORTED_MODULE_4__["default"], {
        label: "Password",
        type: "password",
        name: "password",
        value: this.state.password,
        changeState: this.updatePasswordState,
        isValid: this.state.passwordValid,
        helperMessage: "* Required",
        errorMessage: "Wrong password"
      }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
        className: "loginBtn"
      }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
        type: "submit"
      }, "Login"))));
    }
  }]);

  return Login;
}(react__WEBPACK_IMPORTED_MODULE_1__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Login);

/***/ }),

/***/ 3:
/*!******************************!*\
  !*** multi ./pages/login.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/login.js */"./pages/login.js");


/***/ }),

/***/ "@babel/runtime/regenerator":
/*!*********************************************!*\
  !*** external "@babel/runtime/regenerator" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/regenerator");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

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

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

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
//# sourceMappingURL=login.js.map