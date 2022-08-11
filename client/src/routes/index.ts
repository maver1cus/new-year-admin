import { ComponentType } from 'react';
import Login from '../pages/Login';
import Products from '../pages/Products';

export interface IRoute {
  path: string;
  component: ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = '/login',
  PRODUCTS = '/',
}

export const publicRoutes: IRoute[] = [{ path: RouteNames.LOGIN, exact: true, component: Login }];

export const privateRoutes: IRoute[] = [{ path: RouteNames.PRODUCTS, exact: true, component: Products }];
