import {initiator, operations, matrix} from '../../../src/ann/math/matrix';
import {node, annConfig} from '../../../src/ann/network/network';
import {activatorFactory} from '../../../src/ann/activations/activatorFactory';

it('network initiator Test', () => {
	// Configuration 1
	let config = new annConfig(2, 1, [3], 'signoid');
	
	let layers = initiator.initLayers(config);
	expect(layers.length).toEqual(3);
	expect(layers[0].length).toEqual(3);
	expect(layers[1].length).toEqual(4);
	expect(layers[2].length).toEqual(1);
	
	let weights = initiator.initWeights(config);
	expect(weights.length).toEqual(2);
	let w0 = weights[0], w1 = weights[1];
	expect(w0.length).toEqual(3);
	expect(w0[0].length).toEqual(3);
	expect(w1.length).toEqual(1);
	expect(w1[0].length).toEqual(4);
	
	// Configuration 2
	config = new annConfig(2, 1, [3, 3], 'signoid');
	layers = initiator.initLayers(config);
	expect(layers.length).toEqual(4);
	expect(layers[0].length).toEqual(3);
	expect(layers[1].length).toEqual(4);
	expect(layers[2].length).toEqual(4);
	expect(layers[3].length).toEqual(1);
	
	weights = initiator.initWeights(config);
	expect(weights.length).toEqual(3);
	w0 = weights[0];
	w1 = weights[1];
	let w2 = weights[2];
	expect(w0.length).toEqual(3);
	expect(w0[0].length).toEqual(3);
	expect(w1.length).toEqual(3);
	expect(w1[0].length).toEqual(4);
	expect(w2.length).toEqual(1);
	expect(w2[0].length).toEqual(4);
	
});

it('operations Test', () => {
	let actual = [1, 1];
	let desired = [0, 0];
	
	let diff = operations.getDiff(actual, desired);
	expect(diff).toMatchObject([1, 1]);	
	
	let getlayer = function(n) {
		
		let layer = [];
		for (let i = 0; i < n; i++) {
			layer[i] = new node();
		}
		
		return layer;
	};
	
	let getWeight = function(m, n, v) {
		let w = [[]];
		
		for (let i = 0; i < m; i++) {
			let wr = [];
			for (let j = 0; j < n; j++) {
				wr[j] = v;
			}
			
			w[i] = wr;
		}
		
		return w;
	}
	
	// Initiate input
	let ll = getlayer(2);
	operations.applyInput(ll, [0.5, 2]);
	expect(ll[0].sum).toEqual(0.5);
	expect(ll[1].sum).toEqual(2);
	expect(ll[0].out).toEqual(0.5);
	expect(ll[1].out).toEqual(2);
	
	let w = getWeight(3, 2, 1);
	let lr = getlayer(3);
	
	let linear = activatorFactory.getActivator('linear');
	
	// applyWeight
	operations.applyWeight(ll, w, lr, linear);
	for (let i = 0; i < lr.length; i++) {
		expect(lr[i].out).toEqual(2.5);
	}
	
});