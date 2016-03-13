import {SAMPLE_ACTION} from './../actions';

function sampleReducer(state = {
    test: false
}, action) {
    switch (action.type) {
        case SAMPLE_ACTION:
            return Object.assign({}, state, {
                test: action.test
            });
        default:
            return state;
    }
}

export default sampleReducer;
