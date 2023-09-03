import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

import { clearUser } from 'redux/slice/userSlice';

import { SignoutUser } from 'apis/UserAPIs';

import { UpdateAccess } from 'apis/TokenAPIs';

import * as S from './style';

export default function Header() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(user.accessToken);

    useEffect(() => {
        if (!user.refreshToken) {
            navigate('/login');
        }

        const checkRefresh = async () => {
            const result = await UpdateAccess(dispatch, user);

            if (result.detail) {
                dispatch(clearUser());
            }
        }

        checkRefresh();
    }, [user, navigate]);

    const onClickHeader = async () => {
        await SignoutUser(dispatch, user);
        dispatch(clearUser());
    }

    return (
        <S.HeaderWrapper>
            <S.Header>
                <Link to="/">
                    <h1>On Premiser</h1>
                </Link>
                <S.HeaderButton onClick={onClickHeader}>Sign out</S.HeaderButton>
            </S.Header>
        </S.HeaderWrapper>
    )
}