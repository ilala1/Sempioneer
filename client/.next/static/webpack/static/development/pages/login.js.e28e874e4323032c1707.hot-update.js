webpackHotUpdate("static/development/pages/login.js",{

/***/ "./pages/login.js":
/*!************************!*\
  !*** ./pages/login.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "../node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "../node_modules/styled-components/dist/styled-components.browser.esm.js");
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

var LoginStyle = styled_components__WEBPACK_IMPORTED_MODULE_2__["default"].section(_templateObject());

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
    (function (Component, route) {
      if(!Component) return
      if (false) {}
      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(typeof __webpack_exports__ !== 'undefined' ? __webpack_exports__.default : (module.exports.default || module.exports), "/login")
  
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=login.js.e28e874e4323032c1707.hot-update.js.map