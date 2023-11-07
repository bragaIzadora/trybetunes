import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './loading';

function Login() {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validName = (name: string) => {
    const minimum = name.length >= 3;
    return minimum;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (validName(userName)) {
      try {
        await createUser({ name: userName });
        setLoading(false);
        navigate('/search');
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="login-name-input"
          value={ userName }
          onChange={ handleInputChange }
        />
        <button disabled={ !validName(userName) } data-testid="login-submit-button">
          Entrar
        </button>
        {loading && <Loading />}
      </form>
    </div>
  );
}

export default Login;
