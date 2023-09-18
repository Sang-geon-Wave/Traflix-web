import { useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import { useNavigate } from 'react-router-dom';

const Redirection = () => {
  const { login, handleLoginShow } = useRootData(
    ({ authStore, loginModal }) => ({
      login: authStore.login,
      handleLoginShow: loginModal.handleLoginShow,
    }),
  );

  const code = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  const success = () => {
    alert(`환영합니다`);
  };

  const fail = () => {
    alert(`로그인 실패`);
    handleLoginShow();
  };

  useEffect(() => {
    async function tryLogin() {
      const data = await login(code);
      if (data) success();
      else fail();
    }
    tryLogin();
    navigate('/');
  }, []);

  return <div>로그인 중입니다.</div>;
};

export default Redirection;
