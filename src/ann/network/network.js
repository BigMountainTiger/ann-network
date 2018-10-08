export class node {
	constructor() {
		this.sum = 0;
		this.out = 0;
		this.gradient = 0;
	}
}

export class biasnode {
	constructor() { this.out = 1; }
}

export class network {
	constructor(config) {
		this.config = config;
		this.layers = [];
		this.weights = [];
	}
	
	getOutput() {
		let layers = this.layers;
		
		let output = [];
		if (!layers || layers.length < 1) {
			return output;
		}
		
		let oLayer = layers[layers.length - 1];
		let length = oLayer.length;
		for (let i = 0; i < length; i++) {
			output[i] = oLayer[i].out;
		}
		
		return output;
	}
}