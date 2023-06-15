import React from 'react'
import styled from 'styled-components'

import IROnly from 'styles/IROnly'

const ManagePageHeader = styled.header`
    display: flex;
    justify-content: center;
`

const ContainerSection = styled.main`
    max-width: 1140px;
    margin: 0 auto;
`

const ContainerSectionHeader = styled.header`
    display: flex;
    justify-content: space-between;
`

const UtilityArticle = styled.article`
    display: flex;
    justify-content: space-between;
`

const UtilityArticleHeader = styled.header`
    ${IROnly}
`

const UtilityArticleSearchLabel = styled.label`
    ${IROnly}
`

const UtilityArticleFilterList = styled.ul`
    display: flex;
`

const ContainerList = styled.ul`
    display: flex;
    flex-direction: column;
`

const ContainerListItem = styled.li`
    display: flex;
    justify-content: space-between;

    background-color: #ccc;

    &:hover > div {
        display: block;
    }
`

const ContainerMenu = styled.div`
    display: flex;
    justify-content: space-between;
`

const ContainerHoverMenu = styled.div`
    display: none;
`

export default function ManagePage() {
    const generate = () => {

        // 데이터 읽어서 json 만들기

        // 애니메이션 띄우기

        // axios, fetch

        // 애니메이션 지우기

    }

    return (
        <>
            <ManagePageHeader>
                <h1>COTTON CANDY</h1>
            </ManagePageHeader>
            <main>
                <ContainerSection>
                    <ContainerSectionHeader>
                        <h2>All Containers</h2>
                        <a href='/setting'>New Container</a>
                    </ContainerSectionHeader>
                    <UtilityArticle>
                        <UtilityArticleHeader>
                            <h3>Utility Article</h3>
                        </UtilityArticleHeader>
                        <form action="">
                            <UtilityArticleSearchLabel htmlFor="searchInput">Search Container</UtilityArticleSearchLabel>
                            <input type="text" id="searchInput" />
                        </form>
                        <UtilityArticleFilterList>
                            <li>
                                <button>
                                    필터 추가
                                </button>
                            </li>
                            <li>
                                <button>
                                    최근 수정 순
                                </button>
                            </li>
                            <li>
                                <button>
                                    보기
                                </button>
                            </li>
                            <li>
                                <button>
                                    리스트
                                </button>
                            </li>
                        </UtilityArticleFilterList>
                    </UtilityArticle>
                    <div>
                        <ContainerMenu>
                            <span>Title</span>
                            <span>Stack</span>
                        </ContainerMenu>
                        <ContainerList>
                            <ContainerListItem>
                                <span>제목</span>
                                <ContainerHoverMenu>
                                    <button>실행</button>
                                </ContainerHoverMenu>
                                <span>기술 스택</span>
                            </ContainerListItem>
                            <ContainerListItem>
                                <span>제목</span>
                                <ContainerHoverMenu>
                                    <button>실행</button>
                                </ContainerHoverMenu>
                                <span>기술 스택</span>
                            </ContainerListItem>
                        </ContainerList>
                    </div>
                </ContainerSection>
            </main>
            <footer></footer>
        </>
    )
}