/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var wrapper = document.querySelector('.wrapper');\nvar game = \"Overwatch\";\nvar limit = 10;\nvar client_id = \"z2cjxqc0jty8ehrd31epyku9mjj1eq\";\nvar nowoffset = 0;\nvar isloading = false; //切換語言\n\nvar I18N = {\n  en: __webpack_require__(/*! ./en.js */ \"./en.js\"),\n  'zh-tw': __webpack_require__(/*! ./zh-tw.js */ \"./zh-tw.js\")\n};\nvar Lang = 'zh-tw';\n\nfunction changeLang(lang) {\n  document.querySelector('.menu__title').textContent = I18N[lang]['Title'];\n  Lang = lang;\n\n  while (wrapper.firstChild) {\n    wrapper.removeChild(wrapper.firstChild);\n  }\n\n  nowoffset = 0; //資料歸零\n\n  appendData(Lang);\n  console.log(lang);\n} //串接資料\n\n\nfunction getData(lang, callback) {\n  isloading = true;\n  var xhr = new XMLHttpRequest();\n  xhr.open(\"get\", \"https://api.twitch.tv/kraken/streams/?api_version=5&client_id=\".concat(client_id, \"&game=\").concat(game, \"&limit=\").concat(limit, \"&offset=\").concat(nowoffset, \"&language=\").concat(lang), true);\n  xhr.setRequestHeader('Client-ID', client_id);\n  xhr.send();\n\n  xhr.onload = function () {\n    if (this.readyState === 4 && this.status === 200) {\n      var data = JSON.parse(this.responseText);\n      callback(null, data);\n    } else {\n      console.log(error);\n    }\n  };\n}\n\nfunction appendData(lang) {\n  getData(lang, function (error, data) {\n    var streams = data.streams;\n    nowoffset += 10;\n    isloading = false;\n    var _iteratorNormalCompletion = true;\n    var _didIteratorError = false;\n    var _iteratorError = undefined;\n\n    try {\n      for (var _iterator = streams[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n        var stream = _step.value;\n        var link = document.createElement('a');\n        link.setAttribute('href', stream.channel.url);\n        link.setAttribute('target', '_blank');\n        link.style.textDecoration = \"none\";\n        link.innerHTML = \"\\n                <div class=\\\"box\\\">\\n                    <div class=\\\"preview\\\">\\n                        <img src=\\\"\".concat(stream.preview.medium, \"\\\" alt=\\\"preview\\\" onload=\\\"this.style.opacity = 1\\\" >\\n                    </div>\\n                        <div class=\\\"title\\\">\\n                        <img class=\\\"title-img\\\" src=\\\"\").concat(stream.channel.logo, \"\\\" alt=\\\"logo\\\" onload=\\\"this.style.opacity = 1\\\">\\n                        <div class=\\\"title-intro\\\">\\n                            <p class=\\\"title-chlname\\\">\").concat(stream.channel.status, \"</p>\\n                            <p class=\\\"title-name\\\">\").concat(stream.channel.display_name, \"</p>\\n                        </div>\\n                    </div>\\n                    </div>\\n            \");\n        wrapper.appendChild(link);\n      }\n    } catch (err) {\n      _didIteratorError = true;\n      _iteratorError = err;\n    } finally {\n      try {\n        if (!_iteratorNormalCompletion && _iterator[\"return\"] != null) {\n          _iterator[\"return\"]();\n        }\n      } finally {\n        if (_didIteratorError) {\n          throw _iteratorError;\n        }\n      }\n    }\n  });\n} //偵測滾動\n\n\nwindow.addEventListener(\"DOMContentLoaded\", function (e) {\n  document.querySelector('.lang-zh-tw').addEventListener('click', function () {\n    changeLang('zh-tw');\n  });\n  document.querySelector('.lang-en').addEventListener('click', function () {\n    changeLang('en');\n  });\n  appendData(Lang);\n  console.log(e);\n  window.addEventListener(\"scroll\", loadData);\n});\n\nfunction loadData() {\n  if (window.scrollY + window.innerHeight >= document.body.clientHeight) {\n    if (!isloading) {\n      appendData(Lang);\n    }\n  }\n}\n\n//# sourceURL=webpack:///./app.js?");

/***/ }),

/***/ "./en.js":
/*!***************!*\
  !*** ./en.js ***!
  \***************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  Title: \"This streams are in English\"\n};\n\n//# sourceURL=webpack:///./en.js?");

/***/ }),

/***/ "./zh-tw.js":
/*!******************!*\
  !*** ./zh-tw.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = {\n  Title: \"用中文直播的頻道\"\n};\n\n//# sourceURL=webpack:///./zh-tw.js?");

/***/ })

/******/ });