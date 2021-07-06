// LIBRARY
import React from 'react';

// COMPONENTS
import Input from '../components/Input';
import Button from '../components/Button';

// STYLE
import '../style/scss/sign.scss';

const SignIn = (props) => {
  return (
    <section className="section section--sign">
      <div className="container">
        <form id="sign-in-form">
          <h2 className="title">로그인</h2>

          <Input placeholder={'아이디를 입력해주세요.'} />

          <Input placeholder={'비밀번호를 입력해주세요.'} type={'password'} />

          <Button disabled={true} type={'submit'}>
            로그인
          </Button>
        </form>

        <div className="sign-up">
          <Button>회원가입하기</Button>
        </div>
      </div>
    </section>
  );
};

SignIn.defaultProps = {};

export default SignIn;
