import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Wrapper = styled.div`
    width: 550px;
    padding: 64px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${props => props.theme.color.background.content};
    border: 1px solid ${props => props.theme.color.border.normal};
    border-radius: ${props => props.theme.borderRadius.lv5};
`

export const Header = styled.header`
    display: flex;
    // justify-content: center;
    margin-bottom: 40px;
    letter-spacing: -2px;

    & > a > h1 {
        font-family: 'Righteous', cursive;
        font-size: ${props => props.theme.fontSize.logo};
        color: ${props => props.theme.color.theme.main};
    }
`

export const SectionHeader = styled.header`
    ${IROnly}
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    & > label {
        ${IROnly}
    }

    & > input {
        padding: 18px 16px;
        font-size: ${props => props.theme.fontSize.button};
        border: 1px solid ${props => props.theme.color.border.normal};
        // border-bottom: none;
        // border-radius: ${props => props.theme.borderRadius.lv3};
        margin-bottom: 2px;
    }

    & > input:nth-child(2) {
        border-radius: ${props => props.theme.borderRadius.lv3} ${props => props.theme.borderRadius.lv3} 0 0;
    }
    & > input:nth-child(8) {
        border-radius: 0 0 ${props => props.theme.borderRadius.lv3} ${props => props.theme.borderRadius.lv3};
        // border-bottom: 1px solid ${props => props.theme.color.border.normal};
    }

    & > input:focus {
        outline: none;
        border: 1px solid ${props => props.theme.color.theme.main};
    }
`

export const FormButton = styled.button`
    width: 100%;
    padding: 18px;
    letter-spacing: 3px;
    transition: all 0.2s;
    margin-top: 40px;
    font-size: ${props => props.theme.fontSize.button};
    color: ${props => props.theme.color.font.reverse};
    background-color: ${props => props.theme.color.theme.main};
    border-radius: ${props => props.theme.borderRadius.lv3};

    &:hover {
        background-color: ${props => props.theme.color.theme.dark};
    }
`