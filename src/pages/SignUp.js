// LIBRARY
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// COMPONENTS
import Input from '../components/Input';
import Button from '../components/Button';

// REDUX
import { userActions } from '../redux/modules/user';

// STYLE
import '../style/scss/sign.scss';

const SignUp = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');

  const signUp = (event) => {
    event.preventDefault();

    if (!(id && name && pwd && pwdCheck) || pwd !== pwdCheck) return;

    dispatch(userActions.signUpFB(id, pwd, name));
  };

  return (
    <section className="section section--sign">
      <form className="container" onSubmit={signUp}>
        <h2 className="title">회원가입</h2>

        <Input
          placeholder={'아이디를 입력해주세요.'}
          type="email"
          value={id}
          changeEvent={(event) => {
            setId(event.target.value);
          }}
        />

        <Input
          placeholder={'닉네임을 입력해주세요.'}
          value={name}
          changeEvent={(event) => {
            setName(event.target.value);
          }}
        />

        <Input
          placeholder={'비밀번호를 입력해주세요.'}
          type="password"
          value={pwd}
          changeEvent={(event) => {
            setPwd(event.target.value);
          }}
        />

        <Input
          placeholder={'비밀번호를 입력해주세요.'}
          type="password"
          value={pwdCheck}
          changeEvent={(event) => {
            setPwdCheck(event.target.value);
          }}
        />

        <Button type={'submit'}>회원가입</Button>
      </form>
    </section>
  );
};

SignUp.defaultProps = {};

export default SignUp;
