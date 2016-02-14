import {expect} from 'chai';
import {add} from '../src/add.js';

describe('SampleTest', () => {
    it('should add numbers', () => {
        expect(add(2, 2)).to.equal(4);
    });
});