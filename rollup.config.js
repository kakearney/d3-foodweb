import legacy from 'rollup-plugin-legacy';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: "index.js",
	format: "umd",
	moduleName: "d3",
	plugins: [
		nodeResolve({ jsnext: true, main: true }),
		legacy({'node_modules/d3-tip/index.js': { tip: 'd3.tip' }})
	],
	dest: "build/d3-foodweb.js"
}