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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/waypoints/lib/noframework.waypoints.js":
/*!*************************************************************!*\
  !*** ./node_modules/waypoints/lib/noframework.waypoints.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
(function () {
  'use strict';

  var keyCounter = 0;
  var allWaypoints = {};
  /* http://imakewebthings.com/waypoints/api/waypoint */

  function Waypoint(options) {
    if (!options) {
      throw new Error('No options passed to Waypoint constructor');
    }

    if (!options.element) {
      throw new Error('No element option passed to Waypoint constructor');
    }

    if (!options.handler) {
      throw new Error('No handler option passed to Waypoint constructor');
    }

    this.key = 'waypoint-' + keyCounter;
    this.options = Waypoint.Adapter.extend({}, Waypoint.defaults, options);
    this.element = this.options.element;
    this.adapter = new Waypoint.Adapter(this.element);
    this.callback = options.handler;
    this.axis = this.options.horizontal ? 'horizontal' : 'vertical';
    this.enabled = this.options.enabled;
    this.triggerPoint = null;
    this.group = Waypoint.Group.findOrCreate({
      name: this.options.group,
      axis: this.axis
    });
    this.context = Waypoint.Context.findOrCreateByElement(this.options.context);

    if (Waypoint.offsetAliases[this.options.offset]) {
      this.options.offset = Waypoint.offsetAliases[this.options.offset];
    }

    this.group.add(this);
    this.context.add(this);
    allWaypoints[this.key] = this;
    keyCounter += 1;
  }
  /* Private */


  Waypoint.prototype.queueTrigger = function (direction) {
    this.group.queueTrigger(this, direction);
  };
  /* Private */


  Waypoint.prototype.trigger = function (args) {
    if (!this.enabled) {
      return;
    }

    if (this.callback) {
      this.callback.apply(this, args);
    }
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/destroy */


  Waypoint.prototype.destroy = function () {
    this.context.remove(this);
    this.group.remove(this);
    delete allWaypoints[this.key];
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/disable */


  Waypoint.prototype.disable = function () {
    this.enabled = false;
    return this;
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/enable */


  Waypoint.prototype.enable = function () {
    this.context.refresh();
    this.enabled = true;
    return this;
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/next */


  Waypoint.prototype.next = function () {
    return this.group.next(this);
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/previous */


  Waypoint.prototype.previous = function () {
    return this.group.previous(this);
  };
  /* Private */


  Waypoint.invokeAll = function (method) {
    var allWaypointsArray = [];

    for (var waypointKey in allWaypoints) {
      allWaypointsArray.push(allWaypoints[waypointKey]);
    }

    for (var i = 0, end = allWaypointsArray.length; i < end; i++) {
      allWaypointsArray[i][method]();
    }
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/destroy-all */


  Waypoint.destroyAll = function () {
    Waypoint.invokeAll('destroy');
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/disable-all */


  Waypoint.disableAll = function () {
    Waypoint.invokeAll('disable');
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/enable-all */


  Waypoint.enableAll = function () {
    Waypoint.Context.refreshAll();

    for (var waypointKey in allWaypoints) {
      allWaypoints[waypointKey].enabled = true;
    }

    return this;
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/refresh-all */


  Waypoint.refreshAll = function () {
    Waypoint.Context.refreshAll();
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/viewport-height */


  Waypoint.viewportHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight;
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/viewport-width */


  Waypoint.viewportWidth = function () {
    return document.documentElement.clientWidth;
  };

  Waypoint.adapters = [];
  Waypoint.defaults = {
    context: window,
    continuous: true,
    enabled: true,
    group: 'default',
    horizontal: false,
    offset: 0
  };
  Waypoint.offsetAliases = {
    'bottom-in-view': function bottomInView() {
      return this.context.innerHeight() - this.adapter.outerHeight();
    },
    'right-in-view': function rightInView() {
      return this.context.innerWidth() - this.adapter.outerWidth();
    }
  };
  window.Waypoint = Waypoint;
})();

(function () {
  'use strict';

  function requestAnimationFrameShim(callback) {
    window.setTimeout(callback, 1000 / 60);
  }

  var keyCounter = 0;
  var contexts = {};
  var Waypoint = window.Waypoint;
  var oldWindowLoad = window.onload;
  /* http://imakewebthings.com/waypoints/api/context */

  function Context(element) {
    this.element = element;
    this.Adapter = Waypoint.Adapter;
    this.adapter = new this.Adapter(element);
    this.key = 'waypoint-context-' + keyCounter;
    this.didScroll = false;
    this.didResize = false;
    this.oldScroll = {
      x: this.adapter.scrollLeft(),
      y: this.adapter.scrollTop()
    };
    this.waypoints = {
      vertical: {},
      horizontal: {}
    };
    element.waypointContextKey = this.key;
    contexts[element.waypointContextKey] = this;
    keyCounter += 1;

    if (!Waypoint.windowContext) {
      Waypoint.windowContext = true;
      Waypoint.windowContext = new Context(window);
    }

    this.createThrottledScrollHandler();
    this.createThrottledResizeHandler();
  }
  /* Private */


  Context.prototype.add = function (waypoint) {
    var axis = waypoint.options.horizontal ? 'horizontal' : 'vertical';
    this.waypoints[axis][waypoint.key] = waypoint;
    this.refresh();
  };
  /* Private */


  Context.prototype.checkEmpty = function () {
    var horizontalEmpty = this.Adapter.isEmptyObject(this.waypoints.horizontal);
    var verticalEmpty = this.Adapter.isEmptyObject(this.waypoints.vertical);
    var isWindow = this.element == this.element.window;

    if (horizontalEmpty && verticalEmpty && !isWindow) {
      this.adapter.off('.waypoints');
      delete contexts[this.key];
    }
  };
  /* Private */


  Context.prototype.createThrottledResizeHandler = function () {
    var self = this;

    function resizeHandler() {
      self.handleResize();
      self.didResize = false;
    }

    this.adapter.on('resize.waypoints', function () {
      if (!self.didResize) {
        self.didResize = true;
        Waypoint.requestAnimationFrame(resizeHandler);
      }
    });
  };
  /* Private */


  Context.prototype.createThrottledScrollHandler = function () {
    var self = this;

    function scrollHandler() {
      self.handleScroll();
      self.didScroll = false;
    }

    this.adapter.on('scroll.waypoints', function () {
      if (!self.didScroll || Waypoint.isTouch) {
        self.didScroll = true;
        Waypoint.requestAnimationFrame(scrollHandler);
      }
    });
  };
  /* Private */


  Context.prototype.handleResize = function () {
    Waypoint.Context.refreshAll();
  };
  /* Private */


  Context.prototype.handleScroll = function () {
    var triggeredGroups = {};
    var axes = {
      horizontal: {
        newScroll: this.adapter.scrollLeft(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left'
      },
      vertical: {
        newScroll: this.adapter.scrollTop(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up'
      }
    };

    for (var axisKey in axes) {
      var axis = axes[axisKey];
      var isForward = axis.newScroll > axis.oldScroll;
      var direction = isForward ? axis.forward : axis.backward;

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey];

        if (waypoint.triggerPoint === null) {
          continue;
        }

        var wasBeforeTriggerPoint = axis.oldScroll < waypoint.triggerPoint;
        var nowAfterTriggerPoint = axis.newScroll >= waypoint.triggerPoint;
        var crossedForward = wasBeforeTriggerPoint && nowAfterTriggerPoint;
        var crossedBackward = !wasBeforeTriggerPoint && !nowAfterTriggerPoint;

        if (crossedForward || crossedBackward) {
          waypoint.queueTrigger(direction);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        }
      }
    }

    for (var groupKey in triggeredGroups) {
      triggeredGroups[groupKey].flushTriggers();
    }

    this.oldScroll = {
      x: axes.horizontal.newScroll,
      y: axes.vertical.newScroll
    };
  };
  /* Private */


  Context.prototype.innerHeight = function () {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportHeight();
    }
    /*eslint-enable eqeqeq */


    return this.adapter.innerHeight();
  };
  /* Private */


  Context.prototype.remove = function (waypoint) {
    delete this.waypoints[waypoint.axis][waypoint.key];
    this.checkEmpty();
  };
  /* Private */


  Context.prototype.innerWidth = function () {
    /*eslint-disable eqeqeq */
    if (this.element == this.element.window) {
      return Waypoint.viewportWidth();
    }
    /*eslint-enable eqeqeq */


    return this.adapter.innerWidth();
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/context-destroy */


  Context.prototype.destroy = function () {
    var allWaypoints = [];

    for (var axis in this.waypoints) {
      for (var waypointKey in this.waypoints[axis]) {
        allWaypoints.push(this.waypoints[axis][waypointKey]);
      }
    }

    for (var i = 0, end = allWaypoints.length; i < end; i++) {
      allWaypoints[i].destroy();
    }
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/context-refresh */


  Context.prototype.refresh = function () {
    /*eslint-disable eqeqeq */
    var isWindow = this.element == this.element.window;
    /*eslint-enable eqeqeq */

    var contextOffset = isWindow ? undefined : this.adapter.offset();
    var triggeredGroups = {};
    var axes;
    this.handleScroll();
    axes = {
      horizontal: {
        contextOffset: isWindow ? 0 : contextOffset.left,
        contextScroll: isWindow ? 0 : this.oldScroll.x,
        contextDimension: this.innerWidth(),
        oldScroll: this.oldScroll.x,
        forward: 'right',
        backward: 'left',
        offsetProp: 'left'
      },
      vertical: {
        contextOffset: isWindow ? 0 : contextOffset.top,
        contextScroll: isWindow ? 0 : this.oldScroll.y,
        contextDimension: this.innerHeight(),
        oldScroll: this.oldScroll.y,
        forward: 'down',
        backward: 'up',
        offsetProp: 'top'
      }
    };

    for (var axisKey in axes) {
      var axis = axes[axisKey];

      for (var waypointKey in this.waypoints[axisKey]) {
        var waypoint = this.waypoints[axisKey][waypointKey];
        var adjustment = waypoint.options.offset;
        var oldTriggerPoint = waypoint.triggerPoint;
        var elementOffset = 0;
        var freshWaypoint = oldTriggerPoint == null;
        var contextModifier, wasBeforeScroll, nowAfterScroll;
        var triggeredBackward, triggeredForward;

        if (waypoint.element !== waypoint.element.window) {
          elementOffset = waypoint.adapter.offset()[axis.offsetProp];
        }

        if (typeof adjustment === 'function') {
          adjustment = adjustment.apply(waypoint);
        } else if (typeof adjustment === 'string') {
          adjustment = parseFloat(adjustment);

          if (waypoint.options.offset.indexOf('%') > -1) {
            adjustment = Math.ceil(axis.contextDimension * adjustment / 100);
          }
        }

        contextModifier = axis.contextScroll - axis.contextOffset;
        waypoint.triggerPoint = Math.floor(elementOffset + contextModifier - adjustment);
        wasBeforeScroll = oldTriggerPoint < axis.oldScroll;
        nowAfterScroll = waypoint.triggerPoint >= axis.oldScroll;
        triggeredBackward = wasBeforeScroll && nowAfterScroll;
        triggeredForward = !wasBeforeScroll && !nowAfterScroll;

        if (!freshWaypoint && triggeredBackward) {
          waypoint.queueTrigger(axis.backward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        } else if (!freshWaypoint && triggeredForward) {
          waypoint.queueTrigger(axis.forward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        } else if (freshWaypoint && axis.oldScroll >= waypoint.triggerPoint) {
          waypoint.queueTrigger(axis.forward);
          triggeredGroups[waypoint.group.id] = waypoint.group;
        }
      }
    }

    Waypoint.requestAnimationFrame(function () {
      for (var groupKey in triggeredGroups) {
        triggeredGroups[groupKey].flushTriggers();
      }
    });
    return this;
  };
  /* Private */


  Context.findOrCreateByElement = function (element) {
    return Context.findByElement(element) || new Context(element);
  };
  /* Private */


  Context.refreshAll = function () {
    for (var contextId in contexts) {
      contexts[contextId].refresh();
    }
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/context-find-by-element */


  Context.findByElement = function (element) {
    return contexts[element.waypointContextKey];
  };

  window.onload = function () {
    if (oldWindowLoad) {
      oldWindowLoad();
    }

    Context.refreshAll();
  };

  Waypoint.requestAnimationFrame = function (callback) {
    var requestFn = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || requestAnimationFrameShim;
    requestFn.call(window, callback);
  };

  Waypoint.Context = Context;
})();

(function () {
  'use strict';

  function byTriggerPoint(a, b) {
    return a.triggerPoint - b.triggerPoint;
  }

  function byReverseTriggerPoint(a, b) {
    return b.triggerPoint - a.triggerPoint;
  }

  var groups = {
    vertical: {},
    horizontal: {}
  };
  var Waypoint = window.Waypoint;
  /* http://imakewebthings.com/waypoints/api/group */

  function Group(options) {
    this.name = options.name;
    this.axis = options.axis;
    this.id = this.name + '-' + this.axis;
    this.waypoints = [];
    this.clearTriggerQueues();
    groups[this.axis][this.name] = this;
  }
  /* Private */


  Group.prototype.add = function (waypoint) {
    this.waypoints.push(waypoint);
  };
  /* Private */


  Group.prototype.clearTriggerQueues = function () {
    this.triggerQueues = {
      up: [],
      down: [],
      left: [],
      right: []
    };
  };
  /* Private */


  Group.prototype.flushTriggers = function () {
    for (var direction in this.triggerQueues) {
      var waypoints = this.triggerQueues[direction];
      var reverse = direction === 'up' || direction === 'left';
      waypoints.sort(reverse ? byReverseTriggerPoint : byTriggerPoint);

      for (var i = 0, end = waypoints.length; i < end; i += 1) {
        var waypoint = waypoints[i];

        if (waypoint.options.continuous || i === waypoints.length - 1) {
          waypoint.trigger([direction]);
        }
      }
    }

    this.clearTriggerQueues();
  };
  /* Private */


  Group.prototype.next = function (waypoint) {
    this.waypoints.sort(byTriggerPoint);
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    var isLast = index === this.waypoints.length - 1;
    return isLast ? null : this.waypoints[index + 1];
  };
  /* Private */


  Group.prototype.previous = function (waypoint) {
    this.waypoints.sort(byTriggerPoint);
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);
    return index ? this.waypoints[index - 1] : null;
  };
  /* Private */


  Group.prototype.queueTrigger = function (waypoint, direction) {
    this.triggerQueues[direction].push(waypoint);
  };
  /* Private */


  Group.prototype.remove = function (waypoint) {
    var index = Waypoint.Adapter.inArray(waypoint, this.waypoints);

    if (index > -1) {
      this.waypoints.splice(index, 1);
    }
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/first */


  Group.prototype.first = function () {
    return this.waypoints[0];
  };
  /* Public */

  /* http://imakewebthings.com/waypoints/api/last */


  Group.prototype.last = function () {
    return this.waypoints[this.waypoints.length - 1];
  };
  /* Private */


  Group.findOrCreate = function (options) {
    return groups[options.axis][options.name] || new Group(options);
  };

  Waypoint.Group = Group;
})();

(function () {
  'use strict';

  var Waypoint = window.Waypoint;

  function isWindow(element) {
    return element === element.window;
  }

  function getWindow(element) {
    if (isWindow(element)) {
      return element;
    }

    return element.defaultView;
  }

  function NoFrameworkAdapter(element) {
    this.element = element;
    this.handlers = {};
  }

  NoFrameworkAdapter.prototype.innerHeight = function () {
    var isWin = isWindow(this.element);
    return isWin ? this.element.innerHeight : this.element.clientHeight;
  };

  NoFrameworkAdapter.prototype.innerWidth = function () {
    var isWin = isWindow(this.element);
    return isWin ? this.element.innerWidth : this.element.clientWidth;
  };

  NoFrameworkAdapter.prototype.off = function (event, handler) {
    function removeListeners(element, listeners, handler) {
      for (var i = 0, end = listeners.length - 1; i < end; i++) {
        var listener = listeners[i];

        if (!handler || handler === listener) {
          element.removeEventListener(listener);
        }
      }
    }

    var eventParts = event.split('.');
    var eventType = eventParts[0];
    var namespace = eventParts[1];
    var element = this.element;

    if (namespace && this.handlers[namespace] && eventType) {
      removeListeners(element, this.handlers[namespace][eventType], handler);
      this.handlers[namespace][eventType] = [];
    } else if (eventType) {
      for (var ns in this.handlers) {
        removeListeners(element, this.handlers[ns][eventType] || [], handler);
        this.handlers[ns][eventType] = [];
      }
    } else if (namespace && this.handlers[namespace]) {
      for (var type in this.handlers[namespace]) {
        removeListeners(element, this.handlers[namespace][type], handler);
      }

      this.handlers[namespace] = {};
    }
  };
  /* Adapted from jQuery 1.x offset() */


  NoFrameworkAdapter.prototype.offset = function () {
    if (!this.element.ownerDocument) {
      return null;
    }

    var documentElement = this.element.ownerDocument.documentElement;
    var win = getWindow(this.element.ownerDocument);
    var rect = {
      top: 0,
      left: 0
    };

    if (this.element.getBoundingClientRect) {
      rect = this.element.getBoundingClientRect();
    }

    return {
      top: rect.top + win.pageYOffset - documentElement.clientTop,
      left: rect.left + win.pageXOffset - documentElement.clientLeft
    };
  };

  NoFrameworkAdapter.prototype.on = function (event, handler) {
    var eventParts = event.split('.');
    var eventType = eventParts[0];
    var namespace = eventParts[1] || '__default';
    var nsHandlers = this.handlers[namespace] = this.handlers[namespace] || {};
    var nsTypeList = nsHandlers[eventType] = nsHandlers[eventType] || [];
    nsTypeList.push(handler);
    this.element.addEventListener(eventType, handler);
  };

  NoFrameworkAdapter.prototype.outerHeight = function (includeMargin) {
    var height = this.innerHeight();
    var computedStyle;

    if (includeMargin && !isWindow(this.element)) {
      computedStyle = window.getComputedStyle(this.element);
      height += parseInt(computedStyle.marginTop, 10);
      height += parseInt(computedStyle.marginBottom, 10);
    }

    return height;
  };

  NoFrameworkAdapter.prototype.outerWidth = function (includeMargin) {
    var width = this.innerWidth();
    var computedStyle;

    if (includeMargin && !isWindow(this.element)) {
      computedStyle = window.getComputedStyle(this.element);
      width += parseInt(computedStyle.marginLeft, 10);
      width += parseInt(computedStyle.marginRight, 10);
    }

    return width;
  };

  NoFrameworkAdapter.prototype.scrollLeft = function () {
    var win = getWindow(this.element);
    return win ? win.pageXOffset : this.element.scrollLeft;
  };

  NoFrameworkAdapter.prototype.scrollTop = function () {
    var win = getWindow(this.element);
    return win ? win.pageYOffset : this.element.scrollTop;
  };

  NoFrameworkAdapter.extend = function () {
    var args = Array.prototype.slice.call(arguments);

    function merge(target, obj) {
      if (_typeof(target) === 'object' && _typeof(obj) === 'object') {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            target[key] = obj[key];
          }
        }
      }

      return target;
    }

    for (var i = 1, end = args.length; i < end; i++) {
      merge(args[0], args[i]);
    }

    return args[0];
  };

  NoFrameworkAdapter.inArray = function (element, array, i) {
    return array == null ? -1 : array.indexOf(element, i);
  };

  NoFrameworkAdapter.isEmptyObject = function (obj) {
    /* eslint no-unused-vars: 0 */
    for (var name in obj) {
      return false;
    }

    return true;
  };

  Waypoint.adapters.push({
    name: 'noframework',
    Adapter: NoFrameworkAdapter
  });
  Waypoint.Adapter = NoFrameworkAdapter;
})();

/***/ }),

/***/ "./src/js/bundle.js":
/*!**************************!*\
  !*** ./src/js/bundle.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_MobileMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/MobileMenu */ "./src/js/modules/MobileMenu.js");
/* harmony import */ var _modules_RevealOnScroll__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/RevealOnScroll */ "./src/js/modules/RevealOnScroll.js");
/* harmony import */ var _modules_StickyHeader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/StickyHeader */ "./src/js/modules/StickyHeader.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);




new _modules_RevealOnScroll__WEBPACK_IMPORTED_MODULE_1__["default"](jquery__WEBPACK_IMPORTED_MODULE_3___default()(".large-headline"), "90%");
new _modules_RevealOnScroll__WEBPACK_IMPORTED_MODULE_1__["default"](jquery__WEBPACK_IMPORTED_MODULE_3___default()(".service-item"), "85%");
new _modules_RevealOnScroll__WEBPACK_IMPORTED_MODULE_1__["default"](jquery__WEBPACK_IMPORTED_MODULE_3___default()(".wp-block-quote"), "75%");
new _modules_RevealOnScroll__WEBPACK_IMPORTED_MODULE_1__["default"](jquery__WEBPACK_IMPORTED_MODULE_3___default()(".home-contact"), "60%");
var mobileMenu = new _modules_MobileMenu__WEBPACK_IMPORTED_MODULE_0__["default"]();
var stickyHeader = new _modules_StickyHeader__WEBPACK_IMPORTED_MODULE_2__["default"]();

/***/ }),

/***/ "./src/js/modules/MobileMenu.js":
/*!**************************************!*\
  !*** ./src/js/modules/MobileMenu.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var MobileMenu =
/*#__PURE__*/
function () {
  function MobileMenu() {
    _classCallCheck(this, MobileMenu);

    this.menuIcon = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".site-header__menu-icon");
    this.menuContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()(".nav-header");
    this.events();
  }

  _createClass(MobileMenu, [{
    key: "events",
    value: function events() {
      this.menuIcon.click(this.toggleMenuIcon);
      this.menuIcon.click(this.toggleTheMenu.bind(this));
    }
  }, {
    key: "toggleTheMenu",
    value: function toggleTheMenu() {
      this.menuContent.toggleClass("nav-header--is-visible");
      this.menuIcon.toggleClass("site-header__menu-icon--is-active");
    }
  }]);

  return MobileMenu;
}();

/* harmony default export */ __webpack_exports__["default"] = (MobileMenu);

/***/ }),

/***/ "./src/js/modules/RevealOnScroll.js":
/*!******************************************!*\
  !*** ./src/js/modules/RevealOnScroll.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_waypoints_lib_noframework_waypoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/waypoints/lib/noframework.waypoints */ "./node_modules/waypoints/lib/noframework.waypoints.js");
