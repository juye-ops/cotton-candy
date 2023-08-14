import { Link } from "react-router-dom";
import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Project = styled(Link)`
    height: 180px;
    padding: 30px 25px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.color.background.content};
    border: 1px solid ${props => props.theme.color.border.normal};
    border-radius: ${props => props.theme.borderRadius.lv2};
`

export const ModalWrapper = styled.div`
    display: flex;
    align-items: center;
    padding-left: 2px;
`

export const ProjectState = styled.div`
    width: 8px;
    height: 8px;
    margin-right: 12px;
    border-radius: 50%;
    background-color: ${props => props.theme.color.theme.main};
`

export const ProjectName = styled.p`
    font-size: 16px;
`

export const ProjectDescription = styled.p`
    margin-top: 15px;
    line-height: 16px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;  
    padding-left: 2px;
    font-size: ${props => props.theme.fontSize.content};
    color: ${props => props.theme.color.font.desc};
`

export const DesignDiv = styled.div`
    /* margin-right: 10px; */
    margin-top: 15px;
    border-bottom: 1px solid ${props => props.theme.color.theme.main};
`

export const MoreButtonWrapper = styled.div`
    position: relative;
    margin-left: auto;
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