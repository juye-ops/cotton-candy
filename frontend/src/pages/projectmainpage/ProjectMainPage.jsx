import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import * as S from './style';

import { GetProjectList, GenerateProject } from "apis/ProjectAPIs";

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
        const getProjectList = async () => {
            const result = await GetProjectList();

            setProjectList(result);
        }

        getProjectList();
    }, []);

    // 프로젝트 모달
    const [clickedProjectModal, setClickedProjectModal] = useState("");

    // 프로젝트 생성 모달
    const [inputs, setInputs] = useState({
        generateName: "",
        generateDesc: "",
    })
    const [generate, setGenerate] = useState(false);

    const onChangeInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })
    }

    const onClickModalOn = () => {
        setGenerate(true);
    }

    const onClickModalOff = (e) => {
        setGenerate(false);
        setInputs({
            generateName: "",
            generateDesc: "",
        });
    }

    const onClickModalForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onClickGenerate = () => {
        const generateProject = async () => {
            const result = await GenerateProject({
                user_name: user.id,
                name: inputs.generateName,
                description: inputs.generateDesc,
            });

            if (result === 200) {
                window.location.replace("/")
            } else {
                alert("프로젝트 생성 중 문제 발생!");
            }
        }

        generateProject();
    }

    return (
        <S.Wrapper>
            <S.Header>
                <h1>COTTON CANDY</h1>
            </S.Header>
            <S.Section>
                <S.SectionHeader>
                    <S.SectionHeaderWrapper>
                        <h2>Projects</h2>
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
                            <S.CreateProjectWrapper>
                                <S.CreateProjectButton onClick={onClickModalOn}>
                                    <i className="fas fa-plus"></i>
                                    <span>New Project</span>
                                </S.CreateProjectButton>
                            </S.CreateProjectWrapper>
                        </li>
                    </S.ProjectList>
                }
                {/* <S.ModalWrapper>
                    <S.ModalForm>
                        <label htmlFor="generateName">Project Name</label>
                        <input type="text" id="generateName" placeholder="프로젝트 이름을 입력해주세요." />
                        <label htmlFor="generateName">Project Description</label>
                        <input type="text" id="generateDesc" placeholder="프로젝트 설명을 입력해주세요." />
                        <S.ButtonWrapper>
                            <S.ConfirmButton>Create</S.ConfirmButton>
                            <S.CancelButton>Cancel</S.CancelButton>
                        </S.ButtonWrapper>
                    </S.ModalForm>
                </S.ModalWrapper> */}
                <S.ModalWrapper visible={generate} onClick={onClickModalOff}>
                    <S.ModalForm onClick={onClickModalForm}>
                        <label htmlFor="generateName">Project Name</label>
                        <input type="text" id="generateName" placeholder="프로젝트 이름을 입력해주세요." onChange={onChangeInput} value={inputs.generateName} />
                        <label htmlFor="generateDesc">Project Description</label>
                        <textarea id="generateDesc" placeholder="프로젝트 설명을 입력해주세요." onChange={onChangeInput} value={inputs.generateDesc} />
                        <S.ButtonWrapper>
                            <S.ConfirmButton onClick={onClickGenerate}>Create</S.ConfirmButton>
                            <S.CancelButton onClick={onClickModalOff}>Cancel</S.CancelButton>
                        </S.ButtonWrapper>
                    </S.ModalForm>
                </S.ModalWrapper>
            </S.Section>
        </S.Wrapper>
    )
}