import React from 'react';
import { Header } from 'antd/es/layout/layout';
import { Menu, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { RouteNames } from '../../routes';
import { useActions } from '../../hooks/useActions';

const NavBar = () => {
  const router = useHistory();
  const {
    isAuth,
    user: { login: username },
  } = useTypedSelector(state => state.auth);
  const { logout } = useActions();

  return (
    <Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div style={{ color: 'white' }}>{username}</div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item onClick={logout} key={1}>
                Выйти
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item onClick={() => router.push(RouteNames.LOGIN)} key={2}>
              Логин
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Header>
  );
};

export default NavBar;
