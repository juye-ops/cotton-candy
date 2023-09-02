import { useEffect, useState } from 'react';

import * as S from './style';

import PreventDefault from 'utils/PreventDefault';
import StopPropagation from 'utils/StopPropagation';
import { GetProjectContainers } from 'apis/ProjectAPIs';

export default function ProjectCard({ props: { project, clickedProjectModal, setClickedProjectModal, onClickModifyModalOn, onClickRemoveModal, setRemoveTarget } }) {
    const [clicked, setClicked] = useState(false);
    const [containers, setContainers] = useState(0);
    
    useEffect(() => {
        window.addEventListener("click", () => {
            setClicked(false);
        });

        return (() => {
            window.addEventListener("click", () => { });
        })
    }, []);

    useEffect(() => {
        if (clickedProjectModal === project.name) {
            return;
        }

        setClicked(false);
    }, [clickedProjectModal, project]);

    useEffect(() => {
        const getContainers = async () => {
            const result = await GetProjectContainers(project.name);

            setContainers(result);
        }

        getContainers();
    }, [project])

    const onClickButton = (e) => {
        PreventDefault(e);
        StopPropagation(e);

        setClicked(clicked => !clicked);
        setClickedProjectModal(e.currentTarget.querySelector('span:nth-child(2)').innerText);
    }

    return (
        <S.Section>
            <S.ModalHeader>
                <S.HeaderTextWrapper>
                    <S.ProjectName>{project.name}</S.ProjectName>
                    <S.ProjectDescription>{project.description}</S.ProjectDescription>
                </S.HeaderTextWrapper>
                <S.HeaderCountWrapper>
                    <S.ContainerCount>{containers}</S.ContainerCount>
                    <S.ContainerCountText>Containers</S.ContainerCountText>
                </S.HeaderCountWrapper>
            </S.ModalHeader>
            <S.ModalButtonWrapper>
                <S.ExecuteLink to={'/' + project.name}>Open</S.ExecuteLink>
                <S.MoreButtonWrapper>
                    <S.MoreButton onClick={onClickButton}>
                        <i className="fas fa-ellipsis-h"></i>
                        <span>{project.name}</span>
                        <span>more</span>
                    </S.MoreButton>
                    <S.MoreList clicked={clicked}>
                        <li>
                            <S.MoreListButton onClick={() => {onClickModifyModalOn(project.name, project.description)}}>
                                <i className="fas fa-cog"></i>
                                <span>프로젝트 설정</span>
                            </S.MoreListButton>
                        </li>
                        <li>
                            <S.MoreListButton onClick={() => {onClickRemoveModal(); setRemoveTarget(project.name);}}>
                                <i className="fas fa-trash-alt"></i>
                                <span>프로젝트 삭제하기</span>
                            </S.MoreListButton>
                        </li>
                    </S.MoreList>
                </S.MoreButtonWrapper>
            </S.ModalButtonWrapper>
        </S.Section>
    )
}
