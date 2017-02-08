# d3-foodweb

This repository holds code for the d3-foodweb plugin, which provides two functions to plot interactive food web graphs using the D3 visualization library.  

This project is still very much in alpha, and is being developed alongside the writing of a manuscript documenting the underlying algorithms.

## Installing

If you use NPM, `npm install d3-foodweb`. Otherwise, download the [latest release](https://github.com/kakearney/d3-foodweb/releases/latest).

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

## Input data

This function is designed to be used with input object data

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

Adds text labels to existing node circles created previously by either d3.foodweblayout or d3.foodwebstatic, using Evan Wang's  [simulated annealing labeling placement routine](https://github.com/tinker10/D3-Labeler).  The *width* and *height* input parameters describe the size of the region to be used for labeling, usually corresponding to the total width/height minus padding (i.e. the plotted axis region) of the underlying food web plot.

