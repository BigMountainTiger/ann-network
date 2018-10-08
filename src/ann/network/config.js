export class config {
	constructor(numOfInputs,
			numberOfOutputs,
			hiddenlayers,
			activatorName,
			learningRate) {
		
		this.numOfInputs = numOfInputs;
		this.numberOfOutputs = numberOfOutputs;
		this.hiddenlayers = hiddenlayers;
		this.activatorName = activatorName;
		this.learningRate = learningRate? learningRate: 1;
	}
}