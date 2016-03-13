import React, {PropTypes} from 'react';

const Test = props => {
    return <div className="test">{props.text}</div>;
};

Test.propTypes = {
    text: PropTypes.string.isRequired
};

export default Test;
