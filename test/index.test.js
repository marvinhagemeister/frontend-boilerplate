import {assert as t} from 'chai';
import {add} from '../src/add.js';

describe('Add', () => {
    it('should add numbers', () => {
        t.equal(add(2, 2), 4);
        t.equal(add(0, 2), 2);
        t.equal(add(0, -2), -2);
    });
});
