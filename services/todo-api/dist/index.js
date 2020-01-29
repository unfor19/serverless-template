(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/controller.ts":
/*!***************************!*\
  !*** ./src/controller.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareResponse = prepareResponse;

function prepareResponse(body, status_code) {
  return {
    body: JSON.stringify(body, null, 2),
    statusCode: status_code,
    isBase64Encoded: false
  };
}

/***/ }),

/***/ "./src/create.ts":
/*!***********************!*\
  !*** ./src/create.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createItem = createItem;

var AWS = _interopRequireWildcard(__webpack_require__(/*! aws-sdk */ "aws-sdk"));

var _uuid = __webpack_require__(/*! uuid */ "uuid");

var _controller = __webpack_require__(/*! ./controller */ "./src/controller.ts");

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION || 'eu-west-1',
  signatureVersion: 'v4'
}); // async function getMaxId() {
//   const params = {
//     Bucket: process.env.TODOS_BUCKET_NAME || '',
//     MaxKeys: 1000,
//   };
//   return new Promise((resolve, reject) => {
//     s3.listObjectsV2(params, (err: any, data: any) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       } else {
//         if (data.Contents.length === 0) {
//           resolve(1);
//         } else {
//           console.log('Data:', JSON.stringify(data.Contents, null, 2));
//           let max_id = 0;
//           data.Contents.forEach((item: any) => {
//             if (parseInt(item.Key) >= max_id) {
//               max_id = parseInt(item.Key);
//             }
//           });
//           resolve(max_id + 1);
//         }
//       }
//     });
//   });
// }

async function uploadObject(item) {
  const uuid = (0, _uuid.v1)();
  const params = {
    Metadata: {
      content: item.content
    },
    Bucket: process.env.TODOS_BUCKET_NAME || '',
    Key: uuid
  };
  const putObjectPromise = s3.putObject(params).promise();
  return putObjectPromise.then(data => {
    return {
      id: uuid
    };
  }).catch(err => {
    const errorMessage = `Failed to upload file to S3: ${err}`;
    return new Error(errorMessage);
  });
}

async function createItem(event, context, _callback) {
  console.log(`Event: ${JSON.stringify(event)}`);

  try {
    const item = JSON.parse(event.body);

    if (item.content) {
      return await uploadObject(item).then(res => {
        return (0, _controller.prepareResponse)(res, 200);
      });
    } else {
      return (0, _controller.prepareResponse)('Invalid item type', 500);
    }
  } catch (e) {
    return (0, _controller.prepareResponse)(e, 501);
  }
}

/***/ }),

/***/ "./src/delete.ts":
/*!***********************!*\
  !*** ./src/delete.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteItem = deleteItem;

var AWS = _interopRequireWildcard(__webpack_require__(/*! aws-sdk */ "aws-sdk"));

var _controller = __webpack_require__(/*! ./controller */ "./src/controller.ts");

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION || 'eu-west-1',
  signatureVersion: 'v4'
});

async function deleteObject(id) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.TODOS_BUCKET_NAME || '',
      Key: id.toString()
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve({
          id: id
        });
      }
    });
  });
}

async function deleteItem(event, context, _callback) {
  console.log(`Event: ${JSON.stringify(event)}`);
  const id = event.pathParameters.id;
  return (0, _controller.prepareResponse)((await deleteObject(id)), 200);
}

/***/ }),

/***/ "./src/get.ts":
/*!********************!*\
  !*** ./src/get.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getItem = getItem;

var AWS = _interopRequireWildcard(__webpack_require__(/*! aws-sdk */ "aws-sdk"));

var _controller = __webpack_require__(/*! ./controller */ "./src/controller.ts");

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION || 'eu-west-1',
  signatureVersion: 'v4'
});

async function getObject(id) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.TODOS_BUCKET_NAME || '',
      Key: id.toString()
    };
    s3.getObject(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve({
          id: id,
          content: data.Metadata.content
        });
      }
    });
  });
}

async function getItem(event, context, _callback) {
  console.log(`Event: ${JSON.stringify(event)}`);
  const id = event.pathParameters.id;

  try {
    return (0, _controller.prepareResponse)((await getObject(id)), 200);
  } catch (e) {
    if (e.statusCode === 403) {
      return (0, _controller.prepareResponse)({
        id: id,
        status: 'not-found'
      }, 404);
    } else {
      return (0, _controller.prepareResponse)(e, 501);
    }
  }
}

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createItem", {
  enumerable: true,
  get: function () {
    return _create.createItem;
  }
});
Object.defineProperty(exports, "getItem", {
  enumerable: true,
  get: function () {
    return _get.getItem;
  }
});
Object.defineProperty(exports, "deleteItem", {
  enumerable: true,
  get: function () {
    return _delete.deleteItem;
  }
});
Object.defineProperty(exports, "listItems", {
  enumerable: true,
  get: function () {
    return _list.listItems;
  }
});
Object.defineProperty(exports, "updateItem", {
  enumerable: true,
  get: function () {
    return _update.updateItem;
  }
});
Object.defineProperty(exports, "status", {
  enumerable: true,
  get: function () {
    return _status.status;
  }
});

