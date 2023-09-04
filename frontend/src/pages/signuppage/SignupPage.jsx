import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';

import * as S from './style';

import { TrySignup } from 'apis/UserAPIs';

export default function SignupPage() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        id: "",
        password: "",
        password_confirm: "",
        token: "",
    });

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const handleCheck = async (e) => {
        e.preventDefault();

        // 예외 처리 & 유효성 검사
        if (!!!inputs.id || !!!inputs.password) {
            alert("아이디 혹은 비밀번호를 입력해주세요.");
            return;
        }

        if (inputs.password !== inputs.password_confirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        const result = await TrySignup(inputs.id, inputs.password, inputs.token);

        if (!result) {
            navigate('/login');
        } else {
            alert(result.detail);
        }
    }

    return (
        <S.Wrapper>
            <S.Header>
                <Link to='/login'>
                    <h1>On Premiser</h1>
                </Link>
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
                            value={inputs.password}
                            placeholder='비밀번호를 입력해주세요.' />
                        <label
                            htmlFor='password_confirm'>
                            비밀번호 확인
                        </label>
                        <input
                            type='password'
                            id='password_confirm'
                            name='password_confirm'
                            onChange={handleChange}
                            value={inputs.password_confirm}
                            placeholder='비밀번호를 다시 입력해주세요.' />
                        <label
                            htmlFor='password_confirm'>
                            토큰 확인
                        </label>
                        <input
                            type='password'
                            id='token'
                            name='token'
                            onChange={handleChange}
                            value={inputs.token}
                            placeholder='토큰을 입력해주세요.' />
                        <S.FormButton
                            onClick={handleCheck}>
                            <span>Sign up</span>
                        </S.FormButton>
                    </S.Form>
                </section>
            </main>
            <footer></footer>
        </S.Wrapper>
    )
}