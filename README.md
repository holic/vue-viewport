# Viewport plugin for [Vue](http://vuejs.org/)

This [Vue plugin](http://vuejs.org/guide/plugin.html) adds a `detect-viewport` directive, allowing you to detect viewport enter and leave events in your VM.

## Usage

Follow the [official Vue plugin](http://vuejs.org/guide/plugin.html) documentation for installation instructions.

Once the plugin is added to your project, you can add a `v-detect-viewport` attribute to any VM element and then listen to `viewportenter` and `viewportleave` events.

```html
<div v-component="my-component" v-detect-viewport>
	<p>Am I in the viewport?</p>
</div>
```

```js
Vue.component('my-component', {
	created: function () {
		this.$on('viewportenter', function () {
			console.log('I have entered the viewport.')
		})
		this.$on('viewportleave', function () {
			console.log('I have left the viewport.')
		})
	}
})
```
