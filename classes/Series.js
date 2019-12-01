class Series {
  name = '';
  color = '';
  data = {};

  constructor(name, color) {    
    this.name = name;
    this.color = color;
  }

  addPoint(name, val) {
  	this.data[name] = val;
  }

  // Pass in keys in display order (sorted by total)
  getDataArray(keys) {
  	return keys.map(name => {
  		return { name: name, y: this.data[name] };
  	})
  }
}