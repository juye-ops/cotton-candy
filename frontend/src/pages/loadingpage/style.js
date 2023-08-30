import styled, { keyframes } from "styled-components";
import IROnly from "styles/IROnly";

const rain = keyframes`
    0% {
        transform: translateY(0) scale(1);
    }
    80% {
        transform: translateY(300px) scale(1);
    }
    100% {
        transform: translateY(300px) scale(0);
    }
`

export const Header = styled.header`
    ${IROnly}
`

export const Section = styled.section`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > header {
        ${IROnly}
    }
`

export const Container = styled.div`
    position: relative;
    height: 400px;
`

export const Cloud = styled.div`
    position: relative;
    top: 50px;
    width: 320px;
    height: 100px;
    background-color: ${props => props.theme.color.theme.main};
    border-radius: 100px;

    &::before {
        content: "";
        position: absolute;
        top: -50px;
        left: 40px;
        width: 110px;
        height: 110px;
        background-color: ${props => props.theme.color.theme.main};
        border-radius: 50%;
        box-shadow: 90px 0 0 30px ${props => props.theme.color.theme.main};
    }
`

export const Rain = styled.div`
    position: relative;
    display: flex;
    z-index: 1;
    padding: 0 20px;
`

export const RainDrop = styled.span`
    position: relative;
    bottom: 10px;
    width: 10px;
    height: 10px;
    background-color: ${props => props.theme.color.theme.main};
    margin: 0 2px;
    border-radius: 50%;
    animation: ${rain} 5s linear infinite;
    animation-duration: ${props => `calc(150s / ${props.duration})`};
    transform-origin: bottom;
`

export const Text = styled.p`
    margin-top: 20px;
    font-family: 'Righteous', cursive;
    font-size: ${props => props.theme.fontSize.pageMain};
    color: ${props => props.theme.color.theme.main};
`