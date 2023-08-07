import { useEffect, useState } from 'react';
import * as S from './style';
import PreventDefault from 'utils/PreventDefault';
import StopPropagation from 'utils/StopPropagation';



export default function ProjectCard({ props: { project, clickedProjectModal, setClickedProjectModal } }) {
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
        if (clickedProjectModal === project.name) {
            return;
        }

        setClicked(false);
    }, [clickedProjectModal, project])

    const onClickButton = (e) => {
        PreventDefault(e);
        StopPropagation(e);

        setClicked(clicked => !clicked);
        setClickedProjectModal(e.currentTarget.querySelector('span:nth-child(2)').innerText);
    }

    return (
        <S.Project>
            <S.ProjectHeader>
                <h3>{project.name}</h3>
                <S.MoreButtonWrapper>
                    <S.MoreButton onClick={onClickButton}>
                        <i className="fas fa-ellipsis-h"></i>
                        <span>{project.name}</span>
                        <span>more</span>
                    </S.MoreButton>
                    <S.MoreList clicked={clicked}>
                        <li>
                            <S.MoreListLink to={"/" + project.name + "/modify"}>
                                <i className="fas fa-cog"></i>
                                <span>프로젝트 설정</span>
                            </S.MoreListLink>
                        </li>
                        <li>
                            <S.MoreListButton>
                                <i className="fas fa-trash-alt"></i>
                                <span>프로젝트 삭제하기</span>
                            </S.MoreListButton>
                        </li>
                    </S.MoreList>
                </S.MoreButtonWrapper>
            </S.ProjectHeader>
            <S.ProjectDescription>{project.description}</S.ProjectDescription>
            <S.ExecuteLink to={'/' + project.name}>
                <span>열기</span>
            </S.ExecuteLink>
        </S.Project>
    )
}
