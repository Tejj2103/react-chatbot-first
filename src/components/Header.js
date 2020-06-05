import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav>
            <div className="nav-wrapper #ffa000 amber darken-2">
                <Link to={'/'} className='brand-logo'>D BOT</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li> <Link to={'/Shop'}>Shop</Link></li>
                    <li> <Link to={'/About'}>About us</Link></li>
                </ul>
            </div >
        </nav>
    )
}

export default Header;
