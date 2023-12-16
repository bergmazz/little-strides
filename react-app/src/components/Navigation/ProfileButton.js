import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import smiley from './smiley.png';
import "./Profile.css"

function ProfileButton ( { user } ) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const ulRef = useRef();

  const openMenu = () => {
    if ( showMenu ) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch( logout() );
    setShowMenu( false );
    history.push( "/" );
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      {/* <button onClick={openMenu}>
       <i className="fas fa-user-circle" />
      </button> */}
      <img src={ smiley } alt="smiley face" onClick={ openMenu } className="happy-user" />
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            {/* <li>{user.username}</li>
            <li>{ user.email }</li> */}
            <li className="name">Hello, { user.username }!</li>
            <li className="user-link">
              <NavLink to="/user#manage" className="orange-text" onClick={ closeMenu }>My Routines</NavLink>
            </li>
            <li className="progress-link">
              <NavLink to="/user#progress" className="blue-text" onClick={ closeMenu }>My Progress</NavLink>
            </li>
            <li className="community-link">
              <NavLink to="/community" className="yellow-text" onClick={ closeMenu }>My Community</NavLink>
            </li>
            <li>
              <button className="logout-button" onClick={ handleLogout }>Sign Out</button>
            </li>
          </>
        ) : (
            <div className="logged-out">
              <OpenModalButton

              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </div>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
