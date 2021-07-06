// LIBRARY
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// COMPONENTS
import Input from '../components/Input';
import Button from '../components/Button';

// HISTORY
import { history } from '../redux/configStore';

// REDUX
import { userActions } from '../redux/modules/user';

// STYLE
import '../style/scss/sign.scss';

const SignIn = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const logIn = (event) => {
    event.preventDefault();

    if (!(id && pwd)) return;

    dispatch(userActions.logInFB(id, pwd));
  };

  return (
    <section className="section section--sign">
      <div className="container">
        <form id="sign-in-form" onSubmit={logIn}>
          <h2 className="title">로그인</h2>

          <Input
            placeholder={'아이디를 입력해주세요.'}
            value={id}
            changeEvent={(event) => setId(event.target.value)}
          />

          <Input
            placeholder={'비밀번호를 입력해주세요.'}
            type={'password'}
            value={pwd}
            changeEvent={(event) => setPwd(event.target.value)}
          />

          <Button type={'submit'}>로그인</Button>
        </form>

        <div className="sign-up">
          <Button
            clickEvent={() => {
              history.push('/sign-up');
            }}
          >
            회원가입하기
          </Button>
        </div>
      </div>
    </section>
  );
};

SignIn.defaultProps = {};

export default SignIn;
