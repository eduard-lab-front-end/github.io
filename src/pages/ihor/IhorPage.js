import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import { AppRoutes, redirectRoutes } from "../../components/routing/AppRoutes";
import { useEffect } from "react";
import App from "../../App";

const IhorPage = () => {
    const {username} = useParams();
    const navigate = useNavigate();
    console.log(username)


    return (
        <>
            <h1>Ihor page</h1>
            <Link to={redirectRoutes.PHOTOS}>PHOTOS</Link>
            <br/>
            <Link to={`${redirectRoutes.IHOR}${AppRoutes.FRIENDS}`}>FRIENDS</Link>
            <Routes>
                <Route path={AppRoutes.PHOTOS} element={<h3>Photos</h3>}/>
                <Route path={AppRoutes.FRIENDS} element={<h3>Friends</h3>}/>
            </Routes>
        </>

    )
}

export default IhorPage;