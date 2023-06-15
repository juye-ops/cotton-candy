import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { loginUser } from 'redux/slice/userSlice'
import styled from 'styled-components'

import { useSelector } from "react-redux";

import IROnly from 'styles/IROnly'

const HomePageHeader = styled.header`
    display: flex;
    justify-content: center;
`

const LoginSectionHeader = styled.header`
    ${IROnly}
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`

export default function HomePage() {
    

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

        // 회원가입 검증 처리
        // inputRef 사용

        dispatch(loginUser({
            id: "test",
        }));

        navigate('/manage');
    }

    const user = useSelector(state => state.user);
    console.log(user);

    return (
        <>
            <HomePageHeader>
                <h1>COTTON CANDY</h1>
            </HomePageHeader>
            <main>
                <section>
                    <LoginSectionHeader>
                        <h2>회원정보 입력 영역</h2>
                    </LoginSectionHeader>
                    <LoginForm>
                        <label
                            htmlFor='id'>
                            아이디
                        </label>
                        <input
                            type='text'
                            id='id'
                            name='id'
                            onChange={handleChange}
                            ref={(element) => (inputRef.current[0] = element)} />
                        <label
                            htmlFor='password'>
                            비밀번호
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            onChange={handleChange}
                            ref={(element) => (inputRef.current[1] = element)} />
                        <button
                            onClick={handleCheck}>
                            로그인
                        </button>
                    </LoginForm>
                </section>
            </main>
            <footer></footer>
        </>
    )
}