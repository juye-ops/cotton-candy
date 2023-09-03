import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;


    & > label {
        width: fit-content;
        position: absolute;
        font-family: 'Righteous', sans-serif;
        top: ${props => props.isFill ? "0" : "50%"};
        left: ${props => props.isFill ? "10px" : "6px"};
        transform: translate(0, -50%);
        transition: all 0.15s;
        z-index: 200;
        padding: 0 5px;
        font-size: ${props => props.isFill ? '12px' : '16px'};
        background-color: white;
        color: ${props => props.isFill ? props.theme.color.theme.main : props.theme.color.font.desc};
    }

    &:focus-within > label {
        top: 0;
        left: 10px;
        font-size: 12px;
        color: ${props => props.theme.color.theme.main};
    }
`

export const Input = styled.textarea`
    width: 100%;
    display: block;
    height: 64px;
    padding: 12px 15px;
    border: 0;
    position: relative;
    resize: vertical;
    border: 1px solid ${props => props.isFill ? props.theme.color.theme.main : '0'};
    border-bottom: 1px solid ${props => props.isFill ? props.theme.color.theme.main : '#ddd'};
    border-radius: ${props => props.isFill ? '8px' : '0'};

    &:focus {
        outline: 0;
        border: 1px solid ${props => props.theme.color.theme.main};
        border-radius: 8px;
    }

    &::placeholder {
        color: #ddd;
    }

    &::-webkit-scrollbar {
        width: 4px;
        background-color: ${props => props.theme.color.theme.main_light};
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.color.theme.main};
        border-radius: 10px;
        background-clip: padding-box;
    }

    &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }
`