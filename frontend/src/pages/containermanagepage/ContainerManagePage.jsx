import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import * as S from './style';

import ContainerCard from 'components/cards/containercard/ContainerCard';

import { GetContainerList, DeleteContainer } from 'apis/ContainerAPIs';
import ConfirmButton from 'components/buttons/confirmbutton/ConfirmButton';
import { clearGeneratingContainer } from 'redux/slice/containerSlice';
import ContainerGenerateCard from 'components/cards/containergeneratecard/ContainerGenerateCard';

export default function ContainerManagePage() {
    const { projectName } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const generatingContainers = useSelector(state => state.container);

    // 컨테이너 리스트
    const [containerList, setContainerList] = useState([]);

    useEffect(() => {
        const getContainerList = async () => {
            let result = await GetContainerList(dispatch, user, projectName);

            if (!result) {
                result = [];
            }

            setContainerList(result);
        }

        getContainerList();
    }, [projectName]);

    useEffect(() => {
        if (generatingContainers.length === 0) {
            return;
        }

        const nameList = containerList.map(container => container.name);

        generatingContainers.generating.forEach(container => {
            if (nameList.includes(container.name)) {
                dispatch(clearGeneratingContainer({
                    name: container.name,
                }));
            }
        });
    }, [generatingContainers, containerList, dispatch]);

    // 컨테이너 모달
    const [clickedContainerModal, setClickedContainerModal] = useState("");

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
        const removeContainer = async () => {
            await DeleteContainer(dispatch, user, removeTarget);
            window.location.replace("/" + projectName);
        }

        removeContainer();
    }

    const onClickModalForm = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <S.Wrapper>
            <S.Section>
                <S.SectionHeader>
                    <S.SectionHeaderWrapper>
                        <S.SectionHeaderBackLink to='/'>
                            <span>Back</span>
                            <i className="fas fa-arrow-left"></i>
                        </S.SectionHeaderBackLink>
                        <h2>{projectName}</h2>
                    </S.SectionHeaderWrapper>
                </S.SectionHeader>
                <S.ContainerList>
                    {
                        containerList.map((container, index) => {
                            return (
                                <li key={"" + index + container}>
                                    <ContainerCard props={{ container, clickedContainerModal, setClickedContainerModal, onClickRemoveModal, setRemoveTarget }} />
                                </li>
                            )
                        })
                    }
                    {
                        generatingContainers.generating.map((container, index) => {
                            return (
                                <li key={"" + index + container}>
                                    <ContainerGenerateCard props={{ container }} />
                                </li>
                            )
                        })
                    }
                    <li>
                        <S.CreateContainerLink to={"/" + projectName + "/container"} state={{ project: "test01" }}>
                            <i className="fas fa-plus"></i>
                            <span>New Container</span>
                        </S.CreateContainerLink>
                    </li>
                </S.ContainerList>
                <S.ModalWrapper visible={remove} onClick={onClickRemoveModalOff}>
                    <S.DeleteModal onClick={onClickModalForm}>
                        <p>{removeTarget}을(를) 삭제하시겠습니까?</p>
                        <S.DeleteButtonWrapper>
                            <S.DeleteButton onClick={onClickRemove}>Delete</S.DeleteButton>
                            <ConfirmButton props={{ content: "Cancel", callback: onClickRemoveModalOff  }} />
                        </S.DeleteButtonWrapper>
                    </S.DeleteModal>
                </S.ModalWrapper>
            </S.Section>
        </S.Wrapper>
    )
}