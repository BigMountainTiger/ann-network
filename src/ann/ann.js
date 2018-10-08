import { network } from './network/network';
import { networkInitiator } from './network-operators/networkInitiator';
import { networkOperator } from './network-operators/networkOperator';

export class ann {
	constructor() { this.nn = null; }
	
	initiate(config) {
		
		this.nn = new network(config);
		networkInitiator.initNetwork(this.nn);
		
		return this;
	}
	
	forward(data) {
		return networkOperator.forward(this.nn, data);
	}
	
	train(data) {
		return networkOperator.train(this.nn, data);
	}
}