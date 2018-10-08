import { internalOperations } from './internalOperations';
import { activatorFactory } from '../activations/activatorFactory';

export const networkOperator = {
		
	forward: function(nn, input) {
		let config = nn.config;
		let layers = nn.layers;
		let weights = nn.weights;
		let activator = activatorFactory.getActivator(config.activatorName);
		
		internalOperations.applyInput(layers[0], input);
		
		for (let i = 0; i < weights.length; i++) {
			internalOperations.applyWeight(layers[i], weights[i], layers[i + 1], activator);
		}
		
		return nn.getOutput();
	},
	
	backward: function(nn, diff) {
		let config = nn.config;
		let layers = nn.layers;
		let weights = nn.weights;
		let activator = activatorFactory.getActivator(config.activatorName);
		
		internalOperations.applyDiff(layers[layers.length - 1], diff, activator);
		for (let i = layers.length - 1; i > 0; i--) {
			internalOperations.applyGradient(layers[i - 1], weights[i - 1], layers[i],
					activator, config.learningRate);
		}
	},
	
	train: function(nn, data) {
		let input = data[0];
		let desired = data[1];
		
		let diff = internalOperations.getDiff(this.forward(nn, input), desired)
		this.backward(nn, diff);
		
		return diff;
	}
}