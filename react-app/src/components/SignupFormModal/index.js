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
		<div className="signup">
			<h2>Nice to Meet You!</h2>
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
				{ email.length > 300 ? (
					<p className={ "char-count-red" }>
						that's pretty long
					</p>
				) : (
					email.length > 3 && ( !email.includes( "@" ) || !email.includes( "." ) ) ? (
						<p className={ "char-count-red-email" }>
							hmm, that doesn't look like an email...... could I get an "@" and a "." in there?
						</p>
					) : (
						<div className={ "char-count" }>
							just to log in with
						</div>
					)
				) }
				<label>
					<input
						type="text"
						placeholder="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<div className={ username.length > 20 || username.length < 4 ? "char-count-red" : "char-count" }>
					{ username.length } / 20 characters
				</div>
				<label>
					<input
						type="password"
						value={ password }
						placeholder="pasword"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<div className={ password.length > 24 || password.length < 8 ? "char-count-red" : "char-count" }>
					{ password.length } / 24 characters
				</div>
				<label>
					<input
						type="password"
						placeholder=" confirm pasword"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				{ password !== confirmPassword &&
					<div className={ confirmPassword.length > 7 ? "char-count-red" : "char-count" }>
						not matching.... yet
					</div>
				}
				{ confirmPassword.length > 7 && password === confirmPassword &&
					<div className={ "char-count" }>
						we have a match!
					</div>
				}
				{/* <label>
					<input
						type="text"
						value={ profilePic }
						placeholder="url for profile pic (optional)"
						onChange={ ( e ) => setProfilePic( e.target.value ) }
					/>
				</label> */}
				<button disabled={
					password !== confirmPassword || password.length > 24 || password.length < 8 ||
					username.length > 20 || username.length < 4 || ( !email.includes( "@" ) || !email.includes( "." ) )
				} type="submit">Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
