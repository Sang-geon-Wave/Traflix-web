import React, { useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
  const { kakaoLogin } = useRootData(({ authStore }) => ({
    kakaoLogin: authStore.kakaoLogin,
  }));

  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      kakaoLogin(code);
      navigate('/');
    } else alert('error');
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;
