import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import * as S from './style';

import { GetProjectList, GenerateProject, ModifyProject, DeleteProject } from "apis/ProjectAPIs";

import ProjectCard from "components/cards/projectcard/ProjectCard";
import ConfirmButton from "components/buttons/confirmbutton/ConfirmButton";

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
    const [generateValid, setGenerateValid] = useState("");

    const onChangeInput = (e) => {
        if (e.target.id === "generateName") {
            const reg = /[a-z,A-Z,\-,_,0-9]/g;
            const rst = e.target.value.replace(reg, '');

            setGenerateValid(!!rst ? "알파벳, 숫자, 하이픈(-), 언더바(_)만 입력해야 합니다!" : "");
        }

        setInputs({
            ...inputs,
            [e.target.id]: e.target.value,
        })
    }

    console.log(generateValid);

    const onClickModalOn = () => {
        setGenerate(true);
    }

    const onClickModalOff = () => {
        setGenerate(false);
        setGenerateValid("");
        setInputs({
            generateName: "",
            generateDesc: "",
        });
    }

    const onClickModalForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    // 생성 버튼
    const onClickGenerate = () => {
        if (!inputs.generateName) {
            alert('이름을 입력해주세요.');

            return;
        }

        if (generateValid) {
            alert('이름에는 알파벳, 숫자, 하이픈(-), 언더바(_)만 입력해야 합니다!');

            return;
        }

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

    // 프로젝트 수정 모달
    const [editInput, setEditInput] = useState({
        modifyName: "",
        modifyDescription: "",
    });
    const [modify, setModify] = useState(false);
    const [modifyTarget, setModifyTarget] = useState("");
    const [modifyValid, setModifyValid] = useState("");

    const onChangeModifyInput = (e) => {
        if (e.target.id === "modifyName") {
            const reg = /[a-z,A-Z,\-,_,0-9]/g;
            const rst = e.target.value.replace(reg, '');

            setModifyValid(!!rst ? "알파벳, 숫자, 하이픈(-), 언더바(_)만 입력해야 합니다!" : "");
        }

        setEditInput({
            ...editInput,
            [e.target.id]: e.target.value,
        })
    };

    const onClickModifyModalOn = (projectName, projectDescription) => {
        setEditInput({
            modifyName: projectName,
            modifyDescription: projectDescription,
        })
        setModifyTarget(projectName);
        setModify(true);
    };

    const onClickModifyModalOff = () => {
        setModify(false);
        setModifyValid("");
        setEditInput({
            modifyName: "",
            modifyDescription: "",
        });
    };

    // 수정 버튼
    const onClickModify = () => {
        if (!editInput.modifyName) {
            alert('이름을 입력해주세요.');

            return;
        }

        if (modifyValid) {
            alert('이름에는 알파벳, 숫자, 하이픈(-), 언더바(_)만 입력해야 합니다!');

            return;
        }

        const modifyProject = async () => {
            const result = await ModifyProject({
                old_name: modifyTarget,
                new_name: editInput.modifyName,
                description: editInput.modifyDescription,
            });

            if (result === 200) {
                window.location.replace("/")
            } else {
                alert("프로젝트 수정 중 문제 발생!");
            }
        }

        modifyProject();
    }

    // 삭제 모달
    const [remove, setRemove] = useState(false);
    const [removeTarget, setRemoveTarget] = useState("");

    const onClickRemoveModal = () => {
        setRemove(true);
    }

    const onClickRemoveModalOff = () => {
        setRemove(false);
    }

    const onClickRemove = () => {
        const removeProject = async () => {
            await DeleteProject(removeTarget);
            window.location.replace("/");
        }

        removeProject();
    }

    return (
        <S.Wrapper>
            <S.Section>
                <S.SectionHeader>
                    <S.SectionHeaderWrapper>
                        <h2>Projects</h2>
                    </S.SectionHeaderWrapper>
                </S.SectionHeader>
                <S.ProjectList>
                    {
                        projectList.length !== 0 && projectList.map((project, index) => {
                            return (
                                <li key={"" + index + project}>
                                    <ProjectCard props={{ project, clickedProjectModal, setClickedProjectModal, onClickModifyModalOn, onClickRemoveModal, setRemoveTarget }} />
                                </li>
                            )
                        })
                    }
                    <li>
                        <S.CreateProjectButton onClick={onClickModalOn}>
                            <i className="fas fa-plus"></i>
                            <span>New Project</span>
                        </S.CreateProjectButton>
                    </li>
                </S.ProjectList>
                <S.ModalWrapper visible={generate} onClick={onClickModalOff}>
                    <S.ModalForm onClick={onClickModalForm} valid={!!generateValid}>
                        <label htmlFor="generateName">Project Name</label>
                        <input type="text" id="generateName" placeholder="프로젝트 이름을 입력해주세요." onChange={onChangeInput} value={inputs.generateName} />
                        <S.ValidText visible={!!generateValid}>{generateValid}</S.ValidText>
                        <label htmlFor="generateDesc">Project Description</label>
                        <textarea id="generateDesc" placeholder="프로젝트 설명을 입력해주세요." onChange={onChangeInput} value={inputs.generateDesc} />
                        <S.ButtonWrapper>
                            <S.ConfirmButton onClick={onClickGenerate}>Create</S.ConfirmButton>
                            <S.CancelButton onClick={onClickModalOff}>Cancel</S.CancelButton>
                        </S.ButtonWrapper>
                    </S.ModalForm>
                </S.ModalWrapper>
                <S.ModalWrapper visible={modify} onClick={onClickModifyModalOff}>
                    <S.ModalForm onClick={onClickModalForm} valid={!!modifyValid}>
                        <label htmlFor="modifyName">Project Name</label>
                        <input type="text" id="modifyName" placeholder="프로젝트 이름을 입력해주세요." onChange={onChangeModifyInput} value={editInput.modifyName}/>
                        <S.ValidText visible={!!modifyValid}>{modifyValid}</S.ValidText>
                        <label htmlFor="modifyDescription">Project Description</label>
                        <input type="text" id="modifyDescription" placeholder="프로젝트 설명을 입력해주세요." onChange={onChangeModifyInput} value={editInput.modifyDescription} />
                        <S.ButtonWrapper>
                            <S.ConfirmButton onClick={onClickModify}>Edit</S.ConfirmButton>
                            <S.CancelButton onClick={onClickModifyModalOff}>Cancel</S.CancelButton>
                        </S.ButtonWrapper>
                    </S.ModalForm>
                </S.ModalWrapper>
                <S.ModalWrapper visible={remove} onClick={onClickRemoveModalOff}>
                    <S.DeleteModal onClick={onClickModalForm}>
                        <p>{removeTarget}을(를) 삭제하시겠습니까?</p>
                        <S.DeleteButtonWrapper>
                            <S.DeleteButton onClick={onClickRemove}>Delete</S.DeleteButton>
                            <ConfirmButton props={{ content: "Cancel", callback: onClickRemoveModalOff }} />
                        </S.DeleteButtonWrapper>
                    </S.DeleteModal>
                </S.ModalWrapper>
            </S.Section>
        </S.Wrapper>
    )
}