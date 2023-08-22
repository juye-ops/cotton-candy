import { Link } from "react-router-dom";
import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Section = styled.section`
    height: 180px;
    padding: 28px 25px 24px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.color.background.content};
    border: 1px solid ${props => props.theme.color.border.normal};
    border-radius: ${props => props.theme.borderRadius.lv2};
`

export const ModalHeader = styled.header`
    display: flex;
    gap: 20px;
`

export const HeaderTextWrapper = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const ProjectName = styled.h3`
    font-size: 16px;
`

export const ProjectDescription = styled.p`
    /* margin-top: 15px; */
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

export const ContainerCount = styled.p`
    text-align: center;
    margin-bottom: 5px;
    color: ${props => props.theme.color.font.main};
`

export const ContainerCountText = styled.p`
    color: ${props => props.theme.color.font.desc};
    font-size: ${props => props.theme.fontSize.desc};
`

export const HeaderCountWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const ModalButtonWrapper = styled.div`
    display: flex;
    margin-top: auto;
    gap: 14px;
`

export const ExecuteLink = styled(Link)`
    border: none;
    flex-grow: 1;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    font-size: ${props => props.theme.fontSize.desc};
    background-color:  ${props => props.theme.color.theme.main};
    color: ${props => props.theme.color.font.reverse};
    border-radius: ${props => props.theme.borderRadius.lv1};

    &:hover {
        background-color:  ${props => props.theme.color.theme.dark};
    }
`

export const MoreButtonWrapper = styled.div`
    position: relative;
    margin-left: auto;
`

export const MoreButton = styled.button`
    height: 22px;
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
    /* box-shadow: 0 0 10px 3px ${props => props.theme.color.background.hover2}; */
    display: ${props => props.clicked ? "flex" : "none"};
    flex-direction: column;
    width: 160px;
    padding: 5px 0;
    position: absolute;
    bottom: 30px;
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