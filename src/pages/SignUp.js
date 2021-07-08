// LIBRARY
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// COMPONENTS
import Input from '../components/Input';
import Button from '../components/Button';

// REDUX
import { userActions } from '../redux/modules/user';

// FUNCTION
import { isEmailValidation, isPwdValidation } from '../common/validation';

// STYLE
import '../style/scss/sign.scss';

const SignUp = (props) => {
  const dispatch = useDispatch();

  const [isEmail, setIsEmail] = useState(true);
  const [isPwd, setisPwd] = useState(true);
  const [isName, setIsName] = useState(true);
  const [checkPwd, setCheckPwd] = useState(true);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');

  const signUp = (event) => {
    event.preventDefault();

    if (!(isEmail && name && isPwd && checkPwd)) return;

    dispatch(userActions.signUpFB(id, pwd, name));
  };

  const checkEmailVali = () => {
    setIsEmail(isEmailValidation(id));

    if (!isEmail) return;
  };

  const checkPwdVali = () => {
    setisPwd(isPwdValidation(pwd));

    if (!isPwd) return;
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
          blurEvent={checkEmailVali}
          isVali={isEmail}
          status="이메일 형식에 맞지 않습니다."
        />

        <Input
          placeholder={'닉네임을 입력해주세요.'}
          value={name}
          changeEvent={(event) => {
            setName(event.target.value);
          }}
          isVali={isName}
          blurEvent={() => {
            setIsName(Boolean(name));
          }}
          status="닉네임을 입력해주세요."
        />

        <Input
          placeholder={'비밀번호를 입력해주세요.'}
          type="password"
          value={pwd}
          changeEvent={(event) => {
            setPwd(event.target.value);
          }}
          isVali={isPwd}
          blurEvent={checkPwdVali}
          status="비밀번호는 8~16 사이의 글자로 영어, 숫자, 특수문자를 포함해야 합니다."
        />

        <Input
          placeholder={'비밀번호를 다시 입력해주세요.'}
          type="password"
          value={pwdCheck}
          isVali={checkPwd}
          blurEvent={() => {
            setCheckPwd(pwd === pwdCheck);
          }}
          changeEvent={(event) => {
            setPwdCheck(event.target.value);
          }}
          status="비밀번호가 일치하지 않습니다."
        />

        <Button type={'submit'}>회원가입</Button>
      </form>
    </section>
  );
};

SignUp.defaultProps = {};

export default SignUp;
