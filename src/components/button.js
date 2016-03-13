import React, {PropTypes} from 'react';

const Button = props => {
    return <button onClick={props.onClick}>Button</button>;
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default Button;
