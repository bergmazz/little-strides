import React from 'react';
import git from './github.svg';
import yellowLogo from './yellowLogo.png';
import './Footer.css';

function Footer () {
    return (
        <footer>
            <div className="footer">
                <div className="footer-left">
                    <img className="yellow-logo" src={ yellowLogo } alt="Logo" />
                    <p>Little by little, a little becomes a lot.</p> </div>
                <div className="footer-right">
                    <p>bergmazz</p>
                    <a
                        href="https://github.com/bergmazz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img className="git" src={ git } />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
