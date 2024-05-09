import * as Styled from './styled';
import { Text } from '@gravity-ui/uikit';
import { Button } from '@gravity-ui/uikit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  console.log('login', login);
  console.log('password', password);

  const handleSubmit = () => {
    try {
      // api handle
      navigate('/dashboard');
    } catch {
      //handle api error
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
