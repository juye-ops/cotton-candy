import styled from "styled-components";

export const SoftwareButton = styled.button`
    width: 100%;
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.selected ? `${props.theme.color.background.hover}` : props.added ? props.theme.color.background.hover4 : `${props.theme.color.background.main}`};
    border-radius: ${props => props.theme.borderRadius.lv2};
    outline: ${props => props.selected ? `2px solid ${props.theme.color.theme.main}` : "none"};

    & > img {
        width: 60%;
    }

    & > span {
        font-size: 12px;
    }

    &:hover {
        background-color: ${props => props.added ? props.theme.color.background.hover4 : props.theme.color.background.hover};
    }
`