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
  const { closeModal } = useModal();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ errors, setErrors ] = useState( [] );

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
    <div className="login">
      <div className="hi">
        <h2>Hello there!</h2>
        <h2>Welcome back.</h2>
      </div>
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
            placeholder="enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="blue" type="submit">Log In</button>
        <button className="orange" type="button" onClick={ handleDemoUserLogin }>Try out Demo User</button>
        {/* <button className="yellow"> */ }
        <OpenModalButton
          onItemClick={ closeModal }
          buttonText={ "I'm new here" }
          // style={ { color: '#E3A72F' } }
          modalComponent={ <SignupFormModal /> }
        />
        {/* I'm new here */ }
        {/* </button> */ }

      </form>
    </div>
  );
}

export default LoginFormModal;
