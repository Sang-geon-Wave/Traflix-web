import React, { useState, useEffect } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import config from '../../config';
import eyeFill from '../../assets/images/eye-fill.svg';
import eyeSlashFill from '../../assets/images/eye-slash-fill.svg';
import traflixLogo from '../../assets/images/logo_traflix_tmp_color.svg';
import kakaoSymbol from '../../assets/images/kakao_symbol.svg';

const LoginComponent = () => {
  const { screenClass, isLogin, refresh, login } = useRootData(
    ({ appStore, authStore }) => ({
      screenClass: appStore.screenClass.get(),
      isLogin: authStore.isLogin.get(),
      login: authStore.login,
      refresh: authStore.refresh,
    }),
  );

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  const navigate = useNavigate();
  const isDesktop = screenClass === 'xl';

  const [loginErrType, setLoginErrType] = useState('');
  const [loginErr, setLoginErr] = useState(false);

  const [usrID, setUsrID] = useState('');
  const inputID = (event: any) => {
    setLoginErr(false);
    setUsrID(event.currentTarget.value);
  };

  const [usrPW, setUsrPW] = useState('');
  const inputPW = (event: any) => {
    setLoginErr(false);
    setUsrPW(event.currentTarget.value);
  };

  const [showPW, setShowPW] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const tryLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) return;

    if (!usrID || !usrPW) {
      setLoginErrType(`${!usrID ? '아이디' : '비밀번호'}를 입력해주세요`);
      setLoginErr(true);
      return;
    }
    setLoginErr(false);

    if (await login(null, usrID, usrPW, autoLogin)) {
      alert(`환영합니다 ${usrID}님`);
      navigate('/');
    } else {
      setLoginErr(true);
      setLoginErrType('올바르지 않은 아이디 혹은 비밀번호');
    }
  };

  const REST_API_KEY = config.kakaoRestApi;
  const REDIRECT_URI = config.redirectUrl;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const tryKakaoLogin = async () => {
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
          <Form.Label>아이디</Form.Label>
          <Form.Control
            type="text"
            placeholder="아이디"
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
              src={showPW ? eyeFill : eyeSlashFill}
              onClick={() => setShowPW(!showPW)}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAuto">
          <Form.Check
            onChange={() => setAutoLogin(!autoLogin)}
            type="checkbox"
            label="자동 로그인"
            checked={autoLogin}
          />
          {loginErr && (
            <Form.Text className={styles.errMessage}>{loginErrType}</Form.Text>
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
      <div>
        계정이 없으신가요?
        <Link to="/mock" title="회원가입" className={styles.signUpLink}>
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LoginComponent;
