import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route, browserHistory} from 'react-router'
import configureStore from './../store/configureStore';
import Page1 from './page1';
import Page2 from './page2';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Page1}/>
            <Route path="/test" component={Page2}/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
