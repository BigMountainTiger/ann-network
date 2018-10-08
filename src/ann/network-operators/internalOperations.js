export const internalOperations = {
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