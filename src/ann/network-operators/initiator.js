import {node, biasnode} from '../network/node';

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
		
		let initLayers = function(conf) {
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
		};
		
		let initWeights =  function(conf) {
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
		};
		
		return {
			initNetwork: function(nn) {
				nn.layers = initLayers(nn.config);
				nn.weights = initWeights(nn.config);
			},
		};
		
}();