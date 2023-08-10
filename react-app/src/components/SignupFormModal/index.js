import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [ errors, setErrors ] = useState( [] );
	const [ profilePic, setProfilePic ] = useState( "" );
	const { closeModal } = useModal();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if ( password === confirmPassword ) {
			if ( profilePic === "" ) {
				setProfilePic( "https://media.istockphoto.com/id/1343130293/photo/happy-smiley-face-emoticon-on-white-background.jpg" )
			}
			const data = await dispatch( signUp( username, email, password ) );
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<>
			<h1>Sign Up</h1>
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
						type="text"
						placeholder="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					<input
						type="password"
						value={ password }
						placeholder="pasword"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					<input
						type="password"
						placeholder=" confirm pasword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{/* <label>
					<input
						type="text"
						value={ profilePic }
						placeholder="url for profile pic (optional)"
						onChange={ ( e ) => setProfilePic( e.target.value ) }
						required
					/>
				</label> */}
				<button type="submit">Sign Up</button>
			</form>
		</>
	);
}

export default SignupFormModal;
