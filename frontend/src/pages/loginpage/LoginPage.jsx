import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { loginUser } from 'redux/slice/userSlice'

import * as S from './style';

import * as API from 'apis/HomePageAPIs';

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        id: "",
        password: "",
    });

    const inputRef = useRef([]);

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const handleCheck = (e) => {
        e.preventDefault();

        // 예외 처리 & 유효성 검사
        if (!!!inputs.id || !!!inputs.password) {
            alert("아이디 혹은 비밀번호를 입력해주세요.");
            return;
        }

        // 로그인
        API.trySignin(inputs.id, inputs.password);

        // 사용자 정보 저장
        dispatch(loginUser({
            id: inputs.id,
        }));

        // 페이지 이동
        navigate('/');
    }

    return (
        <S.Wrapper>
            <S.Header>
                <h1>Cotton Candy</h1>
            </S.Header>
            <main>
                <section>
                    <S.SectionHeader>
                        <h2>회원정보 입력 영역</h2>
                    </S.SectionHeader>
                    <S.Form>
                        <label
                            htmlFor='id'>
                            아이디
                        </label>
                        <input
                            type='text'
                            id='id'
                            name='id'
                            onChange={handleChange}
                            ref={(element) => (inputRef.current[0] = element)}
                            value={inputs.id}
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
                            ref={(element) => (inputRef.current[1] = element)}
                            value={inputs.password}
                            placeholder='비밀번호를 입력해주세요.' />
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