import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( "---------email", email )
    // console.log( "---------passwor", password )
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      history.push( "/user" );
        closeModal()
    }
  };

  const handleDemoUserLogin = async () => {
    // const demoUserCredentials = {
    //   email: "demo@aa.io",
    //   password: "password",
    // };
    const data = dispatch( login( 'demo@aa.io', 'password' ) );
    // const data = await dispatch( login( demoUserCredentials.email, demoUserCredentials.password ) );
    // if ( data ) {
    //   setErrors( data );
    // } else {
    history.push( "/user" );
    closeModal();
  };

  return (
    <>
      <h1>Hello there! Welcome back.</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          { errors.map( ( error, idx ) => {
            let parts = error.split( ":" );
            return <li key={ idx }>{ parts[ 1 ] }</li>;
          } ) }
        </ul>
        <label>
          <input
            type="text"
            value={ email }
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <button type="button" onClick={ handleDemoUserLogin }>Try out Demo User</button>
        <OpenModalButton
          buttonText="I'm new here"
          onItemClick={ closeModal }
          modalComponent={ <SignupFormModal /> }
        />
      </form>
    </>
  );
}

export default LoginFormModal;
