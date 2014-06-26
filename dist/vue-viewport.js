(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function isElementInViewport (el) {
	var rect = el.getBoundingClientRect()
	return rect.bottom > 0
		&& rect.right > 0
		&& rect.top < (window.innerHeight || document.documentElement.clientHeight)
		&& rect.left < (window.innerWidth || document.documentElement.clientWidth)
}


var directives = []

function notify (directive) {
	if (!directive.el) return

	var inViewport = isElementInViewport(directive.el)
	if (directive.inViewport == null || directive.inViewport !== inViewport) {
		directive.inViewport = inViewport
		var direction = inViewport ? 'enter' : 'leave'
		directive.vm.$emit('viewport' + direction, directive.el)
	}
}

function notifyAll () {
	directives.forEach(notify)
}


['DOMContentLoaded', 'load', 'scroll', 'resize', 'popstate'].forEach(function (event) {
	window.addEventListener(event, notifyAll, false)
})


module.exports = {
	isEmpty: true,

	bind: function () {
		this.vm.$on('hook:attached', notifyAll)
		this.vm.$on('hook:detached', notifyAll)

		if (directives.indexOf(this) === -1) {
			directives.push(this)
		}
	},

	unbind: function () {
		this.vm.$off('hook:attached', notifyAll)
		this.vm.$off('hook:detached', notifyAll)

		var index = directives.indexOf(this)
		if (index > -1) {
			directives.splice(index, 1)
		}
	}
}

},{}],2:[function(require,module,exports){
exports.install = function (Vue, options) {
	Vue.directive('detect-viewport', require('./directives/detect-viewport'))
}

},{"./directives/detect-viewport":1}]},{},[2])