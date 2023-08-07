import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import * as S from './style';
import { getContainerList } from 'apis/ManagePageAPIs';

import ContainerCard from 'components/cards/containercard/ContainerCard';

export default function ContainerManagePage() {
    const { projectName } = useParams();

    // 컨테이너 리스트
    const [containerList, setContainerList] = useState([]);

    useEffect(() => {
        // 프로젝트 이름 통해서 컨테이너 리스트 받아오기
        setContainerList(getContainerList());
    }, []);

    // 컨테이너 모달
    const [clickedContainerModal, setClickedContainerModal] = useState("");

    return (
        <S.Wrapper>
            <S.Header>
                <h1>COTTON CANDY</h1>
            </S.Header>
            <main>
                <S.Section>
                    <S.SectionHeader>
                        <S.SectionHeaderWrapper>
                            <S.SectionHeaderBackLink to='/'>
                                <span>Back</span>
                                <i className="fas fa-arrow-left"></i>
                            </S.SectionHeaderBackLink>
                            <h2>Containers in {"test_01"}</h2>
                        </S.SectionHeaderWrapper>
                    </S.SectionHeader>
                    {
                        <S.ContainerList>
                            {
                                containerList.map((container, index) => {
                                    return (
                                        <li key={"" + index + container}>
                                            <ContainerCard props={{ container, clickedContainerModal, setClickedContainerModal }} />
                                        </li>
                                    )
                                })
                            }
                            <li>
                                <S.CreateContainerLink to={"/" + projectName + "/container/setting"} state={{ project: "test01" }}>
                                    <i className="fas fa-plus"></i>
                                    <span>New Container</span>
                                </S.CreateContainerLink>
                            </li>
                        </S.ContainerList>
                    }
                </S.Section>
            </main>
            <footer></footer>
        </S.Wrapper>
    )
}