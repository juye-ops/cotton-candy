import { useEffect, useRef, useState } from 'react';

import * as S from './style';
import PreventDefault from 'utils/PreventDefault';
import StopPropagation from 'utils/StopPropagation';
import { getContainerList } from 'apis/ManagePageAPIs';

export default function ManagePage() {
    // 모달
    const [clicked, setClicked] = useState(false);
    
    const onClickButton = (e) => {
        PreventDefault(e);
        StopPropagation(e);
        
        setClicked(!clicked);
    }

    window.addEventListener("click", () => {
        setClicked(false);
    });

    // 컨테이너 리스트
    const [containerList, setContainerList] = useState([]);
    const [showList, setShowList] = useState([]);

    useEffect(() => {
        // 컨테이너 리스트 받아오기
        setContainerList(getContainerList());
    }, []);

    useEffect(() => {
        if (containerList.length === 0) {
            return;
        }

        setShowList(containerList);
    }, [containerList]);

    // 검색 관련
    const [searchInput, setSearchInput] = useState("");
    const searchInputRef = useRef();

    const onChangeSearchInput = (e) => {
        setSearchInput(e.target.value);
    }

    useEffect(() => {
        setShowList([...containerList].filter(container => container.name.indexOf(searchInput) !== -1));
    }, [searchInput, containerList]);

    // const generate = () => {

    //     // 데이터 읽어서 json 만들기

    //     // 애니메이션 띄우기

    //     // axios, fetch

    //     // 애니메이션 지우기

    // }

    // 정렬 관련
    const onClickSortByDate = () => {
        
    }

    return (
        <S.Wrapper>
            <S.Header>
                <h1>COTTON CANDY</h1>
            </S.Header>
            <main>
                <S.Section>
                    <S.SectionHeader>
                        <h2>All Containers</h2>
                        <S.GenerateLink to='/setting'>+ New Container</S.GenerateLink>
                    </S.SectionHeader>
                    <S.Article>
                        <header>
                            <h3>Utility Article</h3>
                        </header>
                        <S.Form action="">
                            <i className="fas fa-search"></i>
                            <label htmlFor="searchInput">Search Container</label>
                            <input type="text" id="searchInput" placeholder='컨테이너 이름'
                            ref={((element) => searchInputRef.current = element)}
                            onChange={onChangeSearchInput}
                            value={searchInput} />
                        </S.Form>
                        <S.ArticleList>
                            <li>
                                <S.ArticleButton>
                                    <i className="fas fa-sort"></i>
                                    <span>최근 수정 순</span>
                                </S.ArticleButton>
                            </li>
                        </S.ArticleList>
                    </S.Article>
                    <S.ContainerList>
                        {
                            showList.map(() => {
                                return (
                                    <>
                                    </>
                                );
                            })
                        }
                        <li>
                            <S.Container>
                                <S.ContainerHeader>
                                    <S.ConatinerState>
                                    </S.ConatinerState>
                                    <h3>Sample Container</h3>
                                    <S.MoreButtonWrapper>
                                        <S.MoreButton onClick={onClickButton}>
                                            <i className="fas fa-ellipsis-h"></i>
                                            <span>more</span>
                                        </S.MoreButton>
                                        <S.MoreList clicked={clicked}>
                                            <li>
                                                <S.MoreListButton>
                                                    <i className="fas fa-cog"></i>
                                                    <span>컨테이너 설정</span>
                                                </S.MoreListButton>
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
                                    <p>Ubuntu</p>
                                    <p>Python</p>
                                </S.SoftwareWrapper>
                                <p>test desc</p>
                                <S.ExecuteButton>
                                    <i className="fa-solid fa-play"></i>
                                    <span>실행</span>
                                </S.ExecuteButton>
                            </S.Container>
                        </li>
                    </S.ContainerList>
                </S.Section>
            </main>
            <footer></footer>
        </S.Wrapper>
    )
}