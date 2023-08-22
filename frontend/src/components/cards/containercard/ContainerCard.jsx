import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import * as S from './style';
import PreventDefault from 'utils/PreventDefault';
import StopPropagation from 'utils/StopPropagation';

export default function ContainerCard({ props: { container, clickedContainerModal, setClickedContainerModal, onClickRemoveModal, setRemoveTarget } }) {
    const { projectName } = useParams();
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        window.addEventListener("click", () => {
            setClicked(false);
        });

        return (() => {
            window.addEventListener("click", () => { });
        })
    }, []);

    useEffect(() => {
        if (clickedContainerModal === container.name) {
            return;
        }

        setClicked(false);
    }, [clickedContainerModal, container])

    const onClickButton = (e) => {
        PreventDefault(e);
        StopPropagation(e);

        setClicked(clicked => !clicked);
        setClickedContainerModal(e.currentTarget.querySelector('span:nth-child(2)').innerText);
    }

    return (
        <S.Container>
            <S.ContainerHeader>
                <S.ConatinerState>
                </S.ConatinerState>
                <h3>{container.name}</h3>
                <S.MoreButtonWrapper>
                    <S.MoreButton onClick={onClickButton}>
                        <i className="fas fa-ellipsis-h"></i>
                        <span>{container.name}</span>
                        <span>more</span>
                    </S.MoreButton>
                    <S.MoreList clicked={clicked}>
                        <li>
                            <S.MoreListLink to={"/" + projectName + "/" + container.name + "/modify"} state={{ container: container }}>
                                <i className="fas fa-cog"></i>
                                <span>컨테이너 설정</span>
                            </S.MoreListLink>
                        </li>
                        <li>
                            <S.MoreListButton onClick={() => { onClickRemoveModal(); setRemoveTarget(container.name); }}>
                                <i className="fas fa-trash-alt"></i>
                                <span>컨테이너 삭제하기</span>
                            </S.MoreListButton>
                        </li>
                    </S.MoreList>
                </S.MoreButtonWrapper>
            </S.ContainerHeader>
            <S.ContainerDesc>{container.description}</S.ContainerDesc>
            <S.ExecuteLink to={'/container/' + container.name} state={{ containerName: container.name }} >
                <i className="fa-solid fa-play"></i>
                <span>Execute</span>
            </S.ExecuteLink>
        </S.Container>
    )
}
