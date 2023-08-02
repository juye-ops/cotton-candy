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
    margin-bottom: 40px;

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

export const ProjectList = styled.ul`
    margin-bottom: 20px;
    display: flex;
    gap: 5px;
`

export const ProjectListButton = styled.button`
    height: 32px;
    padding: 0 10px;
    background-color: ${props => props.selectedProject ? props.theme.color.theme.main : "inherit"};
    border-radius: ${props => props.theme.borderRadius.lv2};
    color: ${props => props.selectedProject ? props.theme.color.font.reverse : props.theme.color.theme.main};
`

export const ProjectAddButton = styled.button`
    height: 32px;
    margin-left: 3px;
    background-color: inherit;
    color: ${props => props.theme.color.theme.main};

    & > i {
        vertical-align: -1px;
    }

    & > span {
        ${IROnly}
    }
`

export const ProjectModalWrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: rgba(150, 150, 150, 0.5);
    display: ${props => props.selected ? 'block' : 'none'};
`

export const ProjectModalForm = styled.form`
    width: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    padding: 40px 30px;
    background-color: ${props => props.theme.color.background.content};
    border-radius: ${props => props.theme.borderRadius.lv2};
    color: ${props => props.theme.color.font.main};

    & > label {
        margin-bottom: 10px;
    }

    & > input {
        border: 1px solid ${(props) => props.theme.color.border.normal};
        border-radius: ${(props) => props.theme.borderRadius.lv2};
        padding: 8px 13px;
        margin-bottom: 15px;
    }

    & > input::placeholder {
        color: ${(props) => props.theme.color.font.desc};
    }

    & > input:focus {
        outline: 0;
        border: 1px solid ${(props) => props.theme.color.theme.main};
    }

    & > button {
        padding: 5px;
        transition: all 0.2s;
        font-size: ${props => props.theme.fontSize.button};        
        background-color: ${props => props.theme.color.theme.main};
        border: 1px solid ${props => props.theme.color.theme.main};
        border-radius: ${props => props.theme.borderRadius.lv2};
        color: ${props => props.theme.color.font.reverse};
    }

    & > button:hover {
        background-color: ${props => props.theme.color.theme.dark};
    }
`

export const ProjectEmptyButton = styled.button`
    width: 100%;
    background-color: inherit;
    padding: 30px;
    transition: all 0.2s;
    border: 3px dashed ${props => props.theme.color.theme.main};
    border-radius: ${props => props.theme.borderRadius.lv2};
    color: ${props => props.theme.color.theme.main};
    font-size: ${props => props.theme.fontSize.pageSub};

    &:hover {
        background-color: ${props => props.theme.color.background.dark};
    }

    & > i {
        margin-right: 10px;
    }
`

export const ContainerList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 20px;
    margin-bottom: 50px;
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

export const MoreListLink = styled(Link)`
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

export const ExecuteLink = styled(Link)`
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
    font-size: ${props => props.theme.fontSize.desc};

    &:hover {
        background-color: ${props => props.theme.color.background.hover3};
    }

    & > i {
        font-size: 11px;
        margin-right: 8px;
    }
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