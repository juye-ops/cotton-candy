import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router";

import * as S from './style';

import ProjectCard from "components/cards/projectcard/ProjectCard";

export default function ProjectMainPage() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) {
            navigate('/login');
        }
    }, [user, navigate]);

    // 프로젝트 리스트
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        // 프로젝트 리스트 받아오기
        setProjectList([{ name: "test_01", description: "test_desc" }, { name: "test_02", description: "test_desc" }]);
    }, []);

    // 프로젝트 모달
    const [clickedProjectModal, setClickedProjectModal] = useState("");

    return (
        <S.Wrapper>
            <S.Header>
                <h1>COTTON CANDY</h1>
            </S.Header>
            <S.Section>
                <S.SectionHeader>
                    <S.SectionHeaderWrapper>
                        <h2>All Projects</h2>
                    </S.SectionHeaderWrapper>
                </S.SectionHeader>
                {
                    <S.ProjectList>
                        {
                            projectList.length !== 0 && projectList.map((project, index) => {
                                return (
                                    <li key={"" + index + project}>
                                        <ProjectCard props={{ project, clickedProjectModal, setClickedProjectModal }} />
                                    </li>
                                )
                            })
                        }
                        <li>
                            <S.CreateProjectLink to="/project/setting">
                                <i className="fas fa-plus"></i>
                                <span>New Project</span>
                            </S.CreateProjectLink>
                        </li>
                    </S.ProjectList>
                }
            </S.Section>
        </S.Wrapper>
    )
}