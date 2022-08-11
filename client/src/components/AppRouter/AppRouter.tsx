import { Switch, Route, Redirect } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { privateRoutes, publicRoutes, RouteNames } from '../../routes';

const AppRouter = () => {
  const { isAuth } = useTypedSelector(state => state.auth);

  return isAuth ? (
    <Switch>
      {privateRoutes.map(({ path, component, exact }) => (
        <Route key={path} path={path} component={component} exact={exact} />
      ))}
      <Redirect to={RouteNames.PRODUCTS} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, component, exact }) => (
        <Route key={path} path={path} component={component} exact={exact} />
      ))}
      <Redirect to={RouteNames.LOGIN} />
    </Switch>
  );
};

export default AppRouter;
