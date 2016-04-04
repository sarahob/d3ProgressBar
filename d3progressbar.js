/**
* D3 progress bar build using rects, one for the background and the other which transitions width to convey progress. 
* It is a configurable component, users can define the height, width of each status segment, colorScale, backgroundFill, roundedCorners(rx,ry), and
* the currentStatus which is the inital status the bar begins on 
* The fill of the bar can either be one solid color or a colorScale based on statuses
* The bar's input is an array of statuses 
*/
function progressBar() {

    var height = 15,
        segmentWidth = 50,
        progressFill = 'green',
        colorScale,
        roundedCorners = 10,
        backgroundFill = 'gray',
        currentStatus;

    function bar(selection) {

        selection.each(function(data) {

            svg.append('rect')
                .attr('class', 'bg-rect')
                .attr('rx', roundedCorners)
                .attr('ry', roundedCorners)
                .attr('fill',  backgroundFill)
                .attr('height', height)
                .attr('width', function() {
                    return segmentWidth * states.length;
                })
                .attr('x', 0);

            var progress = svg.append('rect')
                .attr('class', 'progress-rect')
                .attr('fill', function() {
                    return colorScale !== undefined ? colorScale(currentStatus) : progressFill;
                })
                .attr('height', height)
                .attr('width', 0)
                .attr('rx', roundedCorners)
                .attr('ry', roundedCorners)
                .attr('x', 0);

            progress.transition()
                .duration(1000)
                .attr('width', function() {
                    var index = states.indexOf(currentState);
                    return (index + 1) * segmentWidth;
                });

        });

    }

    bar.moveProgressBar = function(state) {
        d3.select('rect.progress-rect').transition()
            .duration(1000)
            .attr('fill', function() {
                return colorScale !== undefined ? colorScale(state) : progressFill;
            })
            .attr('width', function() {
                var index = states.indexOf(state);
                return (index + 1) * segmentWidth;
            });
    }

    bar.height = function(_) {
        if (!arguments.length) {
            return height;
        }
        height = _;
        return bar;
    };

    bar.segmentWidth = function(_) {
        if (!arguments.length) {
            return segmentWidth;
        }
        segmentWidth = _;
        return bar;
    };

    bar.colorScale = function(_) {
        if (!arguments.length) {
            return colorScale;
        }
        colorScale = _;
        return bar;
    };

    bar.roundedCorners = function(_) {
        if (!arguments.length) {
            return roundedCorners;
        }
        roundedCorners = _;
        return bar;
    };

    bar.backgroundFill = function(_) {
        if (!arguments.length) {
            return backgroundFill;
        }
        backgroundFill = _;
        return bar;
    };

    bar.progressFill = function(_) {
        if (!arguments.length) {
            return progressFill;
        }
        progressFill = _;
        return bar;
    };

    bar.currentStatus = function(_) {
        if (!arguments.length) {
            return currentStatus;
        }
        currentStatus = _;
        return bar;
    };

    return bar;
}
