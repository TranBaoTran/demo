import { Navigate, useLocation } from "react-router-dom";
import { getToken } from "../api/axiosClient";

const AuthGuard = ({children}) => {
    const isAuthenticated = getToken();
    const location = useLocation();

    return isAuthenticated ? 
    (children) : (
        <Navigate to='/login' state={{from : location}} replace/>
    )
}

export default AuthGuard;