/* harmony import */ var _node_modules_waypoints_lib_noframework_waypoints__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_waypoints_lib_noframework_waypoints__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var RevealOnScroll =
/*#__PURE__*/
function () {
  function RevealOnScroll(els, offset) {
    _classCallCheck(this, RevealOnScroll);

    this.itemsToReveal = els;
    this.offsetPercentage = offset;
    this.hideInitially();
    this.createWaypoints();
  }

  _createClass(RevealOnScroll, [{
    key: "hideInitially",
    value: function hideInitially() {
      this.itemsToReveal.addClass("reveal-item");
    }
  }, {
    key: "createWaypoints",
    value: function createWaypoints() {
      var that = this;
      this.itemsToReveal.each(function () {
        var currentItem = this;
        new Waypoint({
          element: currentItem,
          //dom element we watch
          handler: function handler() {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()(currentItem).addClass("reveal-item--is-visible");
          },
          //what we want to run
          offset: that.offsetPercentage
        });
      });
    }
  }]);

  return RevealOnScroll;
}();

/* harmony default export */ __webpack_exports__["default"] = (RevealOnScroll);

/***/ }),

/***/ "./src/js/modules/StickyHeader.js":
/*!****************************************!*\
  !*** ./src/js/modules/StickyHeader.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_waypoints_lib_noframework_waypoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/waypoints/lib/noframework.waypoints */ "./node_modules/waypoints/lib/noframework.waypoints.js");
