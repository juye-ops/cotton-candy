import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

import { clearUser } from 'redux/slice/userSlice';

import { SignoutUser, GetUserName } from 'apis/UserAPIs';

// import { UpdateAccess } from 'apis/TokenAPIs';

import * as S from './style';

export default function Header() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.refreshToken) {
            navigate('/login');
        }
    }, [user, navigate]);

    // useEffect(() => {
    //     if (!user.refreshToken) {
    //         return;
    //     }

    //     const updateAccess = async () => {
    //         await UpdateAccess(dispatch, user.refreshToken);
    //     }

    //     updateAccess();
    // }, [user, dispatch]);

    // useEffect(() => {
    //     if (!user.refreshToken) {
    //         return;
    //     }

    //     const getUserName = async () => {
    //         const result = await GetUserName(user.accessToken);

    //         console.log(result);
    //     }

    //     getUserName();
    // }, [user, dispatch]);

    // console.log(user);

    const onClickHeader = async () => {
        await SignoutUser(user.accessToken);
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