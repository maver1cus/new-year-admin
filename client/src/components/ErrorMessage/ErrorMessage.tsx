import React, { FC } from 'react';
import { Alert } from 'antd';

interface IProps {
  message: string;
}
const ErrorMessage: FC<IProps> = ({ message }) => {
  return <Alert message={message} type="error" closable />;
};

export default ErrorMessage;
