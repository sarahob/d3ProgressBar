/**
* D3 progress bar build using rects, one for the background and the other which transitions width to convey progress. 
* It is a configurable component, users can define the height, width of each status segment, colorScale, backgroundFill, roundedCorners(rx,ry), and
* the currentStatus which is the inital status the chart begins on 
* The fill of the bar can either be one solid color or a colorScale based on statuses
* The chart's input is an array of statuses 
*/
function progressBar() {

    var height = 15,
        segmentWidth = 50,
        progressFill = 'green',
        colorScale,
        roundedCorners = 10,
        backgroundFill = 'gray',
        currentStatus;

    function chart(selection) {

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

    chart.moveProgressBar = function(state) {
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

    chart.height = function(_) {
        if (!arguments.length) {
            return height;
        }
        height = _;
        return chart;
    };

    chart.segmentWidth = function(_) {
        if (!arguments.length) {
            return segmentWidth;
        }
        segmentWidth = _;
        return chart;
    };

    chart.colorScale = function(_) {
        if (!arguments.length) {
            return colorScale;
        }
        colorScale = _;
        return chart;
    };

    chart.roundedCorners = function(_) {
        if (!arguments.length) {
            return roundedCorners;
        }
        roundedCorners = _;
        return chart;
    };

    chart.backgroundFill = function(_) {
        if (!arguments.length) {
            return backgroundFill;
        }
        backgroundFill = _;
        return chart;
    };

    chart.progressFill = function(_) {
        if (!arguments.length) {
            return progressFill;
        }
        progressFill = _;
        return chart;
    };

    chart.currentStatus = function(_) {
        if (!arguments.length) {
            return currentStatus;
        }
        currentStatus = _;
        return chart;
    };

    return chart;
}