/* harmony import */ var _node_modules_waypoints_lib_noframework_waypoints__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_waypoints_lib_noframework_waypoints__WEBPACK_IMPORTED_MODULE_1__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var StickyHeader =
/*#__PURE__*/
function () {
  function StickyHeader() {
    _classCallCheck(this, StickyHeader);

    this.siteHeader = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.site-header');
    this.headerTrigerElement = jquery__WEBPACK_IMPORTED_MODULE_0___default()('.wp-block-cover-text');
    this.createHeaderWaypoint();
  }

  _createClass(StickyHeader, [{
    key: "createHeaderWaypoint",
    value: function createHeaderWaypoint() {
      var that = this;
      new Waypoint({
        element: this.headerTrigerElement[0],
        handler: function handler(direction) {
          if (direction == "down") {
            that.siteHeader.addClass('site-header--compact');
          } else {
            that.siteHeader.removeClass('site-header--compact');
          }
        }
      });
    }
  }]);

  return StickyHeader;
}();

/* harmony default export */ __webpack_exports__["default"] = (StickyHeader);

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./src/js/bundle.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\wordpressrehab\rehabAdmin\wp-content\themes\wpRehab\src\js\bundle.js */"./src/js/bundle.js");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dheXBvaW50cy9saWIvbm9mcmFtZXdvcmsud2F5cG9pbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvTW9iaWxlTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9SZXZlYWxPblNjcm9sbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9TdGlja3lIZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiXSwibmFtZXMiOlsia2V5Q291bnRlciIsImFsbFdheXBvaW50cyIsIldheXBvaW50Iiwib3B0aW9ucyIsIkVycm9yIiwiZWxlbWVudCIsImhhbmRsZXIiLCJrZXkiLCJBZGFwdGVyIiwiZXh0ZW5kIiwiZGVmYXVsdHMiLCJhZGFwdGVyIiwiY2FsbGJhY2siLCJheGlzIiwiaG9yaXpvbnRhbCIsImVuYWJsZWQiLCJ0cmlnZ2VyUG9pbnQiLCJncm91cCIsIkdyb3VwIiwiZmluZE9yQ3JlYXRlIiwibmFtZSIsImNvbnRleHQiLCJDb250ZXh0IiwiZmluZE9yQ3JlYXRlQnlFbGVtZW50Iiwib2Zmc2V0QWxpYXNlcyIsIm9mZnNldCIsImFkZCIsInByb3RvdHlwZSIsInF1ZXVlVHJpZ2dlciIsImRpcmVjdGlvbiIsInRyaWdnZXIiLCJhcmdzIiwiYXBwbHkiLCJkZXN0cm95IiwicmVtb3ZlIiwiZGlzYWJsZSIsImVuYWJsZSIsInJlZnJlc2giLCJuZXh0IiwicHJldmlvdXMiLCJpbnZva2VBbGwiLCJtZXRob2QiLCJhbGxXYXlwb2ludHNBcnJheSIsIndheXBvaW50S2V5IiwicHVzaCIsImkiLCJlbmQiLCJsZW5ndGgiLCJkZXN0cm95QWxsIiwiZGlzYWJsZUFsbCIsImVuYWJsZUFsbCIsInJlZnJlc2hBbGwiLCJ2aWV3cG9ydEhlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRIZWlnaHQiLCJ2aWV3cG9ydFdpZHRoIiwiY2xpZW50V2lkdGgiLCJhZGFwdGVycyIsImNvbnRpbnVvdXMiLCJvdXRlckhlaWdodCIsImlubmVyV2lkdGgiLCJvdXRlcldpZHRoIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lU2hpbSIsInNldFRpbWVvdXQiLCJjb250ZXh0cyIsIm9sZFdpbmRvd0xvYWQiLCJvbmxvYWQiLCJkaWRTY3JvbGwiLCJkaWRSZXNpemUiLCJvbGRTY3JvbGwiLCJ4Iiwic2Nyb2xsTGVmdCIsInkiLCJzY3JvbGxUb3AiLCJ3YXlwb2ludHMiLCJ2ZXJ0aWNhbCIsIndheXBvaW50Q29udGV4dEtleSIsIndpbmRvd0NvbnRleHQiLCJjcmVhdGVUaHJvdHRsZWRTY3JvbGxIYW5kbGVyIiwiY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlciIsIndheXBvaW50IiwiY2hlY2tFbXB0eSIsImhvcml6b250YWxFbXB0eSIsImlzRW1wdHlPYmplY3QiLCJ2ZXJ0aWNhbEVtcHR5IiwiaXNXaW5kb3ciLCJvZmYiLCJzZWxmIiwicmVzaXplSGFuZGxlciIsImhhbmRsZVJlc2l6ZSIsIm9uIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2Nyb2xsSGFuZGxlciIsImhhbmRsZVNjcm9sbCIsImlzVG91Y2giLCJ0cmlnZ2VyZWRHcm91cHMiLCJheGVzIiwibmV3U2Nyb2xsIiwiZm9yd2FyZCIsImJhY2t3YXJkIiwiYXhpc0tleSIsImlzRm9yd2FyZCIsIndhc0JlZm9yZVRyaWdnZXJQb2ludCIsIm5vd0FmdGVyVHJpZ2dlclBvaW50IiwiY3Jvc3NlZEZvcndhcmQiLCJjcm9zc2VkQmFja3dhcmQiLCJpZCIsImdyb3VwS2V5IiwiZmx1c2hUcmlnZ2VycyIsImNvbnRleHRPZmZzZXQiLCJ1bmRlZmluZWQiLCJsZWZ0IiwiY29udGV4dFNjcm9sbCIsImNvbnRleHREaW1lbnNpb24iLCJvZmZzZXRQcm9wIiwidG9wIiwiYWRqdXN0bWVudCIsIm9sZFRyaWdnZXJQb2ludCIsImVsZW1lbnRPZmZzZXQiLCJmcmVzaFdheXBvaW50IiwiY29udGV4dE1vZGlmaWVyIiwid2FzQmVmb3JlU2Nyb2xsIiwibm93QWZ0ZXJTY3JvbGwiLCJ0cmlnZ2VyZWRCYWNrd2FyZCIsInRyaWdnZXJlZEZvcndhcmQiLCJwYXJzZUZsb2F0IiwiaW5kZXhPZiIsIk1hdGgiLCJjZWlsIiwiZmxvb3IiLCJmaW5kQnlFbGVtZW50IiwiY29udGV4dElkIiwicmVxdWVzdEZuIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FsbCIsImJ5VHJpZ2dlclBvaW50IiwiYSIsImIiLCJieVJldmVyc2VUcmlnZ2VyUG9pbnQiLCJncm91cHMiLCJjbGVhclRyaWdnZXJRdWV1ZXMiLCJ0cmlnZ2VyUXVldWVzIiwidXAiLCJkb3duIiwicmlnaHQiLCJyZXZlcnNlIiwic29ydCIsImluZGV4IiwiaW5BcnJheSIsImlzTGFzdCIsInNwbGljZSIsImZpcnN0IiwibGFzdCIsImdldFdpbmRvdyIsImRlZmF1bHRWaWV3IiwiTm9GcmFtZXdvcmtBZGFwdGVyIiwiaGFuZGxlcnMiLCJpc1dpbiIsImV2ZW50IiwicmVtb3ZlTGlzdGVuZXJzIiwibGlzdGVuZXJzIiwibGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnRQYXJ0cyIsInNwbGl0IiwiZXZlbnRUeXBlIiwibmFtZXNwYWNlIiwibnMiLCJ0eXBlIiwib3duZXJEb2N1bWVudCIsIndpbiIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJwYWdlWU9mZnNldCIsImNsaWVudFRvcCIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50TGVmdCIsIm5zSGFuZGxlcnMiLCJuc1R5cGVMaXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluY2x1ZGVNYXJnaW4iLCJoZWlnaHQiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBhcnNlSW50IiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwid2lkdGgiLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJBcnJheSIsInNsaWNlIiwiYXJndW1lbnRzIiwibWVyZ2UiLCJ0YXJnZXQiLCJvYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImFycmF5IiwiUmV2ZWFsT25TY3JvbGwiLCIkIiwibW9iaWxlTWVudSIsIk1vYmlsZU1lbnUiLCJzdGlja3lIZWFkZXIiLCJTdGlja3lIZWFkZXIiLCJtZW51SWNvbiIsIm1lbnVDb250ZW50IiwiZXZlbnRzIiwiY2xpY2siLCJ0b2dnbGVNZW51SWNvbiIsInRvZ2dsZVRoZU1lbnUiLCJiaW5kIiwidG9nZ2xlQ2xhc3MiLCJlbHMiLCJpdGVtc1RvUmV2ZWFsIiwib2Zmc2V0UGVyY2VudGFnZSIsImhpZGVJbml0aWFsbHkiLCJjcmVhdGVXYXlwb2ludHMiLCJhZGRDbGFzcyIsInRoYXQiLCJlYWNoIiwiY3VycmVudEl0ZW0iLCJzaXRlSGVhZGVyIiwiaGVhZGVyVHJpZ2VyRWxlbWVudCIsImNyZWF0ZUhlYWRlcldheXBvaW50IiwicmVtb3ZlQ2xhc3MiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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LEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekJBLHdCIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qIVxuV2F5cG9pbnRzIC0gNC4wLjFcbkNvcHlyaWdodCDCqSAyMDExLTIwMTYgQ2FsZWIgVHJvdWdodG9uXG5MaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5odHRwczovL2dpdGh1Yi5jb20vaW1ha2V3ZWJ0aGluZ3Mvd2F5cG9pbnRzL2Jsb2IvbWFzdGVyL2xpY2Vuc2VzLnR4dFxuKi9cbihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgdmFyIGtleUNvdW50ZXIgPSAwXG4gIHZhciBhbGxXYXlwb2ludHMgPSB7fVxuXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS93YXlwb2ludCAqL1xuICBmdW5jdGlvbiBXYXlwb2ludChvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIG9wdGlvbnMgcGFzc2VkIHRvIFdheXBvaW50IGNvbnN0cnVjdG9yJylcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmVsZW1lbnQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZWxlbWVudCBvcHRpb24gcGFzc2VkIHRvIFdheXBvaW50IGNvbnN0cnVjdG9yJylcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLmhhbmRsZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gaGFuZGxlciBvcHRpb24gcGFzc2VkIHRvIFdheXBvaW50IGNvbnN0cnVjdG9yJylcbiAgICB9XG5cbiAgICB0aGlzLmtleSA9ICd3YXlwb2ludC0nICsga2V5Q291bnRlclxuICAgIHRoaXMub3B0aW9ucyA9IFdheXBvaW50LkFkYXB0ZXIuZXh0ZW5kKHt9LCBXYXlwb2ludC5kZWZhdWx0cywgb3B0aW9ucylcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLm9wdGlvbnMuZWxlbWVudFxuICAgIHRoaXMuYWRhcHRlciA9IG5ldyBXYXlwb2ludC5BZGFwdGVyKHRoaXMuZWxlbWVudClcbiAgICB0aGlzLmNhbGxiYWNrID0gb3B0aW9ucy5oYW5kbGVyXG4gICAgdGhpcy5heGlzID0gdGhpcy5vcHRpb25zLmhvcml6b250YWwgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnXG4gICAgdGhpcy5lbmFibGVkID0gdGhpcy5vcHRpb25zLmVuYWJsZWRcbiAgICB0aGlzLnRyaWdnZXJQb2ludCA9IG51bGxcbiAgICB0aGlzLmdyb3VwID0gV2F5cG9pbnQuR3JvdXAuZmluZE9yQ3JlYXRlKHtcbiAgICAgIG5hbWU6IHRoaXMub3B0aW9ucy5ncm91cCxcbiAgICAgIGF4aXM6IHRoaXMuYXhpc1xuICAgIH0pXG4gICAgdGhpcy5jb250ZXh0ID0gV2F5cG9pbnQuQ29udGV4dC5maW5kT3JDcmVhdGVCeUVsZW1lbnQodGhpcy5vcHRpb25zLmNvbnRleHQpXG5cbiAgICBpZiAoV2F5cG9pbnQub2Zmc2V0QWxpYXNlc1t0aGlzLm9wdGlvbnMub2Zmc2V0XSkge1xuICAgICAgdGhpcy5vcHRpb25zLm9mZnNldCA9IFdheXBvaW50Lm9mZnNldEFsaWFzZXNbdGhpcy5vcHRpb25zLm9mZnNldF1cbiAgICB9XG4gICAgdGhpcy5ncm91cC5hZGQodGhpcylcbiAgICB0aGlzLmNvbnRleHQuYWRkKHRoaXMpXG4gICAgYWxsV2F5cG9pbnRzW3RoaXMua2V5XSA9IHRoaXNcbiAgICBrZXlDb3VudGVyICs9IDFcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgV2F5cG9pbnQucHJvdG90eXBlLnF1ZXVlVHJpZ2dlciA9IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xuICAgIHRoaXMuZ3JvdXAucXVldWVUcmlnZ2VyKHRoaXMsIGRpcmVjdGlvbilcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgV2F5cG9pbnQucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgaWYgKCF0aGlzLmVuYWJsZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAodGhpcy5jYWxsYmFjaykge1xuICAgICAgdGhpcy5jYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKVxuICAgIH1cbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvZGVzdHJveSAqL1xuICBXYXlwb2ludC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY29udGV4dC5yZW1vdmUodGhpcylcbiAgICB0aGlzLmdyb3VwLnJlbW92ZSh0aGlzKVxuICAgIGRlbGV0ZSBhbGxXYXlwb2ludHNbdGhpcy5rZXldXG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2Rpc2FibGUgKi9cbiAgV2F5cG9pbnQucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2VuYWJsZSAqL1xuICBXYXlwb2ludC5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb250ZXh0LnJlZnJlc2goKVxuICAgIHRoaXMuZW5hYmxlZCA9IHRydWVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9uZXh0ICovXG4gIFdheXBvaW50LnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JvdXAubmV4dCh0aGlzKVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9wcmV2aW91cyAqL1xuICBXYXlwb2ludC5wcm90b3R5cGUucHJldmlvdXMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5ncm91cC5wcmV2aW91cyh0aGlzKVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBXYXlwb2ludC5pbnZva2VBbGwgPSBmdW5jdGlvbihtZXRob2QpIHtcbiAgICB2YXIgYWxsV2F5cG9pbnRzQXJyYXkgPSBbXVxuICAgIGZvciAodmFyIHdheXBvaW50S2V5IGluIGFsbFdheXBvaW50cykge1xuICAgICAgYWxsV2F5cG9pbnRzQXJyYXkucHVzaChhbGxXYXlwb2ludHNbd2F5cG9pbnRLZXldKVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgZW5kID0gYWxsV2F5cG9pbnRzQXJyYXkubGVuZ3RoOyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIGFsbFdheXBvaW50c0FycmF5W2ldW21ldGhvZF0oKVxuICAgIH1cbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvZGVzdHJveS1hbGwgKi9cbiAgV2F5cG9pbnQuZGVzdHJveUFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIFdheXBvaW50Lmludm9rZUFsbCgnZGVzdHJveScpXG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2Rpc2FibGUtYWxsICovXG4gIFdheXBvaW50LmRpc2FibGVBbGwgPSBmdW5jdGlvbigpIHtcbiAgICBXYXlwb2ludC5pbnZva2VBbGwoJ2Rpc2FibGUnKVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9lbmFibGUtYWxsICovXG4gIFdheXBvaW50LmVuYWJsZUFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIFdheXBvaW50LkNvbnRleHQucmVmcmVzaEFsbCgpXG4gICAgZm9yICh2YXIgd2F5cG9pbnRLZXkgaW4gYWxsV2F5cG9pbnRzKSB7XG4gICAgICBhbGxXYXlwb2ludHNbd2F5cG9pbnRLZXldLmVuYWJsZWQgPSB0cnVlXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL3JlZnJlc2gtYWxsICovXG4gIFdheXBvaW50LnJlZnJlc2hBbGwgPSBmdW5jdGlvbigpIHtcbiAgICBXYXlwb2ludC5Db250ZXh0LnJlZnJlc2hBbGwoKVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS92aWV3cG9ydC1oZWlnaHQgKi9cbiAgV2F5cG9pbnQudmlld3BvcnRIZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvdmlld3BvcnQtd2lkdGggKi9cbiAgV2F5cG9pbnQudmlld3BvcnRXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhcbiAgfVxuXG4gIFdheXBvaW50LmFkYXB0ZXJzID0gW11cblxuICBXYXlwb2ludC5kZWZhdWx0cyA9IHtcbiAgICBjb250ZXh0OiB3aW5kb3csXG4gICAgY29udGludW91czogdHJ1ZSxcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIGdyb3VwOiAnZGVmYXVsdCcsXG4gICAgaG9yaXpvbnRhbDogZmFsc2UsXG4gICAgb2Zmc2V0OiAwXG4gIH1cblxuICBXYXlwb2ludC5vZmZzZXRBbGlhc2VzID0ge1xuICAgICdib3R0b20taW4tdmlldyc6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udGV4dC5pbm5lckhlaWdodCgpIC0gdGhpcy5hZGFwdGVyLm91dGVySGVpZ2h0KClcbiAgICB9LFxuICAgICdyaWdodC1pbi12aWV3JzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmlubmVyV2lkdGgoKSAtIHRoaXMuYWRhcHRlci5vdXRlcldpZHRoKClcbiAgICB9XG4gIH1cblxuICB3aW5kb3cuV2F5cG9pbnQgPSBXYXlwb2ludFxufSgpKVxuOyhmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgZnVuY3Rpb24gcmVxdWVzdEFuaW1hdGlvbkZyYW1lU2hpbShjYWxsYmFjaykge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KGNhbGxiYWNrLCAxMDAwIC8gNjApXG4gIH1cblxuICB2YXIga2V5Q291bnRlciA9IDBcbiAgdmFyIGNvbnRleHRzID0ge31cbiAgdmFyIFdheXBvaW50ID0gd2luZG93LldheXBvaW50XG4gIHZhciBvbGRXaW5kb3dMb2FkID0gd2luZG93Lm9ubG9hZFxuXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9jb250ZXh0ICovXG4gIGZ1bmN0aW9uIENvbnRleHQoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgICB0aGlzLkFkYXB0ZXIgPSBXYXlwb2ludC5BZGFwdGVyXG4gICAgdGhpcy5hZGFwdGVyID0gbmV3IHRoaXMuQWRhcHRlcihlbGVtZW50KVxuICAgIHRoaXMua2V5ID0gJ3dheXBvaW50LWNvbnRleHQtJyArIGtleUNvdW50ZXJcbiAgICB0aGlzLmRpZFNjcm9sbCA9IGZhbHNlXG4gICAgdGhpcy5kaWRSZXNpemUgPSBmYWxzZVxuICAgIHRoaXMub2xkU2Nyb2xsID0ge1xuICAgICAgeDogdGhpcy5hZGFwdGVyLnNjcm9sbExlZnQoKSxcbiAgICAgIHk6IHRoaXMuYWRhcHRlci5zY3JvbGxUb3AoKVxuICAgIH1cbiAgICB0aGlzLndheXBvaW50cyA9IHtcbiAgICAgIHZlcnRpY2FsOiB7fSxcbiAgICAgIGhvcml6b250YWw6IHt9XG4gICAgfVxuXG4gICAgZWxlbWVudC53YXlwb2ludENvbnRleHRLZXkgPSB0aGlzLmtleVxuICAgIGNvbnRleHRzW2VsZW1lbnQud2F5cG9pbnRDb250ZXh0S2V5XSA9IHRoaXNcbiAgICBrZXlDb3VudGVyICs9IDFcbiAgICBpZiAoIVdheXBvaW50LndpbmRvd0NvbnRleHQpIHtcbiAgICAgIFdheXBvaW50LndpbmRvd0NvbnRleHQgPSB0cnVlXG4gICAgICBXYXlwb2ludC53aW5kb3dDb250ZXh0ID0gbmV3IENvbnRleHQod2luZG93KVxuICAgIH1cblxuICAgIHRoaXMuY3JlYXRlVGhyb3R0bGVkU2Nyb2xsSGFuZGxlcigpXG4gICAgdGhpcy5jcmVhdGVUaHJvdHRsZWRSZXNpemVIYW5kbGVyKClcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24od2F5cG9pbnQpIHtcbiAgICB2YXIgYXhpcyA9IHdheXBvaW50Lm9wdGlvbnMuaG9yaXpvbnRhbCA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCdcbiAgICB0aGlzLndheXBvaW50c1theGlzXVt3YXlwb2ludC5rZXldID0gd2F5cG9pbnRcbiAgICB0aGlzLnJlZnJlc2goKVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5jaGVja0VtcHR5ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGhvcml6b250YWxFbXB0eSA9IHRoaXMuQWRhcHRlci5pc0VtcHR5T2JqZWN0KHRoaXMud2F5cG9pbnRzLmhvcml6b250YWwpXG4gICAgdmFyIHZlcnRpY2FsRW1wdHkgPSB0aGlzLkFkYXB0ZXIuaXNFbXB0eU9iamVjdCh0aGlzLndheXBvaW50cy52ZXJ0aWNhbClcbiAgICB2YXIgaXNXaW5kb3cgPSB0aGlzLmVsZW1lbnQgPT0gdGhpcy5lbGVtZW50LndpbmRvd1xuICAgIGlmIChob3Jpem9udGFsRW1wdHkgJiYgdmVydGljYWxFbXB0eSAmJiAhaXNXaW5kb3cpIHtcbiAgICAgIHRoaXMuYWRhcHRlci5vZmYoJy53YXlwb2ludHMnKVxuICAgICAgZGVsZXRlIGNvbnRleHRzW3RoaXMua2V5XVxuICAgIH1cbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuXG4gICAgZnVuY3Rpb24gcmVzaXplSGFuZGxlcigpIHtcbiAgICAgIHNlbGYuaGFuZGxlUmVzaXplKClcbiAgICAgIHNlbGYuZGlkUmVzaXplID0gZmFsc2VcbiAgICB9XG5cbiAgICB0aGlzLmFkYXB0ZXIub24oJ3Jlc2l6ZS53YXlwb2ludHMnLCBmdW5jdGlvbigpIHtcbiAgICAgIGlmICghc2VsZi5kaWRSZXNpemUpIHtcbiAgICAgICAgc2VsZi5kaWRSZXNpemUgPSB0cnVlXG4gICAgICAgIFdheXBvaW50LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZXNpemVIYW5kbGVyKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQucHJvdG90eXBlLmNyZWF0ZVRocm90dGxlZFNjcm9sbEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICBmdW5jdGlvbiBzY3JvbGxIYW5kbGVyKCkge1xuICAgICAgc2VsZi5oYW5kbGVTY3JvbGwoKVxuICAgICAgc2VsZi5kaWRTY3JvbGwgPSBmYWxzZVxuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlci5vbignc2Nyb2xsLndheXBvaW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFzZWxmLmRpZFNjcm9sbCB8fCBXYXlwb2ludC5pc1RvdWNoKSB7XG4gICAgICAgIHNlbGYuZGlkU2Nyb2xsID0gdHJ1ZVxuICAgICAgICBXYXlwb2ludC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2Nyb2xsSGFuZGxlcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5oYW5kbGVSZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgICBXYXlwb2ludC5Db250ZXh0LnJlZnJlc2hBbGwoKVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5oYW5kbGVTY3JvbGwgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdHJpZ2dlcmVkR3JvdXBzID0ge31cbiAgICB2YXIgYXhlcyA9IHtcbiAgICAgIGhvcml6b250YWw6IHtcbiAgICAgICAgbmV3U2Nyb2xsOiB0aGlzLmFkYXB0ZXIuc2Nyb2xsTGVmdCgpLFxuICAgICAgICBvbGRTY3JvbGw6IHRoaXMub2xkU2Nyb2xsLngsXG4gICAgICAgIGZvcndhcmQ6ICdyaWdodCcsXG4gICAgICAgIGJhY2t3YXJkOiAnbGVmdCdcbiAgICAgIH0sXG4gICAgICB2ZXJ0aWNhbDoge1xuICAgICAgICBuZXdTY3JvbGw6IHRoaXMuYWRhcHRlci5zY3JvbGxUb3AoKSxcbiAgICAgICAgb2xkU2Nyb2xsOiB0aGlzLm9sZFNjcm9sbC55LFxuICAgICAgICBmb3J3YXJkOiAnZG93bicsXG4gICAgICAgIGJhY2t3YXJkOiAndXAnXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgYXhpc0tleSBpbiBheGVzKSB7XG4gICAgICB2YXIgYXhpcyA9IGF4ZXNbYXhpc0tleV1cbiAgICAgIHZhciBpc0ZvcndhcmQgPSBheGlzLm5ld1Njcm9sbCA+IGF4aXMub2xkU2Nyb2xsXG4gICAgICB2YXIgZGlyZWN0aW9uID0gaXNGb3J3YXJkID8gYXhpcy5mb3J3YXJkIDogYXhpcy5iYWNrd2FyZFxuXG4gICAgICBmb3IgKHZhciB3YXlwb2ludEtleSBpbiB0aGlzLndheXBvaW50c1theGlzS2V5XSkge1xuICAgICAgICB2YXIgd2F5cG9pbnQgPSB0aGlzLndheXBvaW50c1theGlzS2V5XVt3YXlwb2ludEtleV1cbiAgICAgICAgaWYgKHdheXBvaW50LnRyaWdnZXJQb2ludCA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdhc0JlZm9yZVRyaWdnZXJQb2ludCA9IGF4aXMub2xkU2Nyb2xsIDwgd2F5cG9pbnQudHJpZ2dlclBvaW50XG4gICAgICAgIHZhciBub3dBZnRlclRyaWdnZXJQb2ludCA9IGF4aXMubmV3U2Nyb2xsID49IHdheXBvaW50LnRyaWdnZXJQb2ludFxuICAgICAgICB2YXIgY3Jvc3NlZEZvcndhcmQgPSB3YXNCZWZvcmVUcmlnZ2VyUG9pbnQgJiYgbm93QWZ0ZXJUcmlnZ2VyUG9pbnRcbiAgICAgICAgdmFyIGNyb3NzZWRCYWNrd2FyZCA9ICF3YXNCZWZvcmVUcmlnZ2VyUG9pbnQgJiYgIW5vd0FmdGVyVHJpZ2dlclBvaW50XG4gICAgICAgIGlmIChjcm9zc2VkRm9yd2FyZCB8fCBjcm9zc2VkQmFja3dhcmQpIHtcbiAgICAgICAgICB3YXlwb2ludC5xdWV1ZVRyaWdnZXIoZGlyZWN0aW9uKVxuICAgICAgICAgIHRyaWdnZXJlZEdyb3Vwc1t3YXlwb2ludC5ncm91cC5pZF0gPSB3YXlwb2ludC5ncm91cFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgZ3JvdXBLZXkgaW4gdHJpZ2dlcmVkR3JvdXBzKSB7XG4gICAgICB0cmlnZ2VyZWRHcm91cHNbZ3JvdXBLZXldLmZsdXNoVHJpZ2dlcnMoKVxuICAgIH1cblxuICAgIHRoaXMub2xkU2Nyb2xsID0ge1xuICAgICAgeDogYXhlcy5ob3Jpem9udGFsLm5ld1Njcm9sbCxcbiAgICAgIHk6IGF4ZXMudmVydGljYWwubmV3U2Nyb2xsXG4gICAgfVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5pbm5lckhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgIC8qZXNsaW50LWRpc2FibGUgZXFlcWVxICovXG4gICAgaWYgKHRoaXMuZWxlbWVudCA9PSB0aGlzLmVsZW1lbnQud2luZG93KSB7XG4gICAgICByZXR1cm4gV2F5cG9pbnQudmlld3BvcnRIZWlnaHQoKVxuICAgIH1cbiAgICAvKmVzbGludC1lbmFibGUgZXFlcWVxICovXG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5pbm5lckhlaWdodCgpXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKHdheXBvaW50KSB7XG4gICAgZGVsZXRlIHRoaXMud2F5cG9pbnRzW3dheXBvaW50LmF4aXNdW3dheXBvaW50LmtleV1cbiAgICB0aGlzLmNoZWNrRW1wdHkoKVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5pbm5lcldpZHRoID0gZnVuY3Rpb24oKSB7XG4gICAgLyplc2xpbnQtZGlzYWJsZSBlcWVxZXEgKi9cbiAgICBpZiAodGhpcy5lbGVtZW50ID09IHRoaXMuZWxlbWVudC53aW5kb3cpIHtcbiAgICAgIHJldHVybiBXYXlwb2ludC52aWV3cG9ydFdpZHRoKClcbiAgICB9XG4gICAgLyplc2xpbnQtZW5hYmxlIGVxZXFlcSAqL1xuICAgIHJldHVybiB0aGlzLmFkYXB0ZXIuaW5uZXJXaWR0aCgpXG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2NvbnRleHQtZGVzdHJveSAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFsbFdheXBvaW50cyA9IFtdXG4gICAgZm9yICh2YXIgYXhpcyBpbiB0aGlzLndheXBvaW50cykge1xuICAgICAgZm9yICh2YXIgd2F5cG9pbnRLZXkgaW4gdGhpcy53YXlwb2ludHNbYXhpc10pIHtcbiAgICAgICAgYWxsV2F5cG9pbnRzLnB1c2godGhpcy53YXlwb2ludHNbYXhpc11bd2F5cG9pbnRLZXldKVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMCwgZW5kID0gYWxsV2F5cG9pbnRzLmxlbmd0aDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICBhbGxXYXlwb2ludHNbaV0uZGVzdHJveSgpXG4gICAgfVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9jb250ZXh0LXJlZnJlc2ggKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xuICAgIC8qZXNsaW50LWRpc2FibGUgZXFlcWVxICovXG4gICAgdmFyIGlzV2luZG93ID0gdGhpcy5lbGVtZW50ID09IHRoaXMuZWxlbWVudC53aW5kb3dcbiAgICAvKmVzbGludC1lbmFibGUgZXFlcWVxICovXG4gICAgdmFyIGNvbnRleHRPZmZzZXQgPSBpc1dpbmRvdyA/IHVuZGVmaW5lZCA6IHRoaXMuYWRhcHRlci5vZmZzZXQoKVxuICAgIHZhciB0cmlnZ2VyZWRHcm91cHMgPSB7fVxuICAgIHZhciBheGVzXG5cbiAgICB0aGlzLmhhbmRsZVNjcm9sbCgpXG4gICAgYXhlcyA9IHtcbiAgICAgIGhvcml6b250YWw6IHtcbiAgICAgICAgY29udGV4dE9mZnNldDogaXNXaW5kb3cgPyAwIDogY29udGV4dE9mZnNldC5sZWZ0LFxuICAgICAgICBjb250ZXh0U2Nyb2xsOiBpc1dpbmRvdyA/IDAgOiB0aGlzLm9sZFNjcm9sbC54LFxuICAgICAgICBjb250ZXh0RGltZW5zaW9uOiB0aGlzLmlubmVyV2lkdGgoKSxcbiAgICAgICAgb2xkU2Nyb2xsOiB0aGlzLm9sZFNjcm9sbC54LFxuICAgICAgICBmb3J3YXJkOiAncmlnaHQnLFxuICAgICAgICBiYWNrd2FyZDogJ2xlZnQnLFxuICAgICAgICBvZmZzZXRQcm9wOiAnbGVmdCdcbiAgICAgIH0sXG4gICAgICB2ZXJ0aWNhbDoge1xuICAgICAgICBjb250ZXh0T2Zmc2V0OiBpc1dpbmRvdyA/IDAgOiBjb250ZXh0T2Zmc2V0LnRvcCxcbiAgICAgICAgY29udGV4dFNjcm9sbDogaXNXaW5kb3cgPyAwIDogdGhpcy5vbGRTY3JvbGwueSxcbiAgICAgICAgY29udGV4dERpbWVuc2lvbjogdGhpcy5pbm5lckhlaWdodCgpLFxuICAgICAgICBvbGRTY3JvbGw6IHRoaXMub2xkU2Nyb2xsLnksXG4gICAgICAgIGZvcndhcmQ6ICdkb3duJyxcbiAgICAgICAgYmFja3dhcmQ6ICd1cCcsXG4gICAgICAgIG9mZnNldFByb3A6ICd0b3AnXG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgYXhpc0tleSBpbiBheGVzKSB7XG4gICAgICB2YXIgYXhpcyA9IGF4ZXNbYXhpc0tleV1cbiAgICAgIGZvciAodmFyIHdheXBvaW50S2V5IGluIHRoaXMud2F5cG9pbnRzW2F4aXNLZXldKSB7XG4gICAgICAgIHZhciB3YXlwb2ludCA9IHRoaXMud2F5cG9pbnRzW2F4aXNLZXldW3dheXBvaW50S2V5XVxuICAgICAgICB2YXIgYWRqdXN0bWVudCA9IHdheXBvaW50Lm9wdGlvbnMub2Zmc2V0XG4gICAgICAgIHZhciBvbGRUcmlnZ2VyUG9pbnQgPSB3YXlwb2ludC50cmlnZ2VyUG9pbnRcbiAgICAgICAgdmFyIGVsZW1lbnRPZmZzZXQgPSAwXG4gICAgICAgIHZhciBmcmVzaFdheXBvaW50ID0gb2xkVHJpZ2dlclBvaW50ID09IG51bGxcbiAgICAgICAgdmFyIGNvbnRleHRNb2RpZmllciwgd2FzQmVmb3JlU2Nyb2xsLCBub3dBZnRlclNjcm9sbFxuICAgICAgICB2YXIgdHJpZ2dlcmVkQmFja3dhcmQsIHRyaWdnZXJlZEZvcndhcmRcblxuICAgICAgICBpZiAod2F5cG9pbnQuZWxlbWVudCAhPT0gd2F5cG9pbnQuZWxlbWVudC53aW5kb3cpIHtcbiAgICAgICAgICBlbGVtZW50T2Zmc2V0ID0gd2F5cG9pbnQuYWRhcHRlci5vZmZzZXQoKVtheGlzLm9mZnNldFByb3BdXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGFkanVzdG1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBhZGp1c3RtZW50ID0gYWRqdXN0bWVudC5hcHBseSh3YXlwb2ludClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgYWRqdXN0bWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBhZGp1c3RtZW50ID0gcGFyc2VGbG9hdChhZGp1c3RtZW50KVxuICAgICAgICAgIGlmICh3YXlwb2ludC5vcHRpb25zLm9mZnNldC5pbmRleE9mKCclJykgPiAtIDEpIHtcbiAgICAgICAgICAgIGFkanVzdG1lbnQgPSBNYXRoLmNlaWwoYXhpcy5jb250ZXh0RGltZW5zaW9uICogYWRqdXN0bWVudCAvIDEwMClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0TW9kaWZpZXIgPSBheGlzLmNvbnRleHRTY3JvbGwgLSBheGlzLmNvbnRleHRPZmZzZXRcbiAgICAgICAgd2F5cG9pbnQudHJpZ2dlclBvaW50ID0gTWF0aC5mbG9vcihlbGVtZW50T2Zmc2V0ICsgY29udGV4dE1vZGlmaWVyIC0gYWRqdXN0bWVudClcbiAgICAgICAgd2FzQmVmb3JlU2Nyb2xsID0gb2xkVHJpZ2dlclBvaW50IDwgYXhpcy5vbGRTY3JvbGxcbiAgICAgICAgbm93QWZ0ZXJTY3JvbGwgPSB3YXlwb2ludC50cmlnZ2VyUG9pbnQgPj0gYXhpcy5vbGRTY3JvbGxcbiAgICAgICAgdHJpZ2dlcmVkQmFja3dhcmQgPSB3YXNCZWZvcmVTY3JvbGwgJiYgbm93QWZ0ZXJTY3JvbGxcbiAgICAgICAgdHJpZ2dlcmVkRm9yd2FyZCA9ICF3YXNCZWZvcmVTY3JvbGwgJiYgIW5vd0FmdGVyU2Nyb2xsXG5cbiAgICAgICAgaWYgKCFmcmVzaFdheXBvaW50ICYmIHRyaWdnZXJlZEJhY2t3YXJkKSB7XG4gICAgICAgICAgd2F5cG9pbnQucXVldWVUcmlnZ2VyKGF4aXMuYmFja3dhcmQpXG4gICAgICAgICAgdHJpZ2dlcmVkR3JvdXBzW3dheXBvaW50Lmdyb3VwLmlkXSA9IHdheXBvaW50Lmdyb3VwXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWZyZXNoV2F5cG9pbnQgJiYgdHJpZ2dlcmVkRm9yd2FyZCkge1xuICAgICAgICAgIHdheXBvaW50LnF1ZXVlVHJpZ2dlcihheGlzLmZvcndhcmQpXG4gICAgICAgICAgdHJpZ2dlcmVkR3JvdXBzW3dheXBvaW50Lmdyb3VwLmlkXSA9IHdheXBvaW50Lmdyb3VwXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZnJlc2hXYXlwb2ludCAmJiBheGlzLm9sZFNjcm9sbCA+PSB3YXlwb2ludC50cmlnZ2VyUG9pbnQpIHtcbiAgICAgICAgICB3YXlwb2ludC5xdWV1ZVRyaWdnZXIoYXhpcy5mb3J3YXJkKVxuICAgICAgICAgIHRyaWdnZXJlZEdyb3Vwc1t3YXlwb2ludC5ncm91cC5pZF0gPSB3YXlwb2ludC5ncm91cFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgV2F5cG9pbnQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgZm9yICh2YXIgZ3JvdXBLZXkgaW4gdHJpZ2dlcmVkR3JvdXBzKSB7XG4gICAgICAgIHRyaWdnZXJlZEdyb3Vwc1tncm91cEtleV0uZmx1c2hUcmlnZ2VycygpXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQuZmluZE9yQ3JlYXRlQnlFbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIHJldHVybiBDb250ZXh0LmZpbmRCeUVsZW1lbnQoZWxlbWVudCkgfHwgbmV3IENvbnRleHQoZWxlbWVudClcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5yZWZyZXNoQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgY29udGV4dElkIGluIGNvbnRleHRzKSB7XG4gICAgICBjb250ZXh0c1tjb250ZXh0SWRdLnJlZnJlc2goKVxuICAgIH1cbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvY29udGV4dC1maW5kLWJ5LWVsZW1lbnQgKi9cbiAgQ29udGV4dC5maW5kQnlFbGVtZW50ID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIHJldHVybiBjb250ZXh0c1tlbGVtZW50LndheXBvaW50Q29udGV4dEtleV1cbiAgfVxuXG4gIHdpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAob2xkV2luZG93TG9hZCkge1xuICAgICAgb2xkV2luZG93TG9hZCgpXG4gICAgfVxuICAgIENvbnRleHQucmVmcmVzaEFsbCgpXG4gIH1cblxuXG4gIFdheXBvaW50LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlcXVlc3RGbiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZVNoaW1cbiAgICByZXF1ZXN0Rm4uY2FsbCh3aW5kb3csIGNhbGxiYWNrKVxuICB9XG4gIFdheXBvaW50LkNvbnRleHQgPSBDb250ZXh0XG59KCkpXG47KGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCdcblxuICBmdW5jdGlvbiBieVRyaWdnZXJQb2ludChhLCBiKSB7XG4gICAgcmV0dXJuIGEudHJpZ2dlclBvaW50IC0gYi50cmlnZ2VyUG9pbnRcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ5UmV2ZXJzZVRyaWdnZXJQb2ludChhLCBiKSB7XG4gICAgcmV0dXJuIGIudHJpZ2dlclBvaW50IC0gYS50cmlnZ2VyUG9pbnRcbiAgfVxuXG4gIHZhciBncm91cHMgPSB7XG4gICAgdmVydGljYWw6IHt9LFxuICAgIGhvcml6b250YWw6IHt9XG4gIH1cbiAgdmFyIFdheXBvaW50ID0gd2luZG93LldheXBvaW50XG5cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2dyb3VwICovXG4gIGZ1bmN0aW9uIEdyb3VwKG9wdGlvbnMpIHtcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWVcbiAgICB0aGlzLmF4aXMgPSBvcHRpb25zLmF4aXNcbiAgICB0aGlzLmlkID0gdGhpcy5uYW1lICsgJy0nICsgdGhpcy5heGlzXG4gICAgdGhpcy53YXlwb2ludHMgPSBbXVxuICAgIHRoaXMuY2xlYXJUcmlnZ2VyUXVldWVzKClcbiAgICBncm91cHNbdGhpcy5heGlzXVt0aGlzLm5hbWVdID0gdGhpc1xuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBHcm91cC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24od2F5cG9pbnQpIHtcbiAgICB0aGlzLndheXBvaW50cy5wdXNoKHdheXBvaW50KVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBHcm91cC5wcm90b3R5cGUuY2xlYXJUcmlnZ2VyUXVldWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50cmlnZ2VyUXVldWVzID0ge1xuICAgICAgdXA6IFtdLFxuICAgICAgZG93bjogW10sXG4gICAgICBsZWZ0OiBbXSxcbiAgICAgIHJpZ2h0OiBbXVxuICAgIH1cbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgR3JvdXAucHJvdG90eXBlLmZsdXNoVHJpZ2dlcnMgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBkaXJlY3Rpb24gaW4gdGhpcy50cmlnZ2VyUXVldWVzKSB7XG4gICAgICB2YXIgd2F5cG9pbnRzID0gdGhpcy50cmlnZ2VyUXVldWVzW2RpcmVjdGlvbl1cbiAgICAgIHZhciByZXZlcnNlID0gZGlyZWN0aW9uID09PSAndXAnIHx8IGRpcmVjdGlvbiA9PT0gJ2xlZnQnXG4gICAgICB3YXlwb2ludHMuc29ydChyZXZlcnNlID8gYnlSZXZlcnNlVHJpZ2dlclBvaW50IDogYnlUcmlnZ2VyUG9pbnQpXG4gICAgICBmb3IgKHZhciBpID0gMCwgZW5kID0gd2F5cG9pbnRzLmxlbmd0aDsgaSA8IGVuZDsgaSArPSAxKSB7XG4gICAgICAgIHZhciB3YXlwb2ludCA9IHdheXBvaW50c1tpXVxuICAgICAgICBpZiAod2F5cG9pbnQub3B0aW9ucy5jb250aW51b3VzIHx8IGkgPT09IHdheXBvaW50cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgd2F5cG9pbnQudHJpZ2dlcihbZGlyZWN0aW9uXSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNsZWFyVHJpZ2dlclF1ZXVlcygpXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIEdyb3VwLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24od2F5cG9pbnQpIHtcbiAgICB0aGlzLndheXBvaW50cy5zb3J0KGJ5VHJpZ2dlclBvaW50KVxuICAgIHZhciBpbmRleCA9IFdheXBvaW50LkFkYXB0ZXIuaW5BcnJheSh3YXlwb2ludCwgdGhpcy53YXlwb2ludHMpXG4gICAgdmFyIGlzTGFzdCA9IGluZGV4ID09PSB0aGlzLndheXBvaW50cy5sZW5ndGggLSAxXG4gICAgcmV0dXJuIGlzTGFzdCA/IG51bGwgOiB0aGlzLndheXBvaW50c1tpbmRleCArIDFdXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIEdyb3VwLnByb3RvdHlwZS5wcmV2aW91cyA9IGZ1bmN0aW9uKHdheXBvaW50KSB7XG4gICAgdGhpcy53YXlwb2ludHMuc29ydChieVRyaWdnZXJQb2ludClcbiAgICB2YXIgaW5kZXggPSBXYXlwb2ludC5BZGFwdGVyLmluQXJyYXkod2F5cG9pbnQsIHRoaXMud2F5cG9pbnRzKVxuICAgIHJldHVybiBpbmRleCA/IHRoaXMud2F5cG9pbnRzW2luZGV4IC0gMV0gOiBudWxsXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIEdyb3VwLnByb3RvdHlwZS5xdWV1ZVRyaWdnZXIgPSBmdW5jdGlvbih3YXlwb2ludCwgZGlyZWN0aW9uKSB7XG4gICAgdGhpcy50cmlnZ2VyUXVldWVzW2RpcmVjdGlvbl0ucHVzaCh3YXlwb2ludClcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgR3JvdXAucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKHdheXBvaW50KSB7XG4gICAgdmFyIGluZGV4ID0gV2F5cG9pbnQuQWRhcHRlci5pbkFycmF5KHdheXBvaW50LCB0aGlzLndheXBvaW50cylcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy53YXlwb2ludHMuc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvZmlyc3QgKi9cbiAgR3JvdXAucHJvdG90eXBlLmZpcnN0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMud2F5cG9pbnRzWzBdXG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2xhc3QgKi9cbiAgR3JvdXAucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy53YXlwb2ludHNbdGhpcy53YXlwb2ludHMubGVuZ3RoIC0gMV1cbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgR3JvdXAuZmluZE9yQ3JlYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHJldHVybiBncm91cHNbb3B0aW9ucy5heGlzXVtvcHRpb25zLm5hbWVdIHx8IG5ldyBHcm91cChvcHRpb25zKVxuICB9XG5cbiAgV2F5cG9pbnQuR3JvdXAgPSBHcm91cFxufSgpKVxuOyhmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnXG5cbiAgdmFyIFdheXBvaW50ID0gd2luZG93LldheXBvaW50XG5cbiAgZnVuY3Rpb24gaXNXaW5kb3coZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50ID09PSBlbGVtZW50LndpbmRvd1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V2luZG93KGVsZW1lbnQpIHtcbiAgICBpZiAoaXNXaW5kb3coZWxlbWVudCkpIHtcbiAgICAgIHJldHVybiBlbGVtZW50XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50LmRlZmF1bHRWaWV3XG4gIH1cblxuICBmdW5jdGlvbiBOb0ZyYW1ld29ya0FkYXB0ZXIoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnRcbiAgICB0aGlzLmhhbmRsZXJzID0ge31cbiAgfVxuXG4gIE5vRnJhbWV3b3JrQWRhcHRlci5wcm90b3R5cGUuaW5uZXJIZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXNXaW4gPSBpc1dpbmRvdyh0aGlzLmVsZW1lbnQpXG4gICAgcmV0dXJuIGlzV2luID8gdGhpcy5lbGVtZW50LmlubmVySGVpZ2h0IDogdGhpcy5lbGVtZW50LmNsaWVudEhlaWdodFxuICB9XG5cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLnByb3RvdHlwZS5pbm5lcldpZHRoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlzV2luID0gaXNXaW5kb3codGhpcy5lbGVtZW50KVxuICAgIHJldHVybiBpc1dpbiA/IHRoaXMuZWxlbWVudC5pbm5lcldpZHRoIDogdGhpcy5lbGVtZW50LmNsaWVudFdpZHRoXG4gIH1cblxuICBOb0ZyYW1ld29ya0FkYXB0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXJzKGVsZW1lbnQsIGxpc3RlbmVycywgaGFuZGxlcikge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGVuZCA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpIDwgZW5kOyBpKyspIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldXG4gICAgICAgIGlmICghaGFuZGxlciB8fCBoYW5kbGVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgIGVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBldmVudFBhcnRzID0gZXZlbnQuc3BsaXQoJy4nKVxuICAgIHZhciBldmVudFR5cGUgPSBldmVudFBhcnRzWzBdXG4gICAgdmFyIG5hbWVzcGFjZSA9IGV2ZW50UGFydHNbMV1cbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudFxuXG4gICAgaWYgKG5hbWVzcGFjZSAmJiB0aGlzLmhhbmRsZXJzW25hbWVzcGFjZV0gJiYgZXZlbnRUeXBlKSB7XG4gICAgICByZW1vdmVMaXN0ZW5lcnMoZWxlbWVudCwgdGhpcy5oYW5kbGVyc1tuYW1lc3BhY2VdW2V2ZW50VHlwZV0sIGhhbmRsZXIpXG4gICAgICB0aGlzLmhhbmRsZXJzW25hbWVzcGFjZV1bZXZlbnRUeXBlXSA9IFtdXG4gICAgfVxuICAgIGVsc2UgaWYgKGV2ZW50VHlwZSkge1xuICAgICAgZm9yICh2YXIgbnMgaW4gdGhpcy5oYW5kbGVycykge1xuICAgICAgICByZW1vdmVMaXN0ZW5lcnMoZWxlbWVudCwgdGhpcy5oYW5kbGVyc1tuc11bZXZlbnRUeXBlXSB8fCBbXSwgaGFuZGxlcilcbiAgICAgICAgdGhpcy5oYW5kbGVyc1tuc11bZXZlbnRUeXBlXSA9IFtdXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKG5hbWVzcGFjZSAmJiB0aGlzLmhhbmRsZXJzW25hbWVzcGFjZV0pIHtcbiAgICAgIGZvciAodmFyIHR5cGUgaW4gdGhpcy5oYW5kbGVyc1tuYW1lc3BhY2VdKSB7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVycyhlbGVtZW50LCB0aGlzLmhhbmRsZXJzW25hbWVzcGFjZV1bdHlwZV0sIGhhbmRsZXIpXG4gICAgICB9XG4gICAgICB0aGlzLmhhbmRsZXJzW25hbWVzcGFjZV0gPSB7fVxuICAgIH1cbiAgfVxuXG4gIC8qIEFkYXB0ZWQgZnJvbSBqUXVlcnkgMS54IG9mZnNldCgpICovXG4gIE5vRnJhbWV3b3JrQWRhcHRlci5wcm90b3R5cGUub2Zmc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudCkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICB2YXIgZG9jdW1lbnRFbGVtZW50ID0gdGhpcy5lbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG4gICAgdmFyIHdpbiA9IGdldFdpbmRvdyh0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudClcbiAgICB2YXIgcmVjdCA9IHtcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDBcbiAgICB9XG5cbiAgICBpZiAodGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgcmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB0b3A6IHJlY3QudG9wICsgd2luLnBhZ2VZT2Zmc2V0IC0gZG9jdW1lbnRFbGVtZW50LmNsaWVudFRvcCxcbiAgICAgIGxlZnQ6IHJlY3QubGVmdCArIHdpbi5wYWdlWE9mZnNldCAtIGRvY3VtZW50RWxlbWVudC5jbGllbnRMZWZ0XG4gICAgfVxuICB9XG5cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKGV2ZW50LCBoYW5kbGVyKSB7XG4gICAgdmFyIGV2ZW50UGFydHMgPSBldmVudC5zcGxpdCgnLicpXG4gICAgdmFyIGV2ZW50VHlwZSA9IGV2ZW50UGFydHNbMF1cbiAgICB2YXIgbmFtZXNwYWNlID0gZXZlbnRQYXJ0c1sxXSB8fCAnX19kZWZhdWx0J1xuICAgIHZhciBuc0hhbmRsZXJzID0gdGhpcy5oYW5kbGVyc1tuYW1lc3BhY2VdID0gdGhpcy5oYW5kbGVyc1tuYW1lc3BhY2VdIHx8IHt9XG4gICAgdmFyIG5zVHlwZUxpc3QgPSBuc0hhbmRsZXJzW2V2ZW50VHlwZV0gPSBuc0hhbmRsZXJzW2V2ZW50VHlwZV0gfHwgW11cblxuICAgIG5zVHlwZUxpc3QucHVzaChoYW5kbGVyKVxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlcilcbiAgfVxuXG4gIE5vRnJhbWV3b3JrQWRhcHRlci5wcm90b3R5cGUub3V0ZXJIZWlnaHQgPSBmdW5jdGlvbihpbmNsdWRlTWFyZ2luKSB7XG4gICAgdmFyIGhlaWdodCA9IHRoaXMuaW5uZXJIZWlnaHQoKVxuICAgIHZhciBjb21wdXRlZFN0eWxlXG5cbiAgICBpZiAoaW5jbHVkZU1hcmdpbiAmJiAhaXNXaW5kb3codGhpcy5lbGVtZW50KSkge1xuICAgICAgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudClcbiAgICAgIGhlaWdodCArPSBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpblRvcCwgMTApXG4gICAgICBoZWlnaHQgKz0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5tYXJnaW5Cb3R0b20sIDEwKVxuICAgIH1cblxuICAgIHJldHVybiBoZWlnaHRcbiAgfVxuXG4gIE5vRnJhbWV3b3JrQWRhcHRlci5wcm90b3R5cGUub3V0ZXJXaWR0aCA9IGZ1bmN0aW9uKGluY2x1ZGVNYXJnaW4pIHtcbiAgICB2YXIgd2lkdGggPSB0aGlzLmlubmVyV2lkdGgoKVxuICAgIHZhciBjb21wdXRlZFN0eWxlXG5cbiAgICBpZiAoaW5jbHVkZU1hcmdpbiAmJiAhaXNXaW5kb3codGhpcy5lbGVtZW50KSkge1xuICAgICAgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudClcbiAgICAgIHdpZHRoICs9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUubWFyZ2luTGVmdCwgMTApXG4gICAgICB3aWR0aCArPSBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpblJpZ2h0LCAxMClcbiAgICB9XG5cbiAgICByZXR1cm4gd2lkdGhcbiAgfVxuXG4gIE5vRnJhbWV3b3JrQWRhcHRlci5wcm90b3R5cGUuc2Nyb2xsTGVmdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB3aW4gPSBnZXRXaW5kb3codGhpcy5lbGVtZW50KVxuICAgIHJldHVybiB3aW4gPyB3aW4ucGFnZVhPZmZzZXQgOiB0aGlzLmVsZW1lbnQuc2Nyb2xsTGVmdFxuICB9XG5cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLnByb3RvdHlwZS5zY3JvbGxUb3AgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgd2luID0gZ2V0V2luZG93KHRoaXMuZWxlbWVudClcbiAgICByZXR1cm4gd2luID8gd2luLnBhZ2VZT2Zmc2V0IDogdGhpcy5lbGVtZW50LnNjcm9sbFRvcFxuICB9XG5cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLmV4dGVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuXG4gICAgZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBvYmopIHtcbiAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IG9ialtrZXldXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0YXJnZXRcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMSwgZW5kID0gYXJncy5sZW5ndGg7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgbWVyZ2UoYXJnc1swXSwgYXJnc1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3NbMF1cbiAgfVxuXG4gIE5vRnJhbWV3b3JrQWRhcHRlci5pbkFycmF5ID0gZnVuY3Rpb24oZWxlbWVudCwgYXJyYXksIGkpIHtcbiAgICByZXR1cm4gYXJyYXkgPT0gbnVsbCA/IC0xIDogYXJyYXkuaW5kZXhPZihlbGVtZW50LCBpKVxuICB9XG5cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLmlzRW1wdHlPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICAvKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IDAgKi9cbiAgICBmb3IgKHZhciBuYW1lIGluIG9iaikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBXYXlwb2ludC5hZGFwdGVycy5wdXNoKHtcbiAgICBuYW1lOiAnbm9mcmFtZXdvcmsnLFxuICAgIEFkYXB0ZXI6IE5vRnJhbWV3b3JrQWRhcHRlclxuICB9KVxuICBXYXlwb2ludC5BZGFwdGVyID0gTm9GcmFtZXdvcmtBZGFwdGVyXG59KCkpXG47IiwiaW1wb3J0IE1vYmlsZU1lbnUgZnJvbSAnLi9tb2R1bGVzL01vYmlsZU1lbnUnO1xyXG5pbXBvcnQgUmV2ZWFsT25TY3JvbGwgZnJvbSAnLi9tb2R1bGVzL1JldmVhbE9uU2Nyb2xsJztcclxuaW1wb3J0IFN0aWNreUhlYWRlciBmcm9tICcuL21vZHVsZXMvU3RpY2t5SGVhZGVyJztcclxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbm5ldyBSZXZlYWxPblNjcm9sbCgkKFwiLmxhcmdlLWhlYWRsaW5lXCIpLCBcIjkwJVwiKTtcclxubmV3IFJldmVhbE9uU2Nyb2xsKCQoXCIuc2VydmljZS1pdGVtXCIpLCBcIjg1JVwiKTtcclxubmV3IFJldmVhbE9uU2Nyb2xsKCQoXCIud3AtYmxvY2stcXVvdGVcIiksIFwiNzUlXCIpO1xyXG5uZXcgUmV2ZWFsT25TY3JvbGwoJChcIi5ob21lLWNvbnRhY3RcIiksIFwiNjAlXCIpO1xyXG5cclxuY29uc3QgbW9iaWxlTWVudSA9IG5ldyBNb2JpbGVNZW51KCk7XHJcbmNvbnN0IHN0aWNreUhlYWRlciA9IG5ldyBTdGlja3lIZWFkZXIoKTtcclxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmNsYXNzIE1vYmlsZU1lbnUge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHRoaXMubWVudUljb24gPSAkKFwiLnNpdGUtaGVhZGVyX19tZW51LWljb25cIik7XHJcbiAgICAgICAgdGhpcy5tZW51Q29udGVudCA9ICQoXCIubmF2LWhlYWRlclwiKTtcclxuICAgICAgICB0aGlzLmV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50cygpIHtcclxuICAgICAgICB0aGlzLm1lbnVJY29uLmNsaWNrKHRoaXMudG9nZ2xlTWVudUljb24pO1xyXG4gICAgICAgIHRoaXMubWVudUljb24uY2xpY2sodGhpcy50b2dnbGVUaGVNZW51LmJpbmQodGhpcykpOyAgXHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlVGhlTWVudSgpIHtcclxuICAgICAgICB0aGlzLm1lbnVDb250ZW50LnRvZ2dsZUNsYXNzKFwibmF2LWhlYWRlci0taXMtdmlzaWJsZVwiKTtcclxuICAgICAgICB0aGlzLm1lbnVJY29uLnRvZ2dsZUNsYXNzKFwic2l0ZS1oZWFkZXJfX21lbnUtaWNvbi0taXMtYWN0aXZlXCIpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTW9iaWxlTWVudTsiLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQgd2F5cG9pbnRzIGZyb20gJy4uLy4uLy4uL25vZGVfbW9kdWxlcy93YXlwb2ludHMvbGliL25vZnJhbWV3b3JrLndheXBvaW50cyc7XHJcblxyXG5jbGFzcyBSZXZlYWxPblNjcm9sbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbHMsIG9mZnNldCkge1xyXG4gICAgICAgIHRoaXMuaXRlbXNUb1JldmVhbCA9IGVscztcclxuICAgICAgICB0aGlzLm9mZnNldFBlcmNlbnRhZ2UgPSBvZmZzZXQ7XHJcbiAgICAgICAgdGhpcy5oaWRlSW5pdGlhbGx5KCk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVXYXlwb2ludHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlSW5pdGlhbGx5KCkge1xyXG4gICAgICAgIHRoaXMuaXRlbXNUb1JldmVhbC5hZGRDbGFzcyhcInJldmVhbC1pdGVtXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVdheXBvaW50cygpIHtcclxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5pdGVtc1RvUmV2ZWFsLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudEl0ZW0gPSB0aGlzO1xyXG4gICAgICAgICAgICBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudDogY3VycmVudEl0ZW0sIC8vZG9tIGVsZW1lbnQgd2Ugd2F0Y2hcclxuICAgICAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoY3VycmVudEl0ZW0pLmFkZENsYXNzKFwicmV2ZWFsLWl0ZW0tLWlzLXZpc2libGVcIilcclxuICAgICAgICAgICAgICAgIH0sIC8vd2hhdCB3ZSB3YW50IHRvIHJ1blxyXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiB0aGF0Lm9mZnNldFBlcmNlbnRhZ2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJldmVhbE9uU2Nyb2xsOyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCB3YXlwb2ludHMgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dheXBvaW50cy9saWIvbm9mcmFtZXdvcmsud2F5cG9pbnRzJztcclxuXHJcbmNsYXNzIFN0aWNreUhlYWRlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnNpdGVIZWFkZXIgPSAkKCcuc2l0ZS1oZWFkZXInKTtcclxuICAgICAgICB0aGlzLmhlYWRlclRyaWdlckVsZW1lbnQgPSAkKCcud3AtYmxvY2stY292ZXItdGV4dCcpO1xyXG4gICAgICAgIHRoaXMuY3JlYXRlSGVhZGVyV2F5cG9pbnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVIZWFkZXJXYXlwb2ludCgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcclxuICAgICAgICBuZXcgV2F5cG9pbnQoe1xyXG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLmhlYWRlclRyaWdlckVsZW1lbnRbMF0sXHJcbiAgICAgICAgICAgIGhhbmRsZXI6IGZ1bmN0aW9uKGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09IFwiZG93blwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zaXRlSGVhZGVyLmFkZENsYXNzKCdzaXRlLWhlYWRlci0tY29tcGFjdCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNpdGVIZWFkZXIucmVtb3ZlQ2xhc3MoJ3NpdGUtaGVhZGVyLS1jb21wYWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3RpY2t5SGVhZGVyOyIsIm1vZHVsZS5leHBvcnRzID0galF1ZXJ5OyJdLCJzb3VyY2VSb290IjoiIn0=