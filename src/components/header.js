import React from 'react';
import {Link} from 'react-router';

const Header = () => {
    return <div>
        <Link to="/">Page1</Link>
        <Link to="/test">Page2</Link>
    </div>;
};

export default Header;
