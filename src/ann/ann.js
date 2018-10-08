import { operator } from './math/operator';
import { network } from './network/network';

export class ann {
	constructor() { this.nn = null }
	
	initiate(config) {
		
		this.nn = new network(config);
		operator.init(this.nn);
		
		return this;
	}
	
	forward(data) {
		return operator.forward(this.nn, data);
	}
	
	train(data) {
		return operator.train(this.nn, data);
	}
}