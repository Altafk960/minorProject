import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = (props) => {

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login"></Navigate>
    }
    return props.children;

}

export default Protected;