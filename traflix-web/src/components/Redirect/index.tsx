import React, { useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
  const { login } = useRootData(({ authStore }) => ({
    login: authStore.login,
  }));

  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      login(code);
      navigate('/login');
    } else alert('error');
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;
