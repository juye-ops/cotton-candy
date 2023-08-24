import { Link } from "react-router-dom";
import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Container = styled.section`
    height: 180px;
    padding: 28px 25px 24px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.color.background.content};
    border: 1px solid ${props => props.theme.color.border.normal};
    border-radius: ${props => props.theme.borderRadius.lv2};
`

export const ContainerHeader = styled.header`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`

export const ContainerDesc = styled.p`
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
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    transition: all 0.2s;
    background-color: ${props => props.theme.color.theme.main};
    border-radius: ${props => props.theme.borderRadius.lv2};
    color: ${props => props.theme.color.font.reverse};
    font-size: ${props => props.theme.fontSize.desc};

    &:hover {
        background-color: ${props => props.theme.color.theme.dark};
    }

    & > i {
        font-size: 11px;
        margin-right: 8px;
    }
`