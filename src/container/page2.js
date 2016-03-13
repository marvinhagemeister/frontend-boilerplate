import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Test from './../components/test';
import Header from './../components/header';
import * as actions from './../actions/actionCreators';

const Page2 = props => {
    return <div>
            <Header />
            <Test text={props.text} />
        </div>;
};

Page2.propTypes = {
    text: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return Object.assign({}, state, {
        text: state.app.test + ' PAGE 2'
    });
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Page2);
