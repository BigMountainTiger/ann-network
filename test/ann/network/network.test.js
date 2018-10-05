import {node, annConfig, network} from '../../../src/ann/network/network';

describe('network Test', () => {
	it('node Test', () => {
		let aNode = new node();
		expect(aNode).toMatchObject({sum: 0, out: 0, gradient: 0});
	});
	
	it('annConfig Test', () => {
		let aAnnConfig = new annConfig(2, 1, [3, 3], 'signoid');
		
		expect(aAnnConfig.numOfInputs).toEqual(2);
		expect(aAnnConfig.numberOfOutputs).toEqual(1);
		expect(aAnnConfig.hiddenlayers).toMatchObject([3, 3]);
		expect(aAnnConfig.activatorName).toEqual('signoid');
	});
	
	it('network Test', () => {
		let aAnnConfig = new annConfig(2, 1, [3, 3], 'signoid');
		let aNetwork = new network(aAnnConfig);
		
		expect(aNetwork.config).toEqual(aAnnConfig);
		expect(aNetwork.layers).toMatchObject([]);
		expect(aNetwork.weights).toMatchObject([]);	
		expect(aNetwork.getOutput()).toMatchObject([]);	
	});
});