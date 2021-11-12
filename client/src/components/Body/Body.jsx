import { Switch, Route } from "react-router-dom";
import routes from "../../routes/routes";
import Login from "../../pages/login/Login";
import { useSelector } from 'react-redux';

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
                            component={
                                route.authRequired
                                    ? !isLoggedIn
                                        ? Login
                                        : route.main
                                    : route.main
                            }
                            exact={route.exact}
                        />
                    )
                })
            }
        </Switch>
    )
}

export default Body;