import { Link } from "react-router-dom";
import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Wrapper = styled.div`
    max-width: 1140px;
    margin: 0 auto;
`

export const Header = styled.header`
    ${IROnly}
`

export const Section = styled.section`
    margin-top: 50px;
    font-family: 'Rubik', sans-serif;
    margin-bottom: 50px;
`

export const SectionHeader = styled.header`
    width: 100%;
    background-color: rgba(247, 247, 250, 0.6);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    padding: 50px 0 30px;
    z-index: 200;
`

export const SectionHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: ${(props) => props.theme.width.wrapperWidth};

    & i {
        vertical-align: -2px;
    }

    & > h2 {
        font-family: 'Ubuntu', sans-serif;
        font-size: ${(props) => props.theme.fontSize.pageMain};
        font-weight: 700;
    }
`

export const SectionHeaderBackLink = styled(Link)`
    margin: 0 15px;

    & > span {
        ${IROnly}
    }
`

export const ContainerList = styled.ul`
    margin-top: 112px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
`

export const CreateContainerLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 280px;
    transition: all 0.2s;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 700;
    border: 3px dashed ${props => props.theme.color.theme.main};
    border-radius: ${props => props.theme.borderRadius.lv2};
    color: ${props => props.theme.color.theme.main};
    font-size: ${props => props.theme.fontSize.pageSub};
    

    &:hover {
        background-color: ${props => props.theme.color.background.dark};
    }

    & > span {
        margin-left: 10px;
    }
`