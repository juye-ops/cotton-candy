import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from 'redux/slice/userSlice';

import * as S from './style';

export default function Header() {
    const dispatch = useDispatch();

    const onClickHeader = () => {
        dispatch(clearUser());
    }

    return (
        <S.HeaderWrapper>
            <S.Header>
                <Link to="/">
                    <h1>Cotton Candy</h1>
                </Link>
                <S.HeaderButton onClick={onClickHeader}>Sign out</S.HeaderButton>
            </S.Header>
        </S.HeaderWrapper>
    )
}