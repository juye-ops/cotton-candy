import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    position: relative;
`

export const Button = styled.button`
    width: 100%;
    height: 32px;
    text-align: left;
    padding: 0 12px;
    position: relative;
    background-color: ${props => props.theme.color.background.content};
    font-size: ${props => props.theme.fontSize.button};
    border: 1px solid ${(props) => props.clicked ? `${props.theme.color.theme.main}` : `${props.theme.color.border.normal}`};
    border-radius: ${props => props.theme.borderRadius.lv2};
    color: ${props => props.theme.color.font.main};

    &::before {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        position: absolute;
        right: 15px;
        top: 10px;
        transition: all 0.2s;
        transform: ${props => props.clicked ? "translate(5px, -1px) rotate(225deg);" : "translate(0, -1px) rotate(225deg)" };
        border-top: 2px solid ${(props) => props.theme.color.border.dark};
    }

    &::after {
        content: "";
        display: block;
        width: 8px;
        height: 8px;
        position: absolute;
        right: 15px;
        top: 10px;
        transition: all 0.2s;
        transform: ${props => props.clicked ? "translate(-4px, -1px) rotate(135deg);" : "translate(0, -1px) rotate(135deg)" };
        border-top: 2px solid ${(props) => props.theme.color.border.dark};
    }
`

export const List = styled.ul`
    width: 100%;
    max-height: 200px;
    background-color: aqua;
    position: absolute;
    top: 37px;
    padding: 4px 0;
    box-shadow: 0 0 5px 1px #cecece;
    border-radius: ${props => props.theme.borderRadius.lv1};
    background-color: ${props => props.theme.color.background.content};
    display: ${props => props.clicked ? "block" : "none"};
`

export const ListItem = styled.li`
    width: 100%;
`

export const ListButton = styled.button`
    width: 100%;
    padding: 5px 16px;
    text-align: left;
    font-size: ${props => props.theme.fontSize.button};
    background-color: ${props => props.theme.color.background.content};

    &:hover {
        background-color: ${props => props.theme.color.background.hover2};
    }
`