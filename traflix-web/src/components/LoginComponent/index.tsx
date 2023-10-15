import React, { useState, useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import config from '../../config';
import eyeFill from '../../assets/images/eye-fill.svg';
import eyeSlashFill from '../../assets/images/eye-slash-fill.svg';
import traflixLogo from '../../assets/images/logo_traflix_tmp_color.svg';
import kakaoSymbol from '../../assets/images/kakao_symbol.svg';

const LoginComponent = () => {
  const {
    screenClass,
    isLogin,
    nickname,
    login,
    handleSignupShow,
    handleLoginClose,
  } = useRootData(({ appStore, authStore, signupModal, loginModal }) => ({
    screenClass: appStore.screenClass.get(),
    isLogin: authStore.isLogin.get(),
    login: authStore.login,
    nickname: authStore.userNickname.get(),
    handleSignupShow: signupModal.handleSignupShow,
    handleLoginClose: loginModal.handleLoginClose,
  }));

  const navigate = useNavigate();
  const isDesktop = screenClass === 'xl';

  const [loginErr, setLoginErr] = useState({ handle: false, text: '' });

  const [usrID, setUsrID] = useState('');
  const inputID = (event: any) => {
    setLoginErr({ handle: false, text: '' });
    setUsrID(event.currentTarget.value);
  };

  const [usrPW, setUsrPW] = useState('');
  const inputPW = (event: any) => {
    setLoginErr({ handle: false, text: '' });
    setUsrPW(event.currentTarget.value);
  };

  const [showPW, setShowPW] = useState(false);

  const goToSignup = () => {
    handleLoginClose();
    handleSignupShow();
  };

  const tryLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) return;

    if (!usrID || !usrPW) {
      setLoginErr({
        handle: true,
        text: `${!usrID ? '아이디' : '비밀번호'}를 입력해주세요`,
      });
      return;
    }

    setLoginErr({ handle: false, text: '' });

    if (await login(null, usrID, usrPW)) {
      alert(`환영합니다`);
      handleLoginClose();
    } else
      setLoginErr({ handle: true, text: '올바르지 않은 아이디 혹은 비밀번호' });
  };

  const REST_API_KEY = config.kakaoRestApi;
  const REDIRECT_URI = config.baseUrl + config.redirectPath;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const tryKakaoLogin = async () => {
    const location = window.location.pathname;
    window.sessionStorage.setItem('url', location);
    window.location.href = kakaoURL;
  };

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.main}>
      <img src={traflixLogo} className={styles.logo} />
      <h2>로그인</h2>
      <Form onSubmit={(e) => tryLogin(e)} className={styles.form}>
        <div className={styles.title}></div>
        <Form.Group className="mb-3" controlId="formID">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="text"
            placeholder="이메일 주소"
            value={usrID}
            onChange={(e) => inputID(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPW">
          <Form.Label>비밀번호</Form.Label>
          <InputGroup className={styles.groupInput}>
            <Form.Control
              type={showPW ? 'text' : 'password'}
              placeholder="비밀번호"
              value={usrPW}
              onChange={(e) => inputPW(e)}
              className={styles.nonBorder}
            />
            <img
              src={showPW ? eyeSlashFill : eyeFill}
              onClick={() => setShowPW(!showPW)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAuto">
          {loginErr.handle && (
            <Form.Text className={styles.errMessage}>{loginErr.text}</Form.Text>
          )}
        </Form.Group>
        <Button variant="success" type="submit" className={styles.formButton}>
          로그인
        </Button>
      </Form>
      <Button className={styles.kakaoButton} onClick={tryKakaoLogin}>
        <img src={kakaoSymbol} className={styles.kakaoSymbol} />
        Login with Kakao
      </Button>
      <div className={styles.signUpLink}>
        계정이 없으신가요?
        <span onClick={goToSignup}>회원가입</span>
      </div>
    </div>
  );
};

export default LoginComponent;
