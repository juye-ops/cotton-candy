import { useState } from 'react';
import * as S from './style';

import ConfirmButton from '../confirmbutton/ConfirmButton';

import PreventDefault from 'utils/PreventDefault';
import StopPropagation from 'utils/StopPropagation';

export default function DeleteButton({ props: { content, name, callback } }) {
    const [clicked, setClicked] = useState(false);

    const onClickWrapper = () => {
        setClicked(false);
    }

    const onClickModal = (e) => {
        PreventDefault(e);
        StopPropagation(e);
    }

    const onClickButton = () => {
        setClicked(true)
    }

    return (
        <S.DeleteButtonWrapper>
            <S.DeleteButton onClick={onClickButton}>{content}</S.DeleteButton>
            <S.DeleteModalWraper onClick={onClickWrapper} clicked={clicked}>
                <S.DeleteModal onClick={onClickModal}>
                    <p>{name}을(를) 삭제하시겠습니까?</p>
                    <S.ButtonWrapper>
                        <ConfirmButton  props={{ content: "Confirm", callback: callback }}/>
                        <S.DeleteButton onClick={onClickWrapper}>Reject</S.DeleteButton>
                    </S.ButtonWrapper>
                </S.DeleteModal>
            </S.DeleteModalWraper>
        </S.DeleteButtonWrapper>
    )
}

