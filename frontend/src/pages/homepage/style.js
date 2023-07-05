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
    justify-content: center;
    margin-bottom: 70px;
    letter-spacing: -5px;

    & > h1 {
        font-family: 'Righteous', cursive;
        font-size: ${props => props.theme.fontSize.title};
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
        border-radius: ${props => props.theme.borderRadius.lv3};
    }

    & > input:focus {
        outline: none;
        border: 1px solid ${props => props.theme.color.theme.main};
    }

    & > input:nth-child(4) {
        margin: 25px 0 50px;
    }
`

export const FormButton = styled.button`
    width: 100%;
    padding: 18px;
    letter-spacing: 3px;
    transition: all 0.2s;
    font-size: ${props => props.theme.fontSize.button};
    color: ${props => props.theme.color.font.reverse};
    background-color: ${props => props.theme.color.theme.main};
    border-radius: ${props => props.theme.borderRadius.lv3};

    &:hover {
        background-color: ${props => props.theme.color.theme.dark};
    }
`