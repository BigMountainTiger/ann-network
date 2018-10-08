import { network } from './network/network';
import { initiator } from './network-operators/initiator';
import { operator } from './network-operators/operator';

export class ann {
	constructor() { this.nn = null }
	
	initiate(config) {
		
		this.nn = new network(config);
		initiator.initNetwork(this.nn);
		
		return this;
	}
	
	forward(data) {
		return operator.forward(this.nn, data);
	}
	
	train(data) {
		return operator.train(this.nn, data);
	}
}