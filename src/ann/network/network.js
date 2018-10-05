export class node {
	constructor() {
		this.sum = 0;
		this.out = 0;
		this.gradient = 0;
	}
}

export class annConfig {
	constructor(numOfInputs, numberOfOutputs, hiddenlayers, activatorName, learningRate) {
		this.numOfInputs = numOfInputs;
		this.numberOfOutputs = numberOfOutputs;
		this.hiddenlayers = hiddenlayers;
		this.activatorName = activatorName;
		this.learningRate = learningRate? learningRate: 1;
	}
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
		
		let oLayer = layers[layers.length -1];
		let length = oLayer.length;
		for (let i = 0; i < length; i++) {
			output[i] = oLayer[i].out;
		}
		
		return output;
	}
}