import {ann} from '../../src/ann/ann';
import {node, annConfig} from '../../src/ann/network/network';

it('ann forward Test', () => {
	
	let config = new annConfig(2, 1, [3, 3], 'linear');
	let nn = new ann().initiate(config);
	
	let data = [0, 0];
	
	let layers = nn.nn.layers;
	for (let i = 0; i < layers.length - 1; i++) {
		let l = layers[i];
		l[l.length - 1] = new node();
	}
	
	let output = nn.forward(data);
	
	expect(output).toMatchObject([0]);	
});

it('ann training Test', () => {
	//linear, signoid, ReLU
	let config = new annConfig(2, 1, [4], 'ReLU', 0.01);
	let nn = new ann().initiate(config);
	
	let data = [];
	data.push([[0, 0], [0]]);
	data.push([[1, 1], [0]]);
	data.push([[0, 1], [1]]);
	data.push([[1, 0], [1]]);
	
	for (let i = 0; i < 10000; i++) {
		for (let j = 0; j < data.length; j++) {
			nn.train(data[j]);
		}
	}
	
	let result = [];
	for (let i = 0; i < data.length; i++) {
		result.push(parseFloat(nn.forward(data[i][0])).toFixed(2));
	}
	
	console.log(result);

});