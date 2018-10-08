import { ann } from '../src/ann/ann';
import { config } from '../src/ann/network/config';
import { node } from '../src/ann/network/network';

it('nural network training Test', () => {

	let conf = new config(2, 1, [4], 'ReLU', 0.01);
	let nn = new ann().initiate(conf);
	
	let data = [];
	data.push([[0, 0], [0]]);
	data.push([[1, 1], [0]]);
	data.push([[0, 1], [1]]);
	data.push([[1, 0], [1]]);
	
	// Train the network
	for (let i = 0; i < 10000; i++) {
		for (let j = 0; j < data.length; j++) {
			nn.train(data[j]);
		}
	}
	
	// Validate the result
	let result = [];
	for (let i = 0; i < data.length; i++) {
		let r = nn.forward(data[i][0])[0];
		result.push([...data[i][0], ...[r]])
	}
	
	console.log(result);
});