import {activatorFactory} from '../../../src/ann/activations/activatorFactory';

it('activatorFactory Test', () => {
	let linear = activatorFactory.getActivator('linear');
	expect(linear.value(0.5)).toEqual(0.5);
	expect(linear.prime(0.5)).toEqual(1);
	
	let signoid = activatorFactory.getActivator('signoid');
	expect(signoid.value(0)).toEqual(0.5);
	expect(signoid.prime(0)).toEqual(0.25);
});