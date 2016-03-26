import test from 'ava';
import {add} from '../src/add.js';

test('Add() should add numbers', t => {
    t.is(add(2, 2), 4);
    t.is(add(0, 2), 2);
    t.is(add(0, -2), -2);
});
