let config = {

    // BAR CHART
    bar: {
        config: {
            chart: {
                type: 'bar',
                height: 700
            },
            title: {
                text: 'Significant Earthquakes by Region (2000 to Present)'
            },
            legend: {
                enabled: false
            },
            tooltip: {
                formatter: function () {
                    return this.x + '<br/>' + 
                           '<strong>' + this.y + '</strong> earthquakes';
                }
            },
            xAxis: {
                categories: []
            },
            series: [
                {
                    data: []
                }
            ] 
        },
        data: function(options) {
            $.ajax({
                url: 'http://localhost:3000/facets?facet=region',
                success: function(res) {
                    res[0].facets.region.facetValues.forEach(val => {
                        options.xAxis.categories.push(val.name);
                        options.series[0].data.push(val.count);
                    })
                    Highcharts.chart('chart', options); 
                }
            });
        }
    },

    // COLUMN CHART
    column: {
        config: {
            chart: {
                type: 'column',
                height: 700
            },
            title: {
                text: 'Significant Earthquakes by U.S. State/Territory (2000 to Present)'
            },
            legend: {
                enabled: false
            },
            tooltip: {
                formatter: function () {
                    return this.x + '<br/>' + 
                           '<strong>' + this.y + '</strong> earthquakes';
                }
            },
            xAxis: {
                categories: []
            },
            series: [
                {
                    data: []
                }
            ] 
        },
        data: function(options) {
            $.ajax({
                url: 'http://localhost:3000/facets?facet=state',
                success: function(res) {
                    res[0].facets.state.facetValues.forEach(val => {
                        options.xAxis.categories.push(val.name);
                        options.series[0].data.push(val.count);
                    })
                    Highcharts.chart('chart', options); 
                }
            });
        }
    },

    // STACKED COLUMN CHART
    stacked: {
        config: {
            chart: {
                type: 'column',
                height: 700
            },
            title: {
                text: 'Magnitudes of Significant Earthquakes by Region (2000 to Present)'
            },
            xAxis: {
                categories: []
            },
            yAxis: {
                title: {
                    text: 'Count'
                }
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            legend: {
                reversed: true
            },
            tooltip: {
                formatter: function () {
                    console.log(this);
                    return this.series.name + '<br/>' + 
                           '<strong>' + this.y + '</strong> earthquakes';
                }
            },
            series: []
        },
        data: function(options) {
            let opts = {
                collection: 'EarthquakesMap',
                pageLength: 0,
                facet: { 
                    name: 'magnitude',
                    buckets: [
                        { name: 'Magnitude of less than 5', comparison: '<', upper: 5 },
                        { name: 'Magnitude of 5 to 7', comparison: '<', lower: 5, upper: 7 },
                        { name: 'Magnitude of greater than 7', comparison: '<', lower: 7 }
                    ]
                }
            };
            $.ajax({
                url: 'http://localhost:3000/search?facet=region&pageLength=0',
                success: function(res) {
                    let colors = ['#FFBCBC', '#FF6666', '#CD0000'];
                    let buckets = opts.facet.buckets.map(b => b.name)
                    let regions = res[0].facets.region.facetValues.map(val => val.name)
                    
                    // Initialize series data structures
                    let seriesGroup = new SeriesGroup();
                    buckets.forEach((b, i) => {
                        let series = new Series(b, colors[i]);
                        regions.forEach(region => {
                            series.addPoint(region, 0);
                        })
                        seriesGroup.addSeries(series);
                    })

                    // Search each region with bucketed options
                    regions.forEach(region => {
                        opts.qtext = region; // Term constraint
                        $.ajax({
                            type: 'POST',
                            url: 'http://localhost:3000/search',
                            data: JSON.stringify(opts),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: function(res) {
                                // Add each point to data structures
                                res[0].facets.magnitude.facetValues.forEach(range => {
                                    seriesGroup.addPoint(range.name, region, range.count)
                                })
                                // Generate Highcharts data structures, build chart
                                options.xAxis.categories = seriesGroup.getSortedTotals();
                                options.series = seriesGroup.getSeriesArray();
                                Highcharts.chart('chart', options); 
                            }
                        });
                    })
                }
            });
        }
    },

};