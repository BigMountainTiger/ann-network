const linear = {
		value: function(x) {
			return x;
		},
		
		prime: function(x) {
			return 1;
		}
};

const signoid = {
	value: function(x) {
		return 1 / (1 + Math.exp(-1 * x));
	},
	
	prime: function(x) {
		let v = this.value(x);
		return v * (1 - v);
	}
};

const ReLU = {
		value: function(x) {
			return Math.max(0, x);
		},
		
		prime: function(x) {
			return (x >= 0)? 1: 0;
		}
};


export const activatorFactory = {
		activators: {
				linear: linear,
				signoid: signoid,
				ReLU: ReLU
		},
		getActivator: function(name) {
			return this.activators[name];
		}
}