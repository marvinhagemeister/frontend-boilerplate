"use strict";

// Necessary for webpack hmre
if (module.hot) {
    module.hot.accept();
}

// CSS
import './../assets/styles/main.scss';

import {add} from './add';

const t = 5;
add(2,t);