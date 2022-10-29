import './App.css';
import IhorPage from "./pages/ihor/IhorPage";
import { Routes, Route, Link } from "react-router-dom";
import { AppRoutes, redirectRoutes } from "./components/routing/AppRoutes";
import Login from "./pages/Login/Login";
import { PrivateRoute, PublicRoute } from "./components/HOC/RoutingHOC";

const App = () => {
    // const { REACT_APP_API } = process.env
    // console.log("REACT_APP_API", REACT_APP_API)
    const authUser = JSON.parse(localStorage.getItem("authUser"))
    console.log(authUser)
    return (
        <>
            <div>
                <h1>Navbar</h1>
                <Link to={AppRoutes.MAIN}>main</Link>
                <br/>
                <Link to={AppRoutes.DASHBOARD}>dashboard</Link>
                <Link to={redirectRoutes.IHOR}>Ihor</Link>
            </div>

            <Routes>
                <Route exact path={AppRoutes.MAIN} element={<h1>Home screen</h1>}/>
                <Route
                    exact path={AppRoutes.SIGN_IN}
                    element={<PublicRoute authUser={authUser} Component={Login} page="Sign In"/>}
                />
                <Route exact
                       path={AppRoutes.SIGN_UP}
                       element={<PublicRoute authUser={authUser} Component={Login} page="Sign Up"/>}
                />
                {/*<Route exact path={AppRoutes.MAIN} element={<h1>Home screen</h1>}/>*/}
                {/*<Route exact path={AppRoutes.DASHBOARD} element={<h1>Dashboard</h1>}/>*/}
                <Route
                    path={AppRoutes.IHOR}
                    element={ <PrivateRoute authUser={authUser} Component={IhorPage} />} exact />
                <Route path={AppRoutes.NOT_FOUND_PAGE}  element={<h1>404</h1>}/>
                <Route path="*" element={<h1>404</h1>}/>

            </Routes>
        </>
    );
}

export default App;
