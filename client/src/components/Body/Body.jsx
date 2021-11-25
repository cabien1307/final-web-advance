import { Switch, Route } from "react-router-dom";
import routes from "../../routes/routes";
import Login from "../../pages/login/Login";
import { useSelector } from 'react-redux';
import NotFound from "../../pages/notFound/not-found";

function Body() {
    const { isLoggedIn } = useSelector(state => state.auth)

    return (
        <Switch>
            {
                routes.map((route, index) => {
                    return (
                        // If logged && authRequired
                        //      next()
                        // else if authRequired
                        //      next('Home')
                        // else next('NotFound')
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                        >
                            {
                                route.authRequired
                                    ? !isLoggedIn
                                        ? <Login />
                                        : route.main
                                    : route.main
                            }
                        </Route>
                    )
                })
            }
            <Route component={NotFound} to="*"/>
        </Switch>
    )
}

export default Body;