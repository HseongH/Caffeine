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

// FUNCTION
import { isEmailValidation, isPwdValidation } from '../common/validation';

// STYLE
import '../style/scss/sign.scss';

const SignIn = (props) => {
  const dispatch = useDispatch();

  const [isEmail, setIsEmail] = useState(true);
  const [isPwd, setisPwd] = useState(true);

  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const logIn = (event) => {
    event.preventDefault();

    if (!(isEmail && isPwd)) return;

    dispatch(userActions.logInFB(id, pwd));
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
      <div className="container">
        <form id="sign-in-form" onSubmit={logIn}>
          <h2 className="title">로그인</h2>

          <Input
            placeholder={'이메일을 입력해주세요.'}
            type="email"
            value={id}
            changeEvent={(event) => setId(event.target.value)}
            blurEvent={checkEmailVali}
            isVali={isEmail}
            status="이메일 형식에 맞지 않습니다."
          />

          <Input
            placeholder={'비밀번호를 입력해주세요.'}
            type={'password'}
            value={pwd}
            isVali={isPwd}
            blurEvent={checkPwdVali}
            changeEvent={(event) => setPwd(event.target.value)}
            status="비밀번호는 8~16 사이의 글자로 영어, 숫자, 특수문자를 포함해야 합니다."
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
