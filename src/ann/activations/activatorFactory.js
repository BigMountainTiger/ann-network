export const activatorFactory = {
		
	availableActivators: {
		linear: {
			value: function(x) {
				return x;
			},
					
			prime: function(x) {
				return 1;
			}
		},
		signoid: {
			value: function(x) {
				return 1 / (1 + Math.exp(-1 * x));
			},
					
			prime: function(x) {
				let v = this.value(x);
				return v * (1 - v);
			}
		},
		ReLU: {
			value: function(x) {
				return Math.max(0, x);
			},
					
			prime: function(x) {
				return (x >= 0)? 1: 0;
			}
		}
	},
		
	getActivator: function(name) {
		return this.availableActivators[name];
	}
}