var _create = __webpack_require__(/*! ./create */ "./src/create.ts");

var _get = __webpack_require__(/*! ./get */ "./src/get.ts");

var _delete = __webpack_require__(/*! ./delete */ "./src/delete.ts");

var _list = __webpack_require__(/*! ./list */ "./src/list.ts");

var _update = __webpack_require__(/*! ./update */ "./src/update.ts");

var _status = __webpack_require__(/*! ./status */ "./src/status.ts");

/***/ }),

/***/ "./src/interface.ts":
/*!**************************!*\
  !*** ./src/interface.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.instanceOfTodoItem = instanceOfTodoItem;

function instanceOfTodoItem(object) {
  return 'content' in object;
}

/***/ }),

/***/ "./src/list.ts":
/*!*********************!*\
  !*** ./src/list.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listItems = listItems;

var AWS = _interopRequireWildcard(__webpack_require__(/*! aws-sdk */ "aws-sdk"));

var _controller = __webpack_require__(/*! ./controller */ "./src/controller.ts");

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION || 'eu-west-1',
  signatureVersion: 'v4'
});

async function listObjects() {
  const params = {
    Bucket: process.env.TODOS_BUCKET_NAME || '',
    MaxKeys: 1000
  };
  return new Promise((resolve, reject) => {
    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        if (data.Contents.length === 0) {
          resolve({
            status: 'empty'
          });
        } else {
          console.log('Data:', JSON.stringify(data.Contents, null, 2));
          const arr = [];
          data.Contents.forEach(item => {
            arr.push({
              id: item.Key
            });
          });
          resolve(arr);
        }
      }
    });
  });
}

async function listItems(event, context, _callback) {
  console.log(`Event: ${JSON.stringify(event)}`);
  return (0, _controller.prepareResponse)((await listObjects()), 200);
}

/***/ }),

/***/ "./src/status.ts":
/*!***********************!*\
  !*** ./src/status.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.status = status;

var _uuid = __webpack_require__(/*! uuid */ "uuid");

var _controller = __webpack_require__(/*! ./controller */ "./src/controller.ts");

function status(event, context, callback) {
  console.log(`Console uuid is: ${(0, _uuid.v1)()}`);
  callback(null, (0, _controller.prepareResponse)({
    status: 'healthy',
    uuid: (0, _uuid.v1)()
  }, 200));
}

/***/ }),

/***/ "./src/update.ts":
/*!***********************!*\
  !*** ./src/update.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime/helpers/interopRequireWildcard */ "@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateItem = updateItem;

var AWS = _interopRequireWildcard(__webpack_require__(/*! aws-sdk */ "aws-sdk"));

var _interface = __webpack_require__(/*! ./interface */ "./src/interface.ts");

var _controller = __webpack_require__(/*! ./controller */ "./src/controller.ts");

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: process.env.REGION || 'eu-west-1',
  signatureVersion: 'v4'
});

async function updateObject(item) {
  const params = {
    Metadata: {
      content: item.content
    },
    Bucket: process.env.TODOS_BUCKET_NAME || '',
    Key: item.id.toString()
  };
  const putObjectPromise = s3.putObject(params).promise();
  return putObjectPromise.then(data => {
    console.log(data);
    return {
      id: item.id
    };
  }).catch(err => {
    const errorMessage = `Failed to upload file to S3: ${err}`;
    return new Error(errorMessage);
  });
}

async function updateItem(event, context, _callback) {
  console.log(`Event: ${JSON.stringify(event)}`);

  try {
    const item = JSON.parse(event.body);

    if ((0, _interface.instanceOfTodoItem)(item)) {
      return await updateObject(item).then(res => {
        console.log(res);
        return (0, _controller.prepareResponse)(res, 200);
      });
    } else {
      return (0, _controller.prepareResponse)('Invalid item type', 500);
    }
  } catch (e) {
    return (0, _controller.prepareResponse)(e, 501);
  }
}

/***/ }),

/***/ "@babel/runtime/helpers/interopRequireWildcard":
/*!****************************************************************!*\
  !*** external "@babel/runtime/helpers/interopRequireWildcard" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireWildcard");

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ })

/******/ })));
//# sourceMappingURL=index.js.map