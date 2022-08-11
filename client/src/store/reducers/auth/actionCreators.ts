import { AuthActionEnum, SetErrorAction, SetIsAuthAction, SetIsLoadingAction, SetUserAction } from './types';
import { IUser } from '../../../models/IUser';
import { AppDispatch } from '../../index';
import { Storage } from '../../../utils/storage';
import { ApiRoutes } from '../../../utils/constants';
import { $api } from '../../../api/api';
import { AxiosError } from 'axios';
import { UserRequestType } from '../../../types/user-request.type';

export const AuthActionCreators = {
  setUser: (user: IUser): SetUserAction => ({ type: AuthActionEnum.SET_USER, payload: user }),
  setIsAuth: (auth: boolean): SetIsAuthAction => ({ type: AuthActionEnum.SET_IS_AUTH, payload: auth }),
  setIsLoading: (loading: boolean): SetIsLoadingAction => ({ type: AuthActionEnum.SET_IS_LOADING, payload: loading }),
  setError: (error: string): SetErrorAction => ({ type: AuthActionEnum.SET_ERROR, payload: error }),
  login: (login: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      dispatch(AuthActionCreators.setError(''));
      const res = await $api.post<UserRequestType>(ApiRoutes.LOGIN, {
        login,
        password,
      });
      const { token, ...user } = res.data;
      Storage.setToken(token);
      dispatch(AuthActionCreators.setUser(user));
      dispatch(AuthActionCreators.setIsAuth(true));
    } catch (e) {
      if (e instanceof AxiosError && e.response) {
        dispatch(AuthActionCreators.setError(e.response.data.message));
      } else {
        dispatch(AuthActionCreators.setError('Ошибка'));
      }
    }
  },
  logout: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsAuth(false));
      dispatch(AuthActionCreators.setUser({} as IUser));
      Storage.setToken('');
    } catch (e) {
      dispatch(AuthActionCreators.setError('Произошла ошибка'));
    }
  },
  checkAuth: () => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const {
        data: { token, ...user },
      } = await $api.get<UserRequestType>(ApiRoutes.USER, {
        headers: {
          Authorization: `Bearer ${Storage.getToken()}`,
        },
      });

      Storage.setToken(token);
      dispatch(AuthActionCreators.setUser(user));
      dispatch(AuthActionCreators.setIsAuth(true));
    } catch (e) {
      dispatch(AuthActionCreators.setError('Произошла ошибка'));
    }
  },
};
