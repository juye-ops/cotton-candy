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
`

export const SectionHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    & > h2 {
        font-size: ${props => props.theme.fontSize.pageMain};
        font-family: 'Ubuntu', sans-serif;
        font-weight: 700;
    }
`

export const GenerateLink = styled(Link)`
    padding: 8px 16px;
    background-color: ${props => props.theme.color.theme.main};
    border-radius: ${props => props.theme.borderRadius.lv2};
    color: ${props => props.theme.color.font.reverse};
    font-size: ${props => props.theme.fontSize.button};
`

export const Article = styled.article`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > header {
        ${IROnly}
    }
`

export const Form = styled.form`
    position: relative;

    & > i {
        position: absolute;
        top: 9px;
        left: 12px;
        font-size: ${props => props.theme.fontSize.button};
        color: ${props => props.theme.color.font.main};
    }

    &  > label {
        ${IROnly}
    }

    & > input {
        width: 280px;
        height: 32px;
        padding-left: 35px;
        background-color: ${props => props.theme.color.background.content};
        border: 1px solid ${props => props.theme.color.border.normal};
        border-radius: ${props => props.theme.borderRadius.lv2};
    }

    & > input:focus {
        outline: 0;
        border: 1px solid ${props => props.theme.color.theme.main};
    }
`

export const ArticleList = styled.ul`
    display: flex;
`

export const ArticleButton = styled.button`
    padding: 8px 15px;
    display: flex;
    align-items: center;
    font-size: ${props => props.theme.fontSize.button};
    background-color: ${props => props.theme.color.background.dark};
    border-radius: ${props => props.theme.borderRadius.lv2};

    & > i {
        font-size: 11px;
        margin-top: 2px;
        margin-right: 8px;
    }
`

export const ContainerList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
`

export const Container = styled.section`
    height: 280px;
    padding: 16px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.color.background.content};
    border: 1px solid ${props => props.theme.color.border.normal};
    border-radius: ${props => props.theme.borderRadius.lv2};
`

export const ContainerHeader = styled.header`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`

export const ConatinerState = styled.div`
    width: 8px;
    height: 8px;
    margin-right: 8px;
    border-radius: 50%;
    background-color: ${props => props.theme.color.state.good};
`

export const MoreButtonWrapper = styled.div`
    margin-left: auto;
    position: relative;
`

export const MoreButton = styled.button`
    padding: 1px 5px;
    background-color: ${props => props.theme.color.background.dark};
    border-radius: ${props => props.theme.borderRadius.lv1};

    & > i {
        margin-top: 3px;
    }

    & > span {
        ${IROnly}
    }
`

export const MoreList = styled.ul`
    box-shadow: 0 0 10px 3px ${props => props.theme.color.background.hover2};
    display: ${props => props.clicked ? "flex" : "none"};
    flex-direction: column;
    width: 160px;
    padding: 5px 0;
    position: absolute;
    top: 26px;
    right: 0;
    background-color: ${props => props.theme.color.background.content};
    border: 1px solid ${props => props.theme.color.border.normal};
    border-radius: ${props => props.theme.borderRadius.lv1};

    & > li {
        width: 100%;
    }

    & > li:last-child {
        margin-top: 5px;
        padding-top: 5px;
        border-top: 1px solid ${props => props.theme.color.border.normal};
    }

    & > li:last-child > button {
        color: ${props => props.theme.color.font.disable};
    }
`

export const MoreListButton = styled.button`
    display: flex;
    align-items: center;
    width: 100%;
    height: 32px;
    padding: 5px 16px;
    background-color: ${props => props.theme.color.background.content};
    color: ${props => props.theme.color.font.main};
    font-size: ${props => props.theme.fontSize.desc};

    & > i {
        margin-right: 8px;
    }

    &:hover {
        background-color: ${props => props.theme.color.background.dark};
    }
`

export const SoftwareWrapper = styled.div`
    display: flex;
    margin-bottom: 12px;
    color: ${props => props.theme.color.font.desc};
    font-size: ${props => props.theme.fontSize.button};

    & > p {
        padding: 0 10px;
    }

    & > p:first-child {
        padding-left: 0;
    }

    & > p:last-child {
        padding-right: 0;
    }

    & > p + p {
        border-left: 1px solid ${props => props.theme.color.border.normal};
    }
`

export const ExecuteButton = styled.button`
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    transition: all 0.2s;
    background-color: ${props => props.theme.color.background.hover};
    border: 1px solid ${props => props.theme.color.theme.main};
    border-radius: ${props => props.theme.borderRadius.lv2};
    color: ${props => props.theme.color.theme.main};

    &:hover {
        background-color: ${props => props.theme.color.background.hover3};
    }

    & > i {
        font-size: 11px;
        margin-right: 8px;
    }
`