import { useEffect, useState } from 'react';

import * as S from './style';
import PreventDefault from 'utils/PreventDefault';
import StopPropagation from 'utils/StopPropagation';
import { getContainerList } from 'apis/ManagePageAPIs';

export default function ManagePage() {
    // 컨테이너 리스트
    const [containerList, setContainerList] = useState([]);

    useEffect(() => {
        // 컨테이너 리스트 받아오기
        setContainerList(getContainerList());
    }, []);


    // 프로젝트 리스트
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        if (containerList.length === 0) {
            return;
        }

        const rst = [];

        containerList.forEach(container => {
            if (!rst.includes(container.project)) {
                rst.push(container.project);
            }
        })

        setProjectList(rst);
    }, [containerList]);


    // 현재 선택된 프로젝트
    const [selectedProject, setSelectedProject] = useState("");

    useEffect(() => {
        if (projectList.length === 0) {
            return;
        }

        setSelectedProject(projectList[0]);
    }, [projectList]);

    // 프로젝트 모달
    const [addProject, setAddProject] = useState(false);
    const [projectName, setProjectName] = useState("");

    const onClickProjectModalWrapper = () => {
        setAddProject(false);
    }

    const onClickProjectModalAdd = (e) => {
        setAddProject(true);
    }

    const onClickModal = (e) => {
        PreventDefault(e);
        StopPropagation(e);
    }

    const onChangeProjectName = (e) => {
        setProjectName(e.target.value);
    }

    const onClickProjectAdd = () => {
        setProjectList([...projectList, projectName]);
        setProjectName("");
        setAddProject(false);
    }

    // 컨테이너 모달
    const [clicked, setClicked] = useState({});

    useEffect(() => {
        const rst = {};

        containerList.forEach(container => rst[container.name] = false);

        window.addEventListener("click", () => {
            setClicked(rst);
        });

        setClicked(rst);

        return (() => {
            window.addEventListener("click", () => { });
        })
    }, [containerList]);

    const onClickButton = (e) => {
        PreventDefault(e);
        StopPropagation(e);

        const rst = {};

        containerList.forEach(container => rst[container.name] = false);
        rst[e.currentTarget.querySelector('span:nth-child(2)').innerText] = true;

        setClicked(rst);
    }

    // const generate = () => {

    //     // 데이터 읽어서 json 만들기

    //     // 애니메이션 띄우기

    //     // axios, fetch

    //     // 애니메이션 지우기

    // }

    return (
        <S.Wrapper>
            <S.Header>
                <h1>COTTON CANDY</h1>
            </S.Header>
            <main>
                <S.Section>
                    <S.SectionHeader>
                        <h2>All Projects</h2>
                    </S.SectionHeader>
                    <S.ProjectModalWrapper selected={addProject} onClick={onClickProjectModalWrapper}>
                        <S.ProjectModalForm action='' onClick={onClickModal}>
                            <label htmlFor="projectName">Insert Your Project Name</label>
                            <input type="text" name="projectName" id="projectName" onChange={onChangeProjectName} value={projectName} />
                            <button onClick={onClickProjectAdd}>Add Project</button>
                        </S.ProjectModalForm>
                    </S.ProjectModalWrapper>
                    {/* <S.ArticleList>
                            <li>
                                <S.ArticleButton>
                                    <i className="fas fa-sort"></i>
                                    <span>최근 수정 순</span>
                                </S.ArticleButton>
                            </li>
                        </S.ArticleList> */}

                    {
                        projectList.length !== 0
                            ?
                            <>
                                <S.ProjectList>
                                    {
                                        projectList.map((project, index) => {
                                            return (
                                                <li key={"" + index + project}>
                                                    <S.ProjectListButton selectedProject={project === selectedProject} onClick={() => setSelectedProject(project)}>
                                                        {project}
                                                    </S.ProjectListButton>
                                                </li>
                                            );
                                        })
                                    }
                                    <li>
                                        <S.ProjectAddButton onClick={onClickProjectModalAdd}>
                                            <i className="fas fa-plus"></i>
                                            <span>add project</span>
                                        </S.ProjectAddButton>
                                    </li>
                                </S.ProjectList>
                                <S.ContainerList>
                                    {
                                        containerList.filter(container => container.project === selectedProject).map((container, index) => {
                                            return (
                                                <li key={"" + index + container}>
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
                                                                <S.MoreList clicked={clicked[container.name]}>
                                                                    <li>
                                                                        <S.MoreListLink to="/modify" state={{ container: container }}>
                                                                            <i className="fas fa-cog"></i>
                                                                            <span>컨테이너 설정</span>
                                                                        </S.MoreListLink>
                                                                    </li>
                                                                    <li>
                                                                        <S.MoreListButton>
                                                                            <i className="fas fa-trash-alt"></i>
                                                                            <span>컨테이너 삭제하기</span>
                                                                        </S.MoreListButton>
                                                                    </li>
                                                                </S.MoreList>
                                                            </S.MoreButtonWrapper>
                                                        </S.ContainerHeader>
                                                        <S.SoftwareWrapper>
                                                            <p>{container.build.os.name}</p>
                                                            <p>{container.build.platforms[0].name}</p>
                                                        </S.SoftwareWrapper>
                                                        <p>test desc</p>
                                                        <S.ExecuteLink to={'/container/' + container.name} state={{containerName: container.name}} >
                                                            <i className="fa-solid fa-play"></i>
                                                            <span>실행</span>
                                                        </S.ExecuteLink>
                                                    </S.Container>
                                                </li>
                                            )
                                        })
                                    }
                                    <li>
                                        <S.CreateContainerLink to="/setting" state={{ project: selectedProject }}>
                                            <i className="fas fa-plus"></i>
                                            <span>New Container</span>
                                        </S.CreateContainerLink>
                                    </li>
                                </S.ContainerList>
                            </>
                            :
                            <S.ProjectEmptyButton onClick={onClickProjectModalAdd}>
                                <i className="fas fa-plus"></i>
                                <span>There is no project. Click here to create new project!</span>
                            </S.ProjectEmptyButton>
                    }
                </S.Section>
            </main>
            <footer></footer>
        </S.Wrapper>
    )
}