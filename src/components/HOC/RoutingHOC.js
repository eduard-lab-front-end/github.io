import { Navigate } from "react-router-dom";
import { AppRoutes } from "../routing/AppRoutes";

export const PublicRoute = ({authUser, Component, ...props}) => {
    return authUser === null
        ? <Component {...props}/>
        : <Navigate to={AppRoutes.MAIN}/>
}

export const PrivateRoute = ({authUser, Component, ...props}) => {
    return authUser?.user?.uid
        ? <Component {...props}/>
        : <Navigate to={AppRoutes.MAIN}/>
}