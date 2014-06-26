exports.install = function (Vue, options) {
	Vue.directive('detect-viewport', require('./directives/detect-viewport'))
}
