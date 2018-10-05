import {node, biasnode} from '../network/network';
import {activatorFactory} from '../activations/activatorFactory';

export const initiator = function() {
	
		let initLayer = function(n, skipBias) {
			let nodes = [];
			
			for (let i = 0; i < n; i++) {
				nodes[i] = new node();
			}
			
			if (! skipBias) { nodes[n] = new biasnode();}
			
			return nodes;
		};
		
		let initWeight = function(ni, no) {
			let w = [[]];
			
			for (let i = 0; i < no; i++) {
		
				let r = [];
				for (let j = 0; j < ni; j++) { r[j] = Math.random(); }
				
				r[ni] = Math.random();
				
				w[i] = r;
			}
			
			return w;
		};
		
		return {
			initLayers: function(conf) {
				let ni = conf.numOfInputs;
				let no = conf.numberOfOutputs;
				let hl = conf.hiddenlayers;
				
				let layers = [[]];
				layers[0] = initLayer(ni);
				
				let l = hl.length;
				for (let i = 0; i < l; i++) {
					layers[i + 1] = initLayer(hl[i]);
				}
				
				layers[l + 1] = initLayer(no, true);
				
				return layers;
			},
			
			initWeights: function(conf) {
				let ni = conf.numOfInputs;
				let no = conf.numberOfOutputs;
				let hl = conf.hiddenlayers;
				
				let w = [[]];
				w[0] = initWeight(ni, hl[0]);
				
				let l = hl.length;
				for (let i = 1; i < l; i++) {
					w[i] = initWeight(hl[i - 1], hl[i]);
				}
				
				w[l] = initWeight(hl[l - 1], no);
					
				return w;
			}
		};
		
}();

export const operations = {
	applyInput: function(l, input) {
		
		let length = input.length;
		for (let i = 0; i < length; i++) {
			let value = input[i];
			l[i].sum = value;
			l[i].out = value;
		}
	},
	
	applyWeight: function(ll, w, lr, activator) {
		let nr = w.length;
		let nc = w[0].length;
		
		for (let i = 0; i < nr; i++) {
			let node = lr[i];
			
			let sum = 0;
			for (let j = 0; j < nc; j++) {
				sum += w[i][j] * ll[j].out;
			}
			
			node.sum = sum;
			node.out = activator.value(sum);
		}
	},
	
	getDiff(actual, desired) {
		let diff = [];
		
		let length = actual.length;
		for (let i = 0; i < length; i++) {
			diff[i] = actual[i] - desired[i];
		}
		
		return diff;
	},
	
	applyDiff: function(l, diff, activator) {
		
		let length = l.length;
		for (let i = 0; i < length; i++) {
			let node = l[i];
			node.gradient = diff[i] * activator.prime(node.sum)
		}
	},
	
	applyGradient(ll, w, lr, activator, lrate) {
		let nr = w[0].length - 1;
		let nc = w.length;
		
		for (let i = 0; i < nr; i++) {
			let node = ll[i];
			
			let gradient = 0;
			for (let j = 0; j < nc; j++) {
				let wt = w[j][i];
				let rgradient = lr[j].gradient;
				
				gradient += wt * rgradient;
				w[j][i] = wt - node.out * rgradient * lrate;
			}
			
			node.gradient = activator.value(node.sum) * gradient;
		}
		
		let bias = ll[nr];
		for (let i = 0; i < nc; i++) {
			let wt = w[i][nr];
			let rgradient = lr[i].gradient;
			
			w[i][nr] = wt - bias.out * rgradient * lrate;
		}
	}
};

export const matrix = {
	
	initLayers: function(nn) {
		nn.layers = initiator.initLayers(nn.config);
	},
	
	initWeights: function(nn) {
		nn.weights = initiator.initWeights(nn.config);
	},
	
	forward: function(nn, input) {
		let config = nn.config;
		let layers = nn.layers;
		let weights = nn.weights;
		let activator = activatorFactory.getActivator(config.activatorName);
		
		operations.applyInput(layers[0], input);
		
		for (let i = 0; i < weights.length; i++) {
			operations.applyWeight(layers[i], weights[i], layers[i + 1], activator);
		}
		
		return nn.getOutput();
	},
	
	backward: function(nn, diff) {
		let config = nn.config;
		let layers = nn.layers;
		let weights = nn.weights;
		let activator = activatorFactory.getActivator(config.activatorName);
		
		operations.applyDiff(layers[layers.length - 1], diff, activator);
		for (let i = layers.length - 1; i > 0; i--) {
			operations.applyGradient(layers[i - 1], weights[i - 1], layers[i],
					activator, config.learningRate);
		}
	},
	
	train: function(nn, data) {
		let input = data[0];
		let desired = data[1];
		
		let diff = operations.getDiff(this.forward(nn, input), desired)
		this.backward(nn, diff);
		
		return diff;
	}
}