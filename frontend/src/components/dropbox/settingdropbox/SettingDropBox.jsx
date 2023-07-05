import { useEffect, useState } from 'react';
import * as S from './style';

import PreventDefault from 'utils/PreventDefault';
import StopPropagation from 'utils/StopPropagation';

export default function SettingDropBox({ props: { list, target, callback } }) {
    const [clicked, setClicked] = useState(false);

    // 드랍다운 버튼 클릭
    const onClickButton = (e) => {
        PreventDefault(e);
        StopPropagation(e);
        
        setClicked(!clicked);
    }

    window.addEventListener("click", () => {
        setClicked(false);
    })

    // 리스트 버튼 클릭
    const onClickListButton = (e) => {
        PreventDefault(e);
        
        callback(e.currentTarget.querySelector('span').innerText);
    }

    useEffect(() => {
        setClicked(false);
    }, [target]);

    return (
        <S.Wrapper>
            <S.Button clicked={clicked} onClick={onClickButton}>
                <span>{target}</span>
            </S.Button>
            <S.List clicked={clicked} onClick={StopPropagation}>
                {
                    list.map(item => {
                        return (
                            <S.ListItem key={item}>
                                <S.ListButton onClick={onClickListButton}>
                                    <span>{item}</span>
                                </S.ListButton>
                            </S.ListItem>
                        )
                    })
                }
            </S.List>
        </S.Wrapper>
    )
}
