import {ann} from '../../src/ann/ann';
import {annConfig} from '../../src/ann/network/network';

it('ann forward Test', () => {
	let config = new annConfig(2, 1, [3, 3], 'linear');
	let nn = new ann().initiate(config);
	
	let data = [0, 0];
	let output = nn.forward(data);
	
	expect(output).toMatchObject([0]);	
});

it('ann training Test', () => {
	//linear, signoid, ReLU
	let config = new annConfig(2, 1, [4], 'ReLU', 0.1);
	let nn = new ann().initiate(config);
	
	let data = [];
	data.push([[0, 0], [0]]);
	data.push([[1, 1], [0]]);
	data.push([[0, 1], [1]]);
	data.push([[1, 0], [1]]);
	
	for (let i = 0; i < 1000; i++) {
		for (let j = 0; j < data.length; j++) {
			nn.train(data[j]);
		}
	}
	
	console.log(nn.nn.weights);
	
	for (let i = 0; i < data.length; i++) {
		console.log(nn.forward(data[i][0]));
	}

});