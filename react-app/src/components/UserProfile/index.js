import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
// import OpenModalButton from "../OpenModalButton";
import UserRoutines from "./";


function UserProfile () {
    const history = useHistory();
    const currentUser = useSelector( state => state.session.user )
    return (
        <div className="user">
            <UserRoutines{currentUser }></UserRoutines>
        </div>
    )
}

export default UserProfile;
