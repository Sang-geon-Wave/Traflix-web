import React, { useState } from 'react';
import useRootData from '../../hooks/useRootData';
import stylesDesktopDefault from './DesktopDefault.module.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import eyeFill from '../../assets/images/eye-fill.svg';
import eyeSlashFill from '../../assets/images/eye-slash-fill.svg';
import traflixLogo from '../../assets/images/logo_traflix_tmp_color.svg';
import kakaoSymbol from '../../assets/images/kakao_symbol.svg';
import kakao from '../../assets/images/kakao_login_large_wide.png';

const LoginComponent = () => {
  const { screenClass } = useRootData(({ appStore }) => ({
    screenClass: appStore.screenClass.get(),
  }));
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

  const tryLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!usrID || !usrPW) {
      setLoginErrType(`${!usrID ? '아이디' : '비밀번호'}를 입력해주세요`);
      setLoginErr(true);
      return;
    }
    alert(
      `아이디: ${usrID} 비번: ${usrPW} 자동로그인: ${
        autoLogin ? '켜짐' : '꺼짐'
      }`,
    );
    setAutoLogin(false);
  };

  const kakaoLogin = async () => {
    alert('kakao');
  };

  const styles = isDesktop ? stylesDesktopDefault : stylesDesktopDefault;
  return (
    <div className={styles.main}>
      <img src={traflixLogo} className={styles.logo} />
      <h2>로그인</h2>
      <Form onSubmit={(e) => tryLogin(e)} className={styles.form}>
        <div className={styles.title}></div>
        <Form.Group className="mb-3" controlId="formID">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="ID"
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
      <Button className={styles.kakaoButton} onClick={kakaoLogin}>
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
