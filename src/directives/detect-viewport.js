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
