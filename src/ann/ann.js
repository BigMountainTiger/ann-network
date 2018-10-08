import { matrix } from './math/matrix';
import { network } from './network/network';

export class ann {
	constructor() { this.nn = null }
	
	initiate(config) {
		
		this.nn = new network(config);
		matrix.init(this.nn);
		
		return this;
	}
	
	forward(data) {
		return matrix.forward(this.nn, data);
	}
	
	train(data) {
		return matrix.train(this.nn, data);
	}
}