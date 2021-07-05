// LIBRARY
import React from 'react';

// COMPONENTS
import Layout from '../components/Layout';
import Heading from '../components/Title';
import Input from '../components/Input';

const SignUp = (props) => {
  return (
    <Layout isFlex={false} background={'#fff'}>
      <Heading fontSize={'22px'}>회원가입</Heading>

      <Input placeholder={'아이디를 입력해주세요.'} margin={'0 0 20px 0'} />

      <Input placeholder={'닉네임을 입력해주세요.'} margin={'0 0 20px 0'} />

      <Input placeholder={'비밀번호를 입력해주세요.'} type={'password'} margin={'0 0 20px 0'} />

      <Input placeholder={'비밀번호를 입력해주세요.'} type={'password'} />
    </Layout>
  );
};

SignUp.defaultProps = {};

export default SignUp;
