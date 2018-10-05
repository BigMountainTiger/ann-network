import {matrix} from './math/matrix';
import {node, annConfig, network} from './network/network';

export class ann {
	constructor() { this.nn = null }
	
	initiate(config) {
		this.nn = new network(config);
		
		let nn = this.nn;
		matrix.initLayers(nn);
		matrix.initWeights(nn);
		
		return this;
	}
	
	forward(data) {
		return matrix.forward(this.nn, data);
	}
	
	train(data) {
		return matrix.train(this.nn, data);
	}
}