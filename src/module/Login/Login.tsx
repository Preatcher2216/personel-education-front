import * as Styled from './styled';
import { Text } from '@gravity-ui/uikit';
import { Button } from '@gravity-ui/uikit';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api';
import { authAtom, userAtom } from '../../data/user';
import { useAtom } from '@reatom/npm-react';

export const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [, setUser] = useAtom(userAtom);
  const [, setAuth] = useAtom(authAtom);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await loginUser(login, password);
      setUser(res);
      setAuth(true);
      navigate('/personell/dashboard');
    } catch {
      setError('Неверный логин или пароль, попробуйте еще раз');
    }
  };

  return (
    <Styled.Center>
      <Styled.Wrapper>
        <Text variant='header-1'>Войти в систему</Text>
        <Styled.InputWrapper
          size='m'
          placeholder='Логин'
          onChange={(e) => setLogin(e.target.value)}
          type='text'
          validationState={error ? 'invalid' : undefined}
        />
        <Styled.InputWrapper
          size='m'
          placeholder='Пароль'
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          errorMessage={error}
          validationState={error ? 'invalid' : undefined}
        />
        <Button view='outlined' size='xl' onClick={handleSubmit}>
          Войти
        </Button>
      </Styled.Wrapper>
    </Styled.Center>
  );
};
