let config = {

    // BAR CHART
    bar: {
        config: {
            chart: {
                type: 'bar',
                height: 700
            },
            title: {
                text: 'Earthquakes by Region (2000 to Present)'
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
                text: 'Earthquakes by U.S. State (2000 to Present)'
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

};