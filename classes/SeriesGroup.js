class SeriesGroup {
  seriesGroup = {};
  seriesTotals = {};

  constructor() {}

  addSeries(series) {
  	this.seriesGroup[series.name] = series;
  }

  addPoint(seriesName, pointName, val) {
  	this.seriesGroup[seriesName].addPoint(pointName, val);
  	if (!this.seriesTotals[pointName]) {
  		this.seriesTotals[pointName] = 0;
  	}
  	this.seriesTotals[pointName] = this.seriesTotals[pointName] + val;
  }

  getSeriesArray() {
  	let keys = Object.keys(this.seriesGroup).reverse();
  	return keys.map(k => {
  		return { 
  			name: k, 
  			color: this.seriesGroup[k].color, 
  			data: this.seriesGroup[k].getDataArray(this.getSortedTotals()) 
  		};
  	})
  }

  getSortedTotals() {
  	let arr = [];
  	for (var key in this.seriesTotals) {
	  arr.push([key, this.seriesTotals[key]]);
	}
  	arr.sort(function(a, b) {
	  return a[1] - b[1];
	});
	let sorted = arr.map(a => {
		return a[0];
	})
	return sorted;
  }

}