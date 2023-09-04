import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

import { loginUser } from 'redux/slice/userSlice'

import * as S from './style';

import { TrySignin } from 'apis/UserAPIs';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });
    const formRef = useRef(null);

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const handleCheck = async (e) => {
        e.preventDefault();

        // 예외 처리 & 유효성 검사
        if (!!!inputs.username || !!!inputs.password) {
            alert("아이디 혹은 비밀번호를 입력해주세요.");
            return;
        }

        // 로그인
        const result = await TrySignin(inputs.username, inputs.password);

        // // 사용자 정보 저장
        dispatch(loginUser({
            accessToken: result.access_token,
            refreshToken: result.refresh_token,
        }));

        // // 페이지 이동
        navigate('/');
    }

    return (
        <S.Wrapper>
            <S.Header>
                <h1>On Premiser</h1>
            </S.Header>
            <main>
                <section>
                    <S.SectionHeader>
                        <h2>회원정보 입력 영역</h2>
                    </S.SectionHeader>
                    <S.Form action='/api/user/signin' method='post' ref={formRef}>
                        <label
                            htmlFor='username'>
                            아이디
                        </label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            onChange={handleChange}
                            value={inputs.username}
                            placeholder='아이디를 입력해주세요.' />
                        <label
                            htmlFor='password'>
                            비밀번호
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={handleChange}
                            value={inputs.password}
                            placeholder='비밀번호를 입력해주세요.' />
                        <S.TextWrapper>
                            <S.SignupText>Don't have an account?</S.SignupText>
                            <S.SignupLink to='/signup'>Click here!</S.SignupLink>
                        </S.TextWrapper>
                        <S.FormButton
                            onClick={handleCheck}>
                            <span>Sign in</span>
                        </S.FormButton>
                    </S.Form>
                </section>
            </main>
            <footer></footer>
        </S.Wrapper>
    )
}