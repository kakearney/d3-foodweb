# d3-foodweb

This repository holds code for the d3-foodweb plugin, which provides two functions to plot interactive food web graphs using the D3 visualization library.

This project is still in development, and may change as I work on drafting a journal article describing the underlying algorithms.  Documentation and examples will improve as development continues.

## Installing

<!-- If you use NPM, `npm install d3-foodweb`. Otherwise, download the [latest release](https://github.com/kakearney/d3-foodweb/releases/latest). -->

This package will eventually be made available via npm.  For now, the most up-to-date version can currently be downloaded from [GitHub](https://github.com/kakearney/d3-foodweb/).  Link to the build/d3-foodweb.js or build/d3-foodweb.min.js files to use this plugin on a webpage.

This function relies on functions from the following D3 modules.  

- d3-selection
- d3-force
- d3-array
- d3-scale
- d3-axis
- d3-interpolate
- d3-color
- d3-drag
- d3-shape

as well as the [d3-tip](http://labratrevenge.com/d3-tip/) and [d3-labeler](https://github.com/tinker10/D3-Labeler) plugins.  These are all rolled up in the custom d3-foodweb plugin, and you can call the three main functions without any additional dependencies.

## Input data

These functions are intended to be used with Ecopath-style ocean ecosystem network graphs.  Nodes represent the state variables in an ecosystem (living groups, detrital pools, and fishing fleets), and edges represent the flow of biomass due to primary production, grazing, predation, fisheries catch, and flow to detritus (egestion and non-predatory mortality).

The data that binds to these functions should consist of an object with 3 properties:

- **nodes**: array of data used to create node circles.  Each object in the nodes array includes the following properties:
	- **B**:  biomass, area of node circle scales to this value
	- **type**:  group type (0=consumer,1=producer,2=detrital,3=fishing fleet), used for default color scale
	- **TL**:  trophic level, used to determine node y position
	- **id**:  string, used to indentify and label nodes
	- **TG**:  trophic group, used for initial x-position of nodes
	- **x**:  x-coordinate of node, in pixels (optional for foodweblayout, where it overrides the default initial positioning)
	- **y**:  y-coordinate of node, in pixels (optional for foodweblayout, where it overrides the default initial positioning)
	- **cval**:  (optional) value used to map color to nodes
- **links1**: array of data describing the primary edges (fluxes).  Each object in this array includes the following properties:
	- **source**:  id of source node
	- **target**:  id of target node
	- **Weight**:  (foodwebstatic only), value used to map edge width
	- **xpath**:  (foodwebstatic only, optional), x-coordinates of the edge line, in pixels
	- **ypath**:  (foodwebstatic only, optional), y-coordinates of the edge line, in pixels
	- **cval**: (foodwebstatic only, optional) value used to map color to edges
- **links2**: array of data describing trophic-group edges (foodweblayout only)
	- **source**: id of source node
	- **target**: id of target node

 The following very simple example demonstrates this input format:

```html
	<script src="https://d3js.org/d3-selection.v1.min.js"></script>
	<script src="d3-foodweb.js"></script>
	<script>

	simpledata = 
		{
			"nodes": [
				[
					{
						"B": 0.5,
						"type": 0,
						"TL": 2,
						"id": "Consumer",
						"TG": 1
					},
					{
						"B": 1,
						"type": 1,
						"TL": 1,
						"id": "Producer1",
						"TG": 2
					},
					{
						"B": 2,
						"type": 1,
						"TL": 1,
						"id": "Producer2",
						"TG": 2
					}
				]
			],
			"links1": [
				[
					{
						"source": "Producer1",
						"target": "Consumer"
					},
					{
						"source": "Producer2",
						"target": "Consumer"
					}
				]
			],
			"links2": [
				[
					{
						"source": "Producer1",
						"target": "Producer2",
						"TG": 2
					}
				]
			]
		}
	

	d3.select("#div1")
		.datum(simpledata)
		.call(d3.foodweblayout()
			.totheight(100)
			.totwidth(200)
			.rlim([5,10]));
	
	
	</script>
```

The [foodwebgraph-pkg](https://github.com/kakearney/foodwebgraph-pkg) Matlab toolbox includes functions to export an Ecopath model to a properly-formatted JSON file for use with these functions.  Examples of such files for the Generic\_37 Ecopath model can be found in the examples folder. 


## API Reference

d3.**foodweblayout()**

Creates and returns a new force-layout style food web diagram.

*foodweblayout*.**totwidth(*val*)**

Width (pixels) of new svg element holding the new food web diagram.  
Default = 960.

*foodweblayout*.**totheight(*val*)**

Height (pixels) of new svg element holding the new food web diagram.  
Default = 600.

*foodweblayout*.**paddingLeft(*val*)**

Margin (pixels) between left edge of svg element and the left edge of the plotting axis rectangle (left edge corresponds to location of trophic level axis).  
Default = 50.

*foodweblayout*.**paddingRight(*val*)**

Margin (pixels) between right edge of svg element and the right edge of the plotting axis rectangle. 
Default = 10.

*foodweblayout*.**paddingTop(*val*)**

Margin (pixels) between top edge of svg element and the top edge of the plotting axis rectangle. 
Default = 10.

*foodweblayout*.**paddingBottom(*val*)**

Margin (pixels) between bottom edge of svg element and the bottom edge of the plotting axis rectangle. 
Default = 10.

*foodweblayout*.**tllim([*minval*, *maxval*])**

Minimum and maximum limits for the trophic level axis (i.e. y-axis).  If either value is set to NaN, the minimum/maximum value in the input data will be used. 
Default = [NaN, NaN]

*foodweblayout*.**rlim([*minval*, *maxval*])**

Radius (pixels) of nodes corresponding to the minimum and maximum biomass limits (see blim). 
Default = [1, 50]

*foodweblayout*.**blim([*minval*, *maxval*])**

Biomass values corresponding to the minimum and maximum radius limits (see rlim).  If either value is NaN, the input data limit will be used. 
Default = [NaN, NaN]

*foodweblayout*.**colfun(*fun*)**

A color scale function that returns a color value for a given node or edge cval input (see data description above).  Any of the d3.interpolateXXX color scales will work here. 
Default = a continuous blue-pink-yellow scale with domain [0,1].

*foodweblayout*.**strengthflxlink(*strength*)**

Strength value applied to the flux-edge links in the force layout simulation. 
Default = 0.0001.

*foodweblayout*.**strengthgrplink(*strength*)**

Strength value applied to the trophic-group-edge links in the force layout simulation. 
Default = 0.1.

*foodweblayout*.**strengthtrophic(*strength*)**

Strength value applied to the y-positioning force (i.e. trophic level nudging) in the force layout simulation. 
Default = 0.9

*foodweblayout*.**strengthxcenter(*strength*)**

Strength value applied to the horizntal centering force in the force layout simulation. 
Default = 0.05.

*foodweblayout*.**nodepad(*val*)**

Minimum spacing (pixels) around all nodes.
Default = 10

*foodweblayout*.**animating(*logical*)**

Logical value indicating whether to animate the force layout (true) or simply show the initial positions (false).  
Default = true.

*foodweblayout*.**animationStep(*val*)**

Number of milliseconds to pause between each tick of the force layout.  A non-zero value can be used to show movement in slow motion.  Note that no between-tick transitions are applied, so a large value will result in jerky animation. 
Default = 0.

d3.**foodwebstatic()**

Creates and returns a new static-position food web diagram.

*foodwebstatic*.**totwidth(*val*)**

*foodwebstatic*.**totheight(*val*)**

*foodwebstatic*.**paddingLeft(*val*)**

*foodwebstatic*.**paddingRight(*val*)**

*foodwebstatic*.**paddingTop(*val*)**

*foodwebstatic*.**paddingBottom(*val*)**

*foodwebstatic*.**tllim([*minval*, *maxval*])**

*foodwebstatic*.**rlim([*minval*, *maxval*])**

*foodwebstatic*.**blim([*minval*, *maxval*])**

*foodwebstatic*.**colfun(*fun*)**

as described for *foodweblayout*

*foodwebstatic*.**lwmax(*val*)**

Edge line width (pixels) corresponding to the maximum edge weight plotted.
Default = 100

*foodwebstatic*.**wmax(*val*)**

Weight value corresponding to the maximum line width value (see lwmax).  If NaN, this will correspond to the maximum edge weight in the input dataset (see dataset description, above).
Default = NaN

*foodwebstatic*.**pedge(*val*)**

Edge width power parameter, exponent in power scaling relating weight value to edge width.  pedge = 1 leads to linear scaling.  For most food webs, a value <1 will be preferred to display weight values spanning many orders of magnitude.
Default = 1/3

d3.**labelnodes(*width*,*height*)**

Adds text labels to existing node circles created previously by either d3.foodweblayout or d3.foodwebstatic, using Evan Wang's  [simulated annealing label placement routine](https://github.com/tinker10/D3-Labeler).  The *width* and *height* input parameters describe the size of the region to be used for labeling, usually corresponding to the total width/height minus padding (i.e. the plotted axis region) of the underlying food web plot.

