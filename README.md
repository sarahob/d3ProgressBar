# d3ProgressBar

A progress bar component built using D3.js. The component uses svg rects, one for the background and the other which transitions width to convey progress. 

It is configurable, users can define the height, width of each status segment, colorScale, backgroundFill, roundedCorners(rx,ry), and the currentStatus which is the inital status the chart begins on. 

The fill of the bar can either be one solid color or a colorScale based on statuses.

The chart's input is an array of statuses.
