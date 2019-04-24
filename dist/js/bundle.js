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
new _modules_RevealOnScroll__WEBPACK_IMPORTED_MODULE_1__["default"](jquery__WEBPACK_IMPORTED_MODULE_3___default()(".slide-right"), "60%");
new _modules_RevealOnScroll__WEBPACK_IMPORTED_MODULE_1__["default"](jquery__WEBPACK_IMPORTED_MODULE_3___default()(".slide-left"), "60%");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dheXBvaW50cy9saWIvbm9mcmFtZXdvcmsud2F5cG9pbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9idW5kbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL21vZHVsZXMvTW9iaWxlTWVudS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9SZXZlYWxPblNjcm9sbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbW9kdWxlcy9TdGlja3lIZWFkZXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwialF1ZXJ5XCIiXSwibmFtZXMiOlsia2V5Q291bnRlciIsImFsbFdheXBvaW50cyIsIldheXBvaW50Iiwib3B0aW9ucyIsIkVycm9yIiwiZWxlbWVudCIsImhhbmRsZXIiLCJrZXkiLCJBZGFwdGVyIiwiZXh0ZW5kIiwiZGVmYXVsdHMiLCJhZGFwdGVyIiwiY2FsbGJhY2siLCJheGlzIiwiaG9yaXpvbnRhbCIsImVuYWJsZWQiLCJ0cmlnZ2VyUG9pbnQiLCJncm91cCIsIkdyb3VwIiwiZmluZE9yQ3JlYXRlIiwibmFtZSIsImNvbnRleHQiLCJDb250ZXh0IiwiZmluZE9yQ3JlYXRlQnlFbGVtZW50Iiwib2Zmc2V0QWxpYXNlcyIsIm9mZnNldCIsImFkZCIsInByb3RvdHlwZSIsInF1ZXVlVHJpZ2dlciIsImRpcmVjdGlvbiIsInRyaWdnZXIiLCJhcmdzIiwiYXBwbHkiLCJkZXN0cm95IiwicmVtb3ZlIiwiZGlzYWJsZSIsImVuYWJsZSIsInJlZnJlc2giLCJuZXh0IiwicHJldmlvdXMiLCJpbnZva2VBbGwiLCJtZXRob2QiLCJhbGxXYXlwb2ludHNBcnJheSIsIndheXBvaW50S2V5IiwicHVzaCIsImkiLCJlbmQiLCJsZW5ndGgiLCJkZXN0cm95QWxsIiwiZGlzYWJsZUFsbCIsImVuYWJsZUFsbCIsInJlZnJlc2hBbGwiLCJ2aWV3cG9ydEhlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRIZWlnaHQiLCJ2aWV3cG9ydFdpZHRoIiwiY2xpZW50V2lkdGgiLCJhZGFwdGVycyIsImNvbnRpbnVvdXMiLCJvdXRlckhlaWdodCIsImlubmVyV2lkdGgiLCJvdXRlcldpZHRoIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lU2hpbSIsInNldFRpbWVvdXQiLCJjb250ZXh0cyIsIm9sZFdpbmRvd0xvYWQiLCJvbmxvYWQiLCJkaWRTY3JvbGwiLCJkaWRSZXNpemUiLCJvbGRTY3JvbGwiLCJ4Iiwic2Nyb2xsTGVmdCIsInkiLCJzY3JvbGxUb3AiLCJ3YXlwb2ludHMiLCJ2ZXJ0aWNhbCIsIndheXBvaW50Q29udGV4dEtleSIsIndpbmRvd0NvbnRleHQiLCJjcmVhdGVUaHJvdHRsZWRTY3JvbGxIYW5kbGVyIiwiY3JlYXRlVGhyb3R0bGVkUmVzaXplSGFuZGxlciIsIndheXBvaW50IiwiY2hlY2tFbXB0eSIsImhvcml6b250YWxFbXB0eSIsImlzRW1wdHlPYmplY3QiLCJ2ZXJ0aWNhbEVtcHR5IiwiaXNXaW5kb3ciLCJvZmYiLCJzZWxmIiwicmVzaXplSGFuZGxlciIsImhhbmRsZVJlc2l6ZSIsIm9uIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2Nyb2xsSGFuZGxlciIsImhhbmRsZVNjcm9sbCIsImlzVG91Y2giLCJ0cmlnZ2VyZWRHcm91cHMiLCJheGVzIiwibmV3U2Nyb2xsIiwiZm9yd2FyZCIsImJhY2t3YXJkIiwiYXhpc0tleSIsImlzRm9yd2FyZCIsIndhc0JlZm9yZVRyaWdnZXJQb2ludCIsIm5vd0FmdGVyVHJpZ2dlclBvaW50IiwiY3Jvc3NlZEZvcndhcmQiLCJjcm9zc2VkQmFja3dhcmQiLCJpZCIsImdyb3VwS2V5IiwiZmx1c2hUcmlnZ2VycyIsImNvbnRleHRPZmZzZXQiLCJ1bmRlZmluZWQiLCJsZWZ0IiwiY29udGV4dFNjcm9sbCIsImNvbnRleHREaW1lbnNpb24iLCJvZmZzZXRQcm9wIiwidG9wIiwiYWRqdXN0bWVudCIsIm9sZFRyaWdnZXJQb2ludCIsImVsZW1lbnRPZmZzZXQiLCJmcmVzaFdheXBvaW50IiwiY29udGV4dE1vZGlmaWVyIiwid2FzQmVmb3JlU2Nyb2xsIiwibm93QWZ0ZXJTY3JvbGwiLCJ0cmlnZ2VyZWRCYWNrd2FyZCIsInRyaWdnZXJlZEZvcndhcmQiLCJwYXJzZUZsb2F0IiwiaW5kZXhPZiIsIk1hdGgiLCJjZWlsIiwiZmxvb3IiLCJmaW5kQnlFbGVtZW50IiwiY29udGV4dElkIiwicmVxdWVzdEZuIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FsbCIsImJ5VHJpZ2dlclBvaW50IiwiYSIsImIiLCJieVJldmVyc2VUcmlnZ2VyUG9pbnQiLCJncm91cHMiLCJjbGVhclRyaWdnZXJRdWV1ZXMiLCJ0cmlnZ2VyUXVldWVzIiwidXAiLCJkb3duIiwicmlnaHQiLCJyZXZlcnNlIiwic29ydCIsImluZGV4IiwiaW5BcnJheSIsImlzTGFzdCIsInNwbGljZSIsImZpcnN0IiwibGFzdCIsImdldFdpbmRvdyIsImRlZmF1bHRWaWV3IiwiTm9GcmFtZXdvcmtBZGFwdGVyIiwiaGFuZGxlcnMiLCJpc1dpbiIsImV2ZW50IiwicmVtb3ZlTGlzdGVuZXJzIiwibGlzdGVuZXJzIiwibGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZXZlbnRQYXJ0cyIsInNwbGl0IiwiZXZlbnRUeXBlIiwibmFtZXNwYWNlIiwibnMiLCJ0eXBlIiwib3duZXJEb2N1bWVudCIsIndpbiIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJwYWdlWU9mZnNldCIsImNsaWVudFRvcCIsInBhZ2VYT2Zmc2V0IiwiY2xpZW50TGVmdCIsIm5zSGFuZGxlcnMiLCJuc1R5cGVMaXN0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImluY2x1ZGVNYXJnaW4iLCJoZWlnaHQiLCJjb21wdXRlZFN0eWxlIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsInBhcnNlSW50IiwibWFyZ2luVG9wIiwibWFyZ2luQm90dG9tIiwid2lkdGgiLCJtYXJnaW5MZWZ0IiwibWFyZ2luUmlnaHQiLCJBcnJheSIsInNsaWNlIiwiYXJndW1lbnRzIiwibWVyZ2UiLCJ0YXJnZXQiLCJvYmoiLCJoYXNPd25Qcm9wZXJ0eSIsImFycmF5IiwiUmV2ZWFsT25TY3JvbGwiLCIkIiwibW9iaWxlTWVudSIsIk1vYmlsZU1lbnUiLCJzdGlja3lIZWFkZXIiLCJTdGlja3lIZWFkZXIiLCJtZW51SWNvbiIsIm1lbnVDb250ZW50IiwiZXZlbnRzIiwiY2xpY2siLCJ0b2dnbGVNZW51SWNvbiIsInRvZ2dsZVRoZU1lbnUiLCJiaW5kIiwidG9nZ2xlQ2xhc3MiLCJlbHMiLCJpdGVtc1RvUmV2ZWFsIiwib2Zmc2V0UGVyY2VudGFnZSIsImhpZGVJbml0aWFsbHkiLCJjcmVhdGVXYXlwb2ludHMiLCJhZGRDbGFzcyIsInRoYXQiLCJlYWNoIiwiY3VycmVudEl0ZW0iLCJzaXRlSGVhZGVyIiwiaGVhZGVyVHJpZ2VyRWxlbWVudCIsImNyZWF0ZUhlYWRlcldheXBvaW50IiwicmVtb3ZlQ2xhc3MiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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eUIsc0JBQXpCO0FBQ0gsV0FGRCxNQUVPO0FBQ0hDLGdCQUFJLENBQUNHLFVBQUwsQ0FBZ0JHLFdBQWhCLENBQTRCLHNCQUE1QjtBQUNIO0FBQ0o7QUFSUSxPQUFiO0FBVUg7Ozs7OztBQUdVckIsMkVBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6QkEsd0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuIiwiLyohXG5XYXlwb2ludHMgLSA0LjAuMVxuQ29weXJpZ2h0IMKpIDIwMTEtMjAxNiBDYWxlYiBUcm91Z2h0b25cbkxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbmh0dHBzOi8vZ2l0aHViLmNvbS9pbWFrZXdlYnRoaW5ncy93YXlwb2ludHMvYmxvYi9tYXN0ZXIvbGljZW5zZXMudHh0XG4qL1xuKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCdcblxuICB2YXIga2V5Q291bnRlciA9IDBcbiAgdmFyIGFsbFdheXBvaW50cyA9IHt9XG5cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL3dheXBvaW50ICovXG4gIGZ1bmN0aW9uIFdheXBvaW50KG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gb3B0aW9ucyBwYXNzZWQgdG8gV2F5cG9pbnQgY29uc3RydWN0b3InKVxuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuZWxlbWVudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBlbGVtZW50IG9wdGlvbiBwYXNzZWQgdG8gV2F5cG9pbnQgY29uc3RydWN0b3InKVxuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuaGFuZGxlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBoYW5kbGVyIG9wdGlvbiBwYXNzZWQgdG8gV2F5cG9pbnQgY29uc3RydWN0b3InKVxuICAgIH1cblxuICAgIHRoaXMua2V5ID0gJ3dheXBvaW50LScgKyBrZXlDb3VudGVyXG4gICAgdGhpcy5vcHRpb25zID0gV2F5cG9pbnQuQWRhcHRlci5leHRlbmQoe30sIFdheXBvaW50LmRlZmF1bHRzLCBvcHRpb25zKVxuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMub3B0aW9ucy5lbGVtZW50XG4gICAgdGhpcy5hZGFwdGVyID0gbmV3IFdheXBvaW50LkFkYXB0ZXIodGhpcy5lbGVtZW50KVxuICAgIHRoaXMuY2FsbGJhY2sgPSBvcHRpb25zLmhhbmRsZXJcbiAgICB0aGlzLmF4aXMgPSB0aGlzLm9wdGlvbnMuaG9yaXpvbnRhbCA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCdcbiAgICB0aGlzLmVuYWJsZWQgPSB0aGlzLm9wdGlvbnMuZW5hYmxlZFxuICAgIHRoaXMudHJpZ2dlclBvaW50ID0gbnVsbFxuICAgIHRoaXMuZ3JvdXAgPSBXYXlwb2ludC5Hcm91cC5maW5kT3JDcmVhdGUoe1xuICAgICAgbmFtZTogdGhpcy5vcHRpb25zLmdyb3VwLFxuICAgICAgYXhpczogdGhpcy5heGlzXG4gICAgfSlcbiAgICB0aGlzLmNvbnRleHQgPSBXYXlwb2ludC5Db250ZXh0LmZpbmRPckNyZWF0ZUJ5RWxlbWVudCh0aGlzLm9wdGlvbnMuY29udGV4dClcblxuICAgIGlmIChXYXlwb2ludC5vZmZzZXRBbGlhc2VzW3RoaXMub3B0aW9ucy5vZmZzZXRdKSB7XG4gICAgICB0aGlzLm9wdGlvbnMub2Zmc2V0ID0gV2F5cG9pbnQub2Zmc2V0QWxpYXNlc1t0aGlzLm9wdGlvbnMub2Zmc2V0XVxuICAgIH1cbiAgICB0aGlzLmdyb3VwLmFkZCh0aGlzKVxuICAgIHRoaXMuY29udGV4dC5hZGQodGhpcylcbiAgICBhbGxXYXlwb2ludHNbdGhpcy5rZXldID0gdGhpc1xuICAgIGtleUNvdW50ZXIgKz0gMVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBXYXlwb2ludC5wcm90b3R5cGUucXVldWVUcmlnZ2VyID0gZnVuY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5ncm91cC5xdWV1ZVRyaWdnZXIodGhpcywgZGlyZWN0aW9uKVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBXYXlwb2ludC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICBpZiAoIXRoaXMuZW5hYmxlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmICh0aGlzLmNhbGxiYWNrKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpXG4gICAgfVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9kZXN0cm95ICovXG4gIFdheXBvaW50LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb250ZXh0LnJlbW92ZSh0aGlzKVxuICAgIHRoaXMuZ3JvdXAucmVtb3ZlKHRoaXMpXG4gICAgZGVsZXRlIGFsbFdheXBvaW50c1t0aGlzLmtleV1cbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvZGlzYWJsZSAqL1xuICBXYXlwb2ludC5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZW5hYmxlZCA9IGZhbHNlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvZW5hYmxlICovXG4gIFdheXBvaW50LnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvbnRleHQucmVmcmVzaCgpXG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL25leHQgKi9cbiAgV2F5cG9pbnQucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5ncm91cC5uZXh0KHRoaXMpXG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL3ByZXZpb3VzICovXG4gIFdheXBvaW50LnByb3RvdHlwZS5wcmV2aW91cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdyb3VwLnByZXZpb3VzKHRoaXMpXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIFdheXBvaW50Lmludm9rZUFsbCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIHZhciBhbGxXYXlwb2ludHNBcnJheSA9IFtdXG4gICAgZm9yICh2YXIgd2F5cG9pbnRLZXkgaW4gYWxsV2F5cG9pbnRzKSB7XG4gICAgICBhbGxXYXlwb2ludHNBcnJheS5wdXNoKGFsbFdheXBvaW50c1t3YXlwb2ludEtleV0pXG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBlbmQgPSBhbGxXYXlwb2ludHNBcnJheS5sZW5ndGg7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgYWxsV2F5cG9pbnRzQXJyYXlbaV1bbWV0aG9kXSgpXG4gICAgfVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9kZXN0cm95LWFsbCAqL1xuICBXYXlwb2ludC5kZXN0cm95QWxsID0gZnVuY3Rpb24oKSB7XG4gICAgV2F5cG9pbnQuaW52b2tlQWxsKCdkZXN0cm95JylcbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvZGlzYWJsZS1hbGwgKi9cbiAgV2F5cG9pbnQuZGlzYWJsZUFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIFdheXBvaW50Lmludm9rZUFsbCgnZGlzYWJsZScpXG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2VuYWJsZS1hbGwgKi9cbiAgV2F5cG9pbnQuZW5hYmxlQWxsID0gZnVuY3Rpb24oKSB7XG4gICAgV2F5cG9pbnQuQ29udGV4dC5yZWZyZXNoQWxsKClcbiAgICBmb3IgKHZhciB3YXlwb2ludEtleSBpbiBhbGxXYXlwb2ludHMpIHtcbiAgICAgIGFsbFdheXBvaW50c1t3YXlwb2ludEtleV0uZW5hYmxlZCA9IHRydWVcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvcmVmcmVzaC1hbGwgKi9cbiAgV2F5cG9pbnQucmVmcmVzaEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIFdheXBvaW50LkNvbnRleHQucmVmcmVzaEFsbCgpXG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL3ZpZXdwb3J0LWhlaWdodCAqL1xuICBXYXlwb2ludC52aWV3cG9ydEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS92aWV3cG9ydC13aWR0aCAqL1xuICBXYXlwb2ludC52aWV3cG9ydFdpZHRoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxuICB9XG5cbiAgV2F5cG9pbnQuYWRhcHRlcnMgPSBbXVxuXG4gIFdheXBvaW50LmRlZmF1bHRzID0ge1xuICAgIGNvbnRleHQ6IHdpbmRvdyxcbiAgICBjb250aW51b3VzOiB0cnVlLFxuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgZ3JvdXA6ICdkZWZhdWx0JyxcbiAgICBob3Jpem9udGFsOiBmYWxzZSxcbiAgICBvZmZzZXQ6IDBcbiAgfVxuXG4gIFdheXBvaW50Lm9mZnNldEFsaWFzZXMgPSB7XG4gICAgJ2JvdHRvbS1pbi12aWV3JzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb250ZXh0LmlubmVySGVpZ2h0KCkgLSB0aGlzLmFkYXB0ZXIub3V0ZXJIZWlnaHQoKVxuICAgIH0sXG4gICAgJ3JpZ2h0LWluLXZpZXcnOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRleHQuaW5uZXJXaWR0aCgpIC0gdGhpcy5hZGFwdGVyLm91dGVyV2lkdGgoKVxuICAgIH1cbiAgfVxuXG4gIHdpbmRvdy5XYXlwb2ludCA9IFdheXBvaW50XG59KCkpXG47KGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCdcblxuICBmdW5jdGlvbiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVTaGltKGNhbGxiYWNrKSB7XG4gICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MClcbiAgfVxuXG4gIHZhciBrZXlDb3VudGVyID0gMFxuICB2YXIgY29udGV4dHMgPSB7fVxuICB2YXIgV2F5cG9pbnQgPSB3aW5kb3cuV2F5cG9pbnRcbiAgdmFyIG9sZFdpbmRvd0xvYWQgPSB3aW5kb3cub25sb2FkXG5cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2NvbnRleHQgKi9cbiAgZnVuY3Rpb24gQ29udGV4dChlbGVtZW50KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxuICAgIHRoaXMuQWRhcHRlciA9IFdheXBvaW50LkFkYXB0ZXJcbiAgICB0aGlzLmFkYXB0ZXIgPSBuZXcgdGhpcy5BZGFwdGVyKGVsZW1lbnQpXG4gICAgdGhpcy5rZXkgPSAnd2F5cG9pbnQtY29udGV4dC0nICsga2V5Q291bnRlclxuICAgIHRoaXMuZGlkU2Nyb2xsID0gZmFsc2VcbiAgICB0aGlzLmRpZFJlc2l6ZSA9IGZhbHNlXG4gICAgdGhpcy5vbGRTY3JvbGwgPSB7XG4gICAgICB4OiB0aGlzLmFkYXB0ZXIuc2Nyb2xsTGVmdCgpLFxuICAgICAgeTogdGhpcy5hZGFwdGVyLnNjcm9sbFRvcCgpXG4gICAgfVxuICAgIHRoaXMud2F5cG9pbnRzID0ge1xuICAgICAgdmVydGljYWw6IHt9LFxuICAgICAgaG9yaXpvbnRhbDoge31cbiAgICB9XG5cbiAgICBlbGVtZW50LndheXBvaW50Q29udGV4dEtleSA9IHRoaXMua2V5XG4gICAgY29udGV4dHNbZWxlbWVudC53YXlwb2ludENvbnRleHRLZXldID0gdGhpc1xuICAgIGtleUNvdW50ZXIgKz0gMVxuICAgIGlmICghV2F5cG9pbnQud2luZG93Q29udGV4dCkge1xuICAgICAgV2F5cG9pbnQud2luZG93Q29udGV4dCA9IHRydWVcbiAgICAgIFdheXBvaW50LndpbmRvd0NvbnRleHQgPSBuZXcgQ29udGV4dCh3aW5kb3cpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVhdGVUaHJvdHRsZWRTY3JvbGxIYW5kbGVyKClcbiAgICB0aGlzLmNyZWF0ZVRocm90dGxlZFJlc2l6ZUhhbmRsZXIoKVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbih3YXlwb2ludCkge1xuICAgIHZhciBheGlzID0gd2F5cG9pbnQub3B0aW9ucy5ob3Jpem9udGFsID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJ1xuICAgIHRoaXMud2F5cG9pbnRzW2F4aXNdW3dheXBvaW50LmtleV0gPSB3YXlwb2ludFxuICAgIHRoaXMucmVmcmVzaCgpXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQucHJvdG90eXBlLmNoZWNrRW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaG9yaXpvbnRhbEVtcHR5ID0gdGhpcy5BZGFwdGVyLmlzRW1wdHlPYmplY3QodGhpcy53YXlwb2ludHMuaG9yaXpvbnRhbClcbiAgICB2YXIgdmVydGljYWxFbXB0eSA9IHRoaXMuQWRhcHRlci5pc0VtcHR5T2JqZWN0KHRoaXMud2F5cG9pbnRzLnZlcnRpY2FsKVxuICAgIHZhciBpc1dpbmRvdyA9IHRoaXMuZWxlbWVudCA9PSB0aGlzLmVsZW1lbnQud2luZG93XG4gICAgaWYgKGhvcml6b250YWxFbXB0eSAmJiB2ZXJ0aWNhbEVtcHR5ICYmICFpc1dpbmRvdykge1xuICAgICAgdGhpcy5hZGFwdGVyLm9mZignLndheXBvaW50cycpXG4gICAgICBkZWxldGUgY29udGV4dHNbdGhpcy5rZXldXG4gICAgfVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5jcmVhdGVUaHJvdHRsZWRSZXNpemVIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG5cbiAgICBmdW5jdGlvbiByZXNpemVIYW5kbGVyKCkge1xuICAgICAgc2VsZi5oYW5kbGVSZXNpemUoKVxuICAgICAgc2VsZi5kaWRSZXNpemUgPSBmYWxzZVxuICAgIH1cblxuICAgIHRoaXMuYWRhcHRlci5vbigncmVzaXplLndheXBvaW50cycsIGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCFzZWxmLmRpZFJlc2l6ZSkge1xuICAgICAgICBzZWxmLmRpZFJlc2l6ZSA9IHRydWVcbiAgICAgICAgV2F5cG9pbnQucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlc2l6ZUhhbmRsZXIpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUuY3JlYXRlVGhyb3R0bGVkU2Nyb2xsSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIGZ1bmN0aW9uIHNjcm9sbEhhbmRsZXIoKSB7XG4gICAgICBzZWxmLmhhbmRsZVNjcm9sbCgpXG4gICAgICBzZWxmLmRpZFNjcm9sbCA9IGZhbHNlXG4gICAgfVxuXG4gICAgdGhpcy5hZGFwdGVyLm9uKCdzY3JvbGwud2F5cG9pbnRzJywgZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIXNlbGYuZGlkU2Nyb2xsIHx8IFdheXBvaW50LmlzVG91Y2gpIHtcbiAgICAgICAgc2VsZi5kaWRTY3JvbGwgPSB0cnVlXG4gICAgICAgIFdheXBvaW50LnJlcXVlc3RBbmltYXRpb25GcmFtZShzY3JvbGxIYW5kbGVyKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQucHJvdG90eXBlLmhhbmRsZVJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIFdheXBvaW50LkNvbnRleHQucmVmcmVzaEFsbCgpXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQucHJvdG90eXBlLmhhbmRsZVNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0cmlnZ2VyZWRHcm91cHMgPSB7fVxuICAgIHZhciBheGVzID0ge1xuICAgICAgaG9yaXpvbnRhbDoge1xuICAgICAgICBuZXdTY3JvbGw6IHRoaXMuYWRhcHRlci5zY3JvbGxMZWZ0KCksXG4gICAgICAgIG9sZFNjcm9sbDogdGhpcy5vbGRTY3JvbGwueCxcbiAgICAgICAgZm9yd2FyZDogJ3JpZ2h0JyxcbiAgICAgICAgYmFja3dhcmQ6ICdsZWZ0J1xuICAgICAgfSxcbiAgICAgIHZlcnRpY2FsOiB7XG4gICAgICAgIG5ld1Njcm9sbDogdGhpcy5hZGFwdGVyLnNjcm9sbFRvcCgpLFxuICAgICAgICBvbGRTY3JvbGw6IHRoaXMub2xkU2Nyb2xsLnksXG4gICAgICAgIGZvcndhcmQ6ICdkb3duJyxcbiAgICAgICAgYmFja3dhcmQ6ICd1cCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBheGlzS2V5IGluIGF4ZXMpIHtcbiAgICAgIHZhciBheGlzID0gYXhlc1theGlzS2V5XVxuICAgICAgdmFyIGlzRm9yd2FyZCA9IGF4aXMubmV3U2Nyb2xsID4gYXhpcy5vbGRTY3JvbGxcbiAgICAgIHZhciBkaXJlY3Rpb24gPSBpc0ZvcndhcmQgPyBheGlzLmZvcndhcmQgOiBheGlzLmJhY2t3YXJkXG5cbiAgICAgIGZvciAodmFyIHdheXBvaW50S2V5IGluIHRoaXMud2F5cG9pbnRzW2F4aXNLZXldKSB7XG4gICAgICAgIHZhciB3YXlwb2ludCA9IHRoaXMud2F5cG9pbnRzW2F4aXNLZXldW3dheXBvaW50S2V5XVxuICAgICAgICBpZiAod2F5cG9pbnQudHJpZ2dlclBvaW50ID09PSBudWxsKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2FzQmVmb3JlVHJpZ2dlclBvaW50ID0gYXhpcy5vbGRTY3JvbGwgPCB3YXlwb2ludC50cmlnZ2VyUG9pbnRcbiAgICAgICAgdmFyIG5vd0FmdGVyVHJpZ2dlclBvaW50ID0gYXhpcy5uZXdTY3JvbGwgPj0gd2F5cG9pbnQudHJpZ2dlclBvaW50XG4gICAgICAgIHZhciBjcm9zc2VkRm9yd2FyZCA9IHdhc0JlZm9yZVRyaWdnZXJQb2ludCAmJiBub3dBZnRlclRyaWdnZXJQb2ludFxuICAgICAgICB2YXIgY3Jvc3NlZEJhY2t3YXJkID0gIXdhc0JlZm9yZVRyaWdnZXJQb2ludCAmJiAhbm93QWZ0ZXJUcmlnZ2VyUG9pbnRcbiAgICAgICAgaWYgKGNyb3NzZWRGb3J3YXJkIHx8IGNyb3NzZWRCYWNrd2FyZCkge1xuICAgICAgICAgIHdheXBvaW50LnF1ZXVlVHJpZ2dlcihkaXJlY3Rpb24pXG4gICAgICAgICAgdHJpZ2dlcmVkR3JvdXBzW3dheXBvaW50Lmdyb3VwLmlkXSA9IHdheXBvaW50Lmdyb3VwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBncm91cEtleSBpbiB0cmlnZ2VyZWRHcm91cHMpIHtcbiAgICAgIHRyaWdnZXJlZEdyb3Vwc1tncm91cEtleV0uZmx1c2hUcmlnZ2VycygpXG4gICAgfVxuXG4gICAgdGhpcy5vbGRTY3JvbGwgPSB7XG4gICAgICB4OiBheGVzLmhvcml6b250YWwubmV3U2Nyb2xsLFxuICAgICAgeTogYXhlcy52ZXJ0aWNhbC5uZXdTY3JvbGxcbiAgICB9XG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQucHJvdG90eXBlLmlubmVySGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgLyplc2xpbnQtZGlzYWJsZSBlcWVxZXEgKi9cbiAgICBpZiAodGhpcy5lbGVtZW50ID09IHRoaXMuZWxlbWVudC53aW5kb3cpIHtcbiAgICAgIHJldHVybiBXYXlwb2ludC52aWV3cG9ydEhlaWdodCgpXG4gICAgfVxuICAgIC8qZXNsaW50LWVuYWJsZSBlcWVxZXEgKi9cbiAgICByZXR1cm4gdGhpcy5hZGFwdGVyLmlubmVySGVpZ2h0KClcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24od2F5cG9pbnQpIHtcbiAgICBkZWxldGUgdGhpcy53YXlwb2ludHNbd2F5cG9pbnQuYXhpc11bd2F5cG9pbnQua2V5XVxuICAgIHRoaXMuY2hlY2tFbXB0eSgpXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIENvbnRleHQucHJvdG90eXBlLmlubmVyV2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICAvKmVzbGludC1kaXNhYmxlIGVxZXFlcSAqL1xuICAgIGlmICh0aGlzLmVsZW1lbnQgPT0gdGhpcy5lbGVtZW50LndpbmRvdykge1xuICAgICAgcmV0dXJuIFdheXBvaW50LnZpZXdwb3J0V2lkdGgoKVxuICAgIH1cbiAgICAvKmVzbGludC1lbmFibGUgZXFlcWVxICovXG4gICAgcmV0dXJuIHRoaXMuYWRhcHRlci5pbm5lcldpZHRoKClcbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvY29udGV4dC1kZXN0cm95ICovXG4gIENvbnRleHQucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYWxsV2F5cG9pbnRzID0gW11cbiAgICBmb3IgKHZhciBheGlzIGluIHRoaXMud2F5cG9pbnRzKSB7XG4gICAgICBmb3IgKHZhciB3YXlwb2ludEtleSBpbiB0aGlzLndheXBvaW50c1theGlzXSkge1xuICAgICAgICBhbGxXYXlwb2ludHMucHVzaCh0aGlzLndheXBvaW50c1theGlzXVt3YXlwb2ludEtleV0pXG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBlbmQgPSBhbGxXYXlwb2ludHMubGVuZ3RoOyBpIDwgZW5kOyBpKyspIHtcbiAgICAgIGFsbFdheXBvaW50c1tpXS5kZXN0cm95KClcbiAgICB9XG4gIH1cblxuICAvKiBQdWJsaWMgKi9cbiAgLyogaHR0cDovL2ltYWtld2VidGhpbmdzLmNvbS93YXlwb2ludHMvYXBpL2NvbnRleHQtcmVmcmVzaCAqL1xuICBDb250ZXh0LnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24oKSB7XG4gICAgLyplc2xpbnQtZGlzYWJsZSBlcWVxZXEgKi9cbiAgICB2YXIgaXNXaW5kb3cgPSB0aGlzLmVsZW1lbnQgPT0gdGhpcy5lbGVtZW50LndpbmRvd1xuICAgIC8qZXNsaW50LWVuYWJsZSBlcWVxZXEgKi9cbiAgICB2YXIgY29udGV4dE9mZnNldCA9IGlzV2luZG93ID8gdW5kZWZpbmVkIDogdGhpcy5hZGFwdGVyLm9mZnNldCgpXG4gICAgdmFyIHRyaWdnZXJlZEdyb3VwcyA9IHt9XG4gICAgdmFyIGF4ZXNcblxuICAgIHRoaXMuaGFuZGxlU2Nyb2xsKClcbiAgICBheGVzID0ge1xuICAgICAgaG9yaXpvbnRhbDoge1xuICAgICAgICBjb250ZXh0T2Zmc2V0OiBpc1dpbmRvdyA/IDAgOiBjb250ZXh0T2Zmc2V0LmxlZnQsXG4gICAgICAgIGNvbnRleHRTY3JvbGw6IGlzV2luZG93ID8gMCA6IHRoaXMub2xkU2Nyb2xsLngsXG4gICAgICAgIGNvbnRleHREaW1lbnNpb246IHRoaXMuaW5uZXJXaWR0aCgpLFxuICAgICAgICBvbGRTY3JvbGw6IHRoaXMub2xkU2Nyb2xsLngsXG4gICAgICAgIGZvcndhcmQ6ICdyaWdodCcsXG4gICAgICAgIGJhY2t3YXJkOiAnbGVmdCcsXG4gICAgICAgIG9mZnNldFByb3A6ICdsZWZ0J1xuICAgICAgfSxcbiAgICAgIHZlcnRpY2FsOiB7XG4gICAgICAgIGNvbnRleHRPZmZzZXQ6IGlzV2luZG93ID8gMCA6IGNvbnRleHRPZmZzZXQudG9wLFxuICAgICAgICBjb250ZXh0U2Nyb2xsOiBpc1dpbmRvdyA/IDAgOiB0aGlzLm9sZFNjcm9sbC55LFxuICAgICAgICBjb250ZXh0RGltZW5zaW9uOiB0aGlzLmlubmVySGVpZ2h0KCksXG4gICAgICAgIG9sZFNjcm9sbDogdGhpcy5vbGRTY3JvbGwueSxcbiAgICAgICAgZm9yd2FyZDogJ2Rvd24nLFxuICAgICAgICBiYWNrd2FyZDogJ3VwJyxcbiAgICAgICAgb2Zmc2V0UHJvcDogJ3RvcCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBheGlzS2V5IGluIGF4ZXMpIHtcbiAgICAgIHZhciBheGlzID0gYXhlc1theGlzS2V5XVxuICAgICAgZm9yICh2YXIgd2F5cG9pbnRLZXkgaW4gdGhpcy53YXlwb2ludHNbYXhpc0tleV0pIHtcbiAgICAgICAgdmFyIHdheXBvaW50ID0gdGhpcy53YXlwb2ludHNbYXhpc0tleV1bd2F5cG9pbnRLZXldXG4gICAgICAgIHZhciBhZGp1c3RtZW50ID0gd2F5cG9pbnQub3B0aW9ucy5vZmZzZXRcbiAgICAgICAgdmFyIG9sZFRyaWdnZXJQb2ludCA9IHdheXBvaW50LnRyaWdnZXJQb2ludFxuICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IDBcbiAgICAgICAgdmFyIGZyZXNoV2F5cG9pbnQgPSBvbGRUcmlnZ2VyUG9pbnQgPT0gbnVsbFxuICAgICAgICB2YXIgY29udGV4dE1vZGlmaWVyLCB3YXNCZWZvcmVTY3JvbGwsIG5vd0FmdGVyU2Nyb2xsXG4gICAgICAgIHZhciB0cmlnZ2VyZWRCYWNrd2FyZCwgdHJpZ2dlcmVkRm9yd2FyZFxuXG4gICAgICAgIGlmICh3YXlwb2ludC5lbGVtZW50ICE9PSB3YXlwb2ludC5lbGVtZW50LndpbmRvdykge1xuICAgICAgICAgIGVsZW1lbnRPZmZzZXQgPSB3YXlwb2ludC5hZGFwdGVyLm9mZnNldCgpW2F4aXMub2Zmc2V0UHJvcF1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgYWRqdXN0bWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGFkanVzdG1lbnQgPSBhZGp1c3RtZW50LmFwcGx5KHdheXBvaW50KVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBhZGp1c3RtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGFkanVzdG1lbnQgPSBwYXJzZUZsb2F0KGFkanVzdG1lbnQpXG4gICAgICAgICAgaWYgKHdheXBvaW50Lm9wdGlvbnMub2Zmc2V0LmluZGV4T2YoJyUnKSA+IC0gMSkge1xuICAgICAgICAgICAgYWRqdXN0bWVudCA9IE1hdGguY2VpbChheGlzLmNvbnRleHREaW1lbnNpb24gKiBhZGp1c3RtZW50IC8gMTAwKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHRNb2RpZmllciA9IGF4aXMuY29udGV4dFNjcm9sbCAtIGF4aXMuY29udGV4dE9mZnNldFxuICAgICAgICB3YXlwb2ludC50cmlnZ2VyUG9pbnQgPSBNYXRoLmZsb29yKGVsZW1lbnRPZmZzZXQgKyBjb250ZXh0TW9kaWZpZXIgLSBhZGp1c3RtZW50KVxuICAgICAgICB3YXNCZWZvcmVTY3JvbGwgPSBvbGRUcmlnZ2VyUG9pbnQgPCBheGlzLm9sZFNjcm9sbFxuICAgICAgICBub3dBZnRlclNjcm9sbCA9IHdheXBvaW50LnRyaWdnZXJQb2ludCA+PSBheGlzLm9sZFNjcm9sbFxuICAgICAgICB0cmlnZ2VyZWRCYWNrd2FyZCA9IHdhc0JlZm9yZVNjcm9sbCAmJiBub3dBZnRlclNjcm9sbFxuICAgICAgICB0cmlnZ2VyZWRGb3J3YXJkID0gIXdhc0JlZm9yZVNjcm9sbCAmJiAhbm93QWZ0ZXJTY3JvbGxcblxuICAgICAgICBpZiAoIWZyZXNoV2F5cG9pbnQgJiYgdHJpZ2dlcmVkQmFja3dhcmQpIHtcbiAgICAgICAgICB3YXlwb2ludC5xdWV1ZVRyaWdnZXIoYXhpcy5iYWNrd2FyZClcbiAgICAgICAgICB0cmlnZ2VyZWRHcm91cHNbd2F5cG9pbnQuZ3JvdXAuaWRdID0gd2F5cG9pbnQuZ3JvdXBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghZnJlc2hXYXlwb2ludCAmJiB0cmlnZ2VyZWRGb3J3YXJkKSB7XG4gICAgICAgICAgd2F5cG9pbnQucXVldWVUcmlnZ2VyKGF4aXMuZm9yd2FyZClcbiAgICAgICAgICB0cmlnZ2VyZWRHcm91cHNbd2F5cG9pbnQuZ3JvdXAuaWRdID0gd2F5cG9pbnQuZ3JvdXBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmcmVzaFdheXBvaW50ICYmIGF4aXMub2xkU2Nyb2xsID49IHdheXBvaW50LnRyaWdnZXJQb2ludCkge1xuICAgICAgICAgIHdheXBvaW50LnF1ZXVlVHJpZ2dlcihheGlzLmZvcndhcmQpXG4gICAgICAgICAgdHJpZ2dlcmVkR3JvdXBzW3dheXBvaW50Lmdyb3VwLmlkXSA9IHdheXBvaW50Lmdyb3VwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBXYXlwb2ludC5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBncm91cEtleSBpbiB0cmlnZ2VyZWRHcm91cHMpIHtcbiAgICAgICAgdHJpZ2dlcmVkR3JvdXBzW2dyb3VwS2V5XS5mbHVzaFRyaWdnZXJzKClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgQ29udGV4dC5maW5kT3JDcmVhdGVCeUVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgcmV0dXJuIENvbnRleHQuZmluZEJ5RWxlbWVudChlbGVtZW50KSB8fCBuZXcgQ29udGV4dChlbGVtZW50KVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBDb250ZXh0LnJlZnJlc2hBbGwgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBjb250ZXh0SWQgaW4gY29udGV4dHMpIHtcbiAgICAgIGNvbnRleHRzW2NvbnRleHRJZF0ucmVmcmVzaCgpXG4gICAgfVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9jb250ZXh0LWZpbmQtYnktZWxlbWVudCAqL1xuICBDb250ZXh0LmZpbmRCeUVsZW1lbnQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgcmV0dXJuIGNvbnRleHRzW2VsZW1lbnQud2F5cG9pbnRDb250ZXh0S2V5XVxuICB9XG5cbiAgd2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChvbGRXaW5kb3dMb2FkKSB7XG4gICAgICBvbGRXaW5kb3dMb2FkKClcbiAgICB9XG4gICAgQ29udGV4dC5yZWZyZXNoQWxsKClcbiAgfVxuXG5cbiAgV2F5cG9pbnQucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICB2YXIgcmVxdWVzdEZuID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lU2hpbVxuICAgIHJlcXVlc3RGbi5jYWxsKHdpbmRvdywgY2FsbGJhY2spXG4gIH1cbiAgV2F5cG9pbnQuQ29udGV4dCA9IENvbnRleHRcbn0oKSlcbjsoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGZ1bmN0aW9uIGJ5VHJpZ2dlclBvaW50KGEsIGIpIHtcbiAgICByZXR1cm4gYS50cmlnZ2VyUG9pbnQgLSBiLnRyaWdnZXJQb2ludFxuICB9XG5cbiAgZnVuY3Rpb24gYnlSZXZlcnNlVHJpZ2dlclBvaW50KGEsIGIpIHtcbiAgICByZXR1cm4gYi50cmlnZ2VyUG9pbnQgLSBhLnRyaWdnZXJQb2ludFxuICB9XG5cbiAgdmFyIGdyb3VwcyA9IHtcbiAgICB2ZXJ0aWNhbDoge30sXG4gICAgaG9yaXpvbnRhbDoge31cbiAgfVxuICB2YXIgV2F5cG9pbnQgPSB3aW5kb3cuV2F5cG9pbnRcblxuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvZ3JvdXAgKi9cbiAgZnVuY3Rpb24gR3JvdXAob3B0aW9ucykge1xuICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZVxuICAgIHRoaXMuYXhpcyA9IG9wdGlvbnMuYXhpc1xuICAgIHRoaXMuaWQgPSB0aGlzLm5hbWUgKyAnLScgKyB0aGlzLmF4aXNcbiAgICB0aGlzLndheXBvaW50cyA9IFtdXG4gICAgdGhpcy5jbGVhclRyaWdnZXJRdWV1ZXMoKVxuICAgIGdyb3Vwc1t0aGlzLmF4aXNdW3RoaXMubmFtZV0gPSB0aGlzXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIEdyb3VwLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbih3YXlwb2ludCkge1xuICAgIHRoaXMud2F5cG9pbnRzLnB1c2god2F5cG9pbnQpXG4gIH1cblxuICAvKiBQcml2YXRlICovXG4gIEdyb3VwLnByb3RvdHlwZS5jbGVhclRyaWdnZXJRdWV1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRyaWdnZXJRdWV1ZXMgPSB7XG4gICAgICB1cDogW10sXG4gICAgICBkb3duOiBbXSxcbiAgICAgIGxlZnQ6IFtdLFxuICAgICAgcmlnaHQ6IFtdXG4gICAgfVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBHcm91cC5wcm90b3R5cGUuZmx1c2hUcmlnZ2VycyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGRpcmVjdGlvbiBpbiB0aGlzLnRyaWdnZXJRdWV1ZXMpIHtcbiAgICAgIHZhciB3YXlwb2ludHMgPSB0aGlzLnRyaWdnZXJRdWV1ZXNbZGlyZWN0aW9uXVxuICAgICAgdmFyIHJldmVyc2UgPSBkaXJlY3Rpb24gPT09ICd1cCcgfHwgZGlyZWN0aW9uID09PSAnbGVmdCdcbiAgICAgIHdheXBvaW50cy5zb3J0KHJldmVyc2UgPyBieVJldmVyc2VUcmlnZ2VyUG9pbnQgOiBieVRyaWdnZXJQb2ludClcbiAgICAgIGZvciAodmFyIGkgPSAwLCBlbmQgPSB3YXlwb2ludHMubGVuZ3RoOyBpIDwgZW5kOyBpICs9IDEpIHtcbiAgICAgICAgdmFyIHdheXBvaW50ID0gd2F5cG9pbnRzW2ldXG4gICAgICAgIGlmICh3YXlwb2ludC5vcHRpb25zLmNvbnRpbnVvdXMgfHwgaSA9PT0gd2F5cG9pbnRzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICB3YXlwb2ludC50cmlnZ2VyKFtkaXJlY3Rpb25dKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuY2xlYXJUcmlnZ2VyUXVldWVzKClcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgR3JvdXAucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbih3YXlwb2ludCkge1xuICAgIHRoaXMud2F5cG9pbnRzLnNvcnQoYnlUcmlnZ2VyUG9pbnQpXG4gICAgdmFyIGluZGV4ID0gV2F5cG9pbnQuQWRhcHRlci5pbkFycmF5KHdheXBvaW50LCB0aGlzLndheXBvaW50cylcbiAgICB2YXIgaXNMYXN0ID0gaW5kZXggPT09IHRoaXMud2F5cG9pbnRzLmxlbmd0aCAtIDFcbiAgICByZXR1cm4gaXNMYXN0ID8gbnVsbCA6IHRoaXMud2F5cG9pbnRzW2luZGV4ICsgMV1cbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgR3JvdXAucHJvdG90eXBlLnByZXZpb3VzID0gZnVuY3Rpb24od2F5cG9pbnQpIHtcbiAgICB0aGlzLndheXBvaW50cy5zb3J0KGJ5VHJpZ2dlclBvaW50KVxuICAgIHZhciBpbmRleCA9IFdheXBvaW50LkFkYXB0ZXIuaW5BcnJheSh3YXlwb2ludCwgdGhpcy53YXlwb2ludHMpXG4gICAgcmV0dXJuIGluZGV4ID8gdGhpcy53YXlwb2ludHNbaW5kZXggLSAxXSA6IG51bGxcbiAgfVxuXG4gIC8qIFByaXZhdGUgKi9cbiAgR3JvdXAucHJvdG90eXBlLnF1ZXVlVHJpZ2dlciA9IGZ1bmN0aW9uKHdheXBvaW50LCBkaXJlY3Rpb24pIHtcbiAgICB0aGlzLnRyaWdnZXJRdWV1ZXNbZGlyZWN0aW9uXS5wdXNoKHdheXBvaW50KVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBHcm91cC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24od2F5cG9pbnQpIHtcbiAgICB2YXIgaW5kZXggPSBXYXlwb2ludC5BZGFwdGVyLmluQXJyYXkod2F5cG9pbnQsIHRoaXMud2F5cG9pbnRzKVxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLndheXBvaW50cy5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICB9XG5cbiAgLyogUHVibGljICovXG4gIC8qIGh0dHA6Ly9pbWFrZXdlYnRoaW5ncy5jb20vd2F5cG9pbnRzL2FwaS9maXJzdCAqL1xuICBHcm91cC5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy53YXlwb2ludHNbMF1cbiAgfVxuXG4gIC8qIFB1YmxpYyAqL1xuICAvKiBodHRwOi8vaW1ha2V3ZWJ0aGluZ3MuY29tL3dheXBvaW50cy9hcGkvbGFzdCAqL1xuICBHcm91cC5wcm90b3R5cGUubGFzdCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLndheXBvaW50c1t0aGlzLndheXBvaW50cy5sZW5ndGggLSAxXVxuICB9XG5cbiAgLyogUHJpdmF0ZSAqL1xuICBHcm91cC5maW5kT3JDcmVhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgcmV0dXJuIGdyb3Vwc1tvcHRpb25zLmF4aXNdW29wdGlvbnMubmFtZV0gfHwgbmV3IEdyb3VwKG9wdGlvbnMpXG4gIH1cblxuICBXYXlwb2ludC5Hcm91cCA9IEdyb3VwXG59KCkpXG47KGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCdcblxuICB2YXIgV2F5cG9pbnQgPSB3aW5kb3cuV2F5cG9pbnRcblxuICBmdW5jdGlvbiBpc1dpbmRvdyhlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQgPT09IGVsZW1lbnQud2luZG93XG4gIH1cblxuICBmdW5jdGlvbiBnZXRXaW5kb3coZWxlbWVudCkge1xuICAgIGlmIChpc1dpbmRvdyhlbGVtZW50KSkge1xuICAgICAgcmV0dXJuIGVsZW1lbnRcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQuZGVmYXVsdFZpZXdcbiAgfVxuXG4gIGZ1bmN0aW9uIE5vRnJhbWV3b3JrQWRhcHRlcihlbGVtZW50KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxuICAgIHRoaXMuaGFuZGxlcnMgPSB7fVxuICB9XG5cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLnByb3RvdHlwZS5pbm5lckhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpc1dpbiA9IGlzV2luZG93KHRoaXMuZWxlbWVudClcbiAgICByZXR1cm4gaXNXaW4gPyB0aGlzLmVsZW1lbnQuaW5uZXJIZWlnaHQgOiB0aGlzLmVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gIH1cblxuICBOb0ZyYW1ld29ya0FkYXB0ZXIucHJvdG90eXBlLmlubmVyV2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXNXaW4gPSBpc1dpbmRvdyh0aGlzLmVsZW1lbnQpXG4gICAgcmV0dXJuIGlzV2luID8gdGhpcy5lbGVtZW50LmlubmVyV2lkdGggOiB0aGlzLmVsZW1lbnQuY2xpZW50V2lkdGhcbiAgfVxuXG4gIE5vRnJhbWV3b3JrQWRhcHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoZWxlbWVudCwgbGlzdGVuZXJzLCBoYW5kbGVyKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgZW5kID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV1cbiAgICAgICAgaWYgKCFoYW5kbGVyIHx8IGhhbmRsZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGV2ZW50UGFydHMgPSBldmVudC5zcGxpdCgnLicpXG4gICAgdmFyIGV2ZW50VHlwZSA9IGV2ZW50UGFydHNbMF1cbiAgICB2YXIgbmFtZXNwYWNlID0gZXZlbnRQYXJ0c1sxXVxuICAgIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtZW50XG5cbiAgICBpZiAobmFtZXNwYWNlICYmIHRoaXMuaGFuZGxlcnNbbmFtZXNwYWNlXSAmJiBldmVudFR5cGUpIHtcbiAgICAgIHJlbW92ZUxpc3RlbmVycyhlbGVtZW50LCB0aGlzLmhhbmRsZXJzW25hbWVzcGFjZV1bZXZlbnRUeXBlXSwgaGFuZGxlcilcbiAgICAgIHRoaXMuaGFuZGxlcnNbbmFtZXNwYWNlXVtldmVudFR5cGVdID0gW11cbiAgICB9XG4gICAgZWxzZSBpZiAoZXZlbnRUeXBlKSB7XG4gICAgICBmb3IgKHZhciBucyBpbiB0aGlzLmhhbmRsZXJzKSB7XG4gICAgICAgIHJlbW92ZUxpc3RlbmVycyhlbGVtZW50LCB0aGlzLmhhbmRsZXJzW25zXVtldmVudFR5cGVdIHx8IFtdLCBoYW5kbGVyKVxuICAgICAgICB0aGlzLmhhbmRsZXJzW25zXVtldmVudFR5cGVdID0gW11cbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAobmFtZXNwYWNlICYmIHRoaXMuaGFuZGxlcnNbbmFtZXNwYWNlXSkge1xuICAgICAgZm9yICh2YXIgdHlwZSBpbiB0aGlzLmhhbmRsZXJzW25hbWVzcGFjZV0pIHtcbiAgICAgICAgcmVtb3ZlTGlzdGVuZXJzKGVsZW1lbnQsIHRoaXMuaGFuZGxlcnNbbmFtZXNwYWNlXVt0eXBlXSwgaGFuZGxlcilcbiAgICAgIH1cbiAgICAgIHRoaXMuaGFuZGxlcnNbbmFtZXNwYWNlXSA9IHt9XG4gICAgfVxuICB9XG5cbiAgLyogQWRhcHRlZCBmcm9tIGpRdWVyeSAxLnggb2Zmc2V0KCkgKi9cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLnByb3RvdHlwZS5vZmZzZXQgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50KSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIHZhciBkb2N1bWVudEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcbiAgICB2YXIgd2luID0gZ2V0V2luZG93KHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50KVxuICAgIHZhciByZWN0ID0ge1xuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMFxuICAgIH1cblxuICAgIGlmICh0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICByZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogcmVjdC50b3AgKyB3aW4ucGFnZVlPZmZzZXQgLSBkb2N1bWVudEVsZW1lbnQuY2xpZW50VG9wLFxuICAgICAgbGVmdDogcmVjdC5sZWZ0ICsgd2luLnBhZ2VYT2Zmc2V0IC0gZG9jdW1lbnRFbGVtZW50LmNsaWVudExlZnRcbiAgICB9XG4gIH1cblxuICBOb0ZyYW1ld29ya0FkYXB0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnQsIGhhbmRsZXIpIHtcbiAgICB2YXIgZXZlbnRQYXJ0cyA9IGV2ZW50LnNwbGl0KCcuJylcbiAgICB2YXIgZXZlbnRUeXBlID0gZXZlbnRQYXJ0c1swXVxuICAgIHZhciBuYW1lc3BhY2UgPSBldmVudFBhcnRzWzFdIHx8ICdfX2RlZmF1bHQnXG4gICAgdmFyIG5zSGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzW25hbWVzcGFjZV0gPSB0aGlzLmhhbmRsZXJzW25hbWVzcGFjZV0gfHwge31cbiAgICB2YXIgbnNUeXBlTGlzdCA9IG5zSGFuZGxlcnNbZXZlbnRUeXBlXSA9IG5zSGFuZGxlcnNbZXZlbnRUeXBlXSB8fCBbXVxuXG4gICAgbnNUeXBlTGlzdC5wdXNoKGhhbmRsZXIpXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyKVxuICB9XG5cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLnByb3RvdHlwZS5vdXRlckhlaWdodCA9IGZ1bmN0aW9uKGluY2x1ZGVNYXJnaW4pIHtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5pbm5lckhlaWdodCgpXG4gICAgdmFyIGNvbXB1dGVkU3R5bGVcblxuICAgIGlmIChpbmNsdWRlTWFyZ2luICYmICFpc1dpbmRvdyh0aGlzLmVsZW1lbnQpKSB7XG4gICAgICBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KVxuICAgICAgaGVpZ2h0ICs9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUubWFyZ2luVG9wLCAxMClcbiAgICAgIGhlaWdodCArPSBwYXJzZUludChjb21wdXRlZFN0eWxlLm1hcmdpbkJvdHRvbSwgMTApXG4gICAgfVxuXG4gICAgcmV0dXJuIGhlaWdodFxuICB9XG5cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLnByb3RvdHlwZS5vdXRlcldpZHRoID0gZnVuY3Rpb24oaW5jbHVkZU1hcmdpbikge1xuICAgIHZhciB3aWR0aCA9IHRoaXMuaW5uZXJXaWR0aCgpXG4gICAgdmFyIGNvbXB1dGVkU3R5bGVcblxuICAgIGlmIChpbmNsdWRlTWFyZ2luICYmICFpc1dpbmRvdyh0aGlzLmVsZW1lbnQpKSB7XG4gICAgICBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50KVxuICAgICAgd2lkdGggKz0gcGFyc2VJbnQoY29tcHV0ZWRTdHlsZS5tYXJnaW5MZWZ0LCAxMClcbiAgICAgIHdpZHRoICs9IHBhcnNlSW50KGNvbXB1dGVkU3R5bGUubWFyZ2luUmlnaHQsIDEwKVxuICAgIH1cblxuICAgIHJldHVybiB3aWR0aFxuICB9XG5cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLnByb3RvdHlwZS5zY3JvbGxMZWZ0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHdpbiA9IGdldFdpbmRvdyh0aGlzLmVsZW1lbnQpXG4gICAgcmV0dXJuIHdpbiA/IHdpbi5wYWdlWE9mZnNldCA6IHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0XG4gIH1cblxuICBOb0ZyYW1ld29ya0FkYXB0ZXIucHJvdG90eXBlLnNjcm9sbFRvcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB3aW4gPSBnZXRXaW5kb3codGhpcy5lbGVtZW50KVxuICAgIHJldHVybiB3aW4gPyB3aW4ucGFnZVlPZmZzZXQgOiB0aGlzLmVsZW1lbnQuc2Nyb2xsVG9wXG4gIH1cblxuICBOb0ZyYW1ld29ya0FkYXB0ZXIuZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpXG5cbiAgICBmdW5jdGlvbiBtZXJnZSh0YXJnZXQsIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gb2JqW2tleV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRhcmdldFxuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAxLCBlbmQgPSBhcmdzLmxlbmd0aDsgaSA8IGVuZDsgaSsrKSB7XG4gICAgICBtZXJnZShhcmdzWzBdLCBhcmdzW2ldKVxuICAgIH1cbiAgICByZXR1cm4gYXJnc1swXVxuICB9XG5cbiAgTm9GcmFtZXdvcmtBZGFwdGVyLmluQXJyYXkgPSBmdW5jdGlvbihlbGVtZW50LCBhcnJheSwgaSkge1xuICAgIHJldHVybiBhcnJheSA9PSBudWxsID8gLTEgOiBhcnJheS5pbmRleE9mKGVsZW1lbnQsIGkpXG4gIH1cblxuICBOb0ZyYW1ld29ya0FkYXB0ZXIuaXNFbXB0eU9iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIC8qIGVzbGludCBuby11bnVzZWQtdmFyczogMCAqL1xuICAgIGZvciAodmFyIG5hbWUgaW4gb2JqKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIFdheXBvaW50LmFkYXB0ZXJzLnB1c2goe1xuICAgIG5hbWU6ICdub2ZyYW1ld29yaycsXG4gICAgQWRhcHRlcjogTm9GcmFtZXdvcmtBZGFwdGVyXG4gIH0pXG4gIFdheXBvaW50LkFkYXB0ZXIgPSBOb0ZyYW1ld29ya0FkYXB0ZXJcbn0oKSlcbjsiLCJpbXBvcnQgTW9iaWxlTWVudSBmcm9tICcuL21vZHVsZXMvTW9iaWxlTWVudSc7XHJcbmltcG9ydCBSZXZlYWxPblNjcm9sbCBmcm9tICcuL21vZHVsZXMvUmV2ZWFsT25TY3JvbGwnO1xyXG5pbXBvcnQgU3RpY2t5SGVhZGVyIGZyb20gJy4vbW9kdWxlcy9TdGlja3lIZWFkZXInO1xyXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxubmV3IFJldmVhbE9uU2Nyb2xsKCQoXCIubGFyZ2UtaGVhZGxpbmVcIiksIFwiOTAlXCIpO1xyXG5uZXcgUmV2ZWFsT25TY3JvbGwoJChcIi5zbGlkZS1yaWdodFwiKSwgXCI2MCVcIik7XHJcbm5ldyBSZXZlYWxPblNjcm9sbCgkKFwiLnNsaWRlLWxlZnRcIiksIFwiNjAlXCIpO1xyXG5uZXcgUmV2ZWFsT25TY3JvbGwoJChcIi5zZXJ2aWNlLWl0ZW1cIiksIFwiODUlXCIpO1xyXG5uZXcgUmV2ZWFsT25TY3JvbGwoJChcIi53cC1ibG9jay1xdW90ZVwiKSwgXCI3NSVcIik7XHJcbm5ldyBSZXZlYWxPblNjcm9sbCgkKFwiLmhvbWUtY29udGFjdFwiKSwgXCI2MCVcIik7XHJcblxyXG5jb25zdCBtb2JpbGVNZW51ID0gbmV3IE1vYmlsZU1lbnUoKTtcclxuY29uc3Qgc3RpY2t5SGVhZGVyID0gbmV3IFN0aWNreUhlYWRlcigpO1xyXG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuY2xhc3MgTW9iaWxlTWVudSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgdGhpcy5tZW51SWNvbiA9ICQoXCIuc2l0ZS1oZWFkZXJfX21lbnUtaWNvblwiKTtcclxuICAgICAgICB0aGlzLm1lbnVDb250ZW50ID0gJChcIi5uYXYtaGVhZGVyXCIpO1xyXG4gICAgICAgIHRoaXMuZXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzKCkge1xyXG4gICAgICAgIHRoaXMubWVudUljb24uY2xpY2sodGhpcy50b2dnbGVNZW51SWNvbik7XHJcbiAgICAgICAgdGhpcy5tZW51SWNvbi5jbGljayh0aGlzLnRvZ2dsZVRoZU1lbnUuYmluZCh0aGlzKSk7ICBcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVUaGVNZW51KCkge1xyXG4gICAgICAgIHRoaXMubWVudUNvbnRlbnQudG9nZ2xlQ2xhc3MoXCJuYXYtaGVhZGVyLS1pcy12aXNpYmxlXCIpO1xyXG4gICAgICAgIHRoaXMubWVudUljb24udG9nZ2xlQ2xhc3MoXCJzaXRlLWhlYWRlcl9fbWVudS1pY29uLS1pcy1hY3RpdmVcIik7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBNb2JpbGVNZW51OyIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCB3YXlwb2ludHMgZnJvbSAnLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dheXBvaW50cy9saWIvbm9mcmFtZXdvcmsud2F5cG9pbnRzJztcclxuXHJcbmNsYXNzIFJldmVhbE9uU2Nyb2xsIHtcclxuICAgIGNvbnN0cnVjdG9yKGVscywgb2Zmc2V0KSB7XHJcbiAgICAgICAgdGhpcy5pdGVtc1RvUmV2ZWFsID0gZWxzO1xyXG4gICAgICAgIHRoaXMub2Zmc2V0UGVyY2VudGFnZSA9IG9mZnNldDtcclxuICAgICAgICB0aGlzLmhpZGVJbml0aWFsbHkoKTtcclxuICAgICAgICB0aGlzLmNyZWF0ZVdheXBvaW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGVJbml0aWFsbHkoKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtc1RvUmV2ZWFsLmFkZENsYXNzKFwicmV2ZWFsLWl0ZW1cIik7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlV2F5cG9pbnRzKCkge1xyXG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcclxuICAgICAgICB0aGlzLml0ZW1zVG9SZXZlYWwuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50SXRlbSA9IHRoaXM7XHJcbiAgICAgICAgICAgIG5ldyBXYXlwb2ludCh7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBjdXJyZW50SXRlbSwgLy9kb20gZWxlbWVudCB3ZSB3YXRjaFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChjdXJyZW50SXRlbSkuYWRkQ2xhc3MoXCJyZXZlYWwtaXRlbS0taXMtdmlzaWJsZVwiKVxyXG4gICAgICAgICAgICAgICAgfSwgLy93aGF0IHdlIHdhbnQgdG8gcnVuXHJcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IHRoYXQub2Zmc2V0UGVyY2VudGFnZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmV2ZWFsT25TY3JvbGw7IiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IHdheXBvaW50cyBmcm9tICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvd2F5cG9pbnRzL2xpYi9ub2ZyYW1ld29yay53YXlwb2ludHMnO1xyXG5cclxuY2xhc3MgU3RpY2t5SGVhZGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2l0ZUhlYWRlciA9ICQoJy5zaXRlLWhlYWRlcicpO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyVHJpZ2VyRWxlbWVudCA9ICQoJy53cC1ibG9jay1jb3Zlci10ZXh0Jyk7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVIZWFkZXJXYXlwb2ludCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZUhlYWRlcldheXBvaW50KCkge1xyXG4gICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xyXG4gICAgICAgIG5ldyBXYXlwb2ludCh7XHJcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuaGVhZGVyVHJpZ2VyRWxlbWVudFswXSxcclxuICAgICAgICAgICAgaGFuZGxlcjogZnVuY3Rpb24oZGlyZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBpZihkaXJlY3Rpb24gPT0gXCJkb3duXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGF0LnNpdGVIZWFkZXIuYWRkQ2xhc3MoJ3NpdGUtaGVhZGVyLS1jb21wYWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc2l0ZUhlYWRlci5yZW1vdmVDbGFzcygnc2l0ZS1oZWFkZXItLWNvbXBhY3QnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdGlja3lIZWFkZXI7IiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7Il0sInNvdXJjZVJvb3QiOiIifQ==