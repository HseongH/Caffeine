// LIBRARY
import React from 'react';

// COMPONENTS
import Input from '../components/Input';
import Button from '../components/Button';

// STYLE
import '../style/scss/sign.scss';

const SignUp = (props) => {
  return (
    <section className="section section--sign">
      <form className="container">
        <h2 className="title">회원가입</h2>

        <Input placeholder={'아이디를 입력해주세요.'} />

        <Input placeholder={'닉네임을 입력해주세요.'} />

        <Input placeholder={'비밀번호를 입력해주세요.'} type={'password'} />

        <Input placeholder={'비밀번호를 입력해주세요.'} type={'password'} />

        <Button disabled={true} type={'submit'}>
          회원가입
        </Button>
      </form>
    </section>
  );
};

SignUp.defaultProps = {};

export default SignUp;
