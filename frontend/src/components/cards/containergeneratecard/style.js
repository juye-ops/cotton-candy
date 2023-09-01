import styled, { keyframes } from "styled-components";
import IROnly from "styles/IROnly";

const rain = keyframes`
    0% {
        transform: translateY(0) scale(1);
    }
    80% {
        transform: translateY(50px) scale(1);
    }
    100% {
        transform: translateY(50px) scale(0);
    }
`

export const Container = styled.section`
    height: 180px;
    padding: 28px 25px 24px;
    display: flex;
    flex-direction: column;
    position: relative;
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

export const ExecuteLink = styled.button`
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

export const AnimationWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: ${props => props.theme.borderRadius.lv2};
`

export const AnimationContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // height: 60px;
    // transform: scale(0.3);
`

export const Cloud = styled.div`
    position: relative;
    top: 20px;
    width: 100px;
    height: 36px;
    background-color: ${props => props.theme.color.theme.main};
    border-radius: 60px;

    &::before {
        content: "";
        position: absolute;
        top: -12px;
        left: 15px;
        width: 35px;
        height: 35px;
        background-color: ${props => props.theme.color.theme.main};
        border-radius: 50%;
        box-shadow: 30px 0 0 10px ${props => props.theme.color.theme.main};
    }
`

export const Rain = styled.div`
    position: relative;
    display: flex;
    z-index: 1;
    // padding: 0 20px;
`

export const RainDrop = styled.span`
    position: relative;
    bottom: 10px;
    width: 3px;
    height: 3px;
    background-color: ${props => props.theme.color.theme.main};
    margin: 0 1px 0 0;
    border-radius: 50%;
    animation: ${rain} 5s linear infinite;
    animation-duration: ${props => `calc(150s / ${props.duration})`};
    transform-origin: bottom;
`

export const Text = styled.p`
    margin-top: 30px;
    font-family: 'Righteous', cursive;
    font-size: ${props => props.theme.fontSize.pageMain};
    color: ${props => props.theme.color.theme.main};
`