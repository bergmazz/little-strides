import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import whiteLogo from './whiteLogo.png';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<nav>
			<NavLink exact to="/"><img className="white-logo" src={ whiteLogo } alt="logo to home" /></NavLink>
			{isLoaded && (
				<div>
					<ProfileButton user={ sessionUser } />
				</div>
			)}
		</nav>
	);
}

export default Navigation;
