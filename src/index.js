"use strict";

// Necessary for webpack hmre
if (module.hot) {
    module.hot.accept();
}

import {add} from './add';

const t = 5;
add(2,t);