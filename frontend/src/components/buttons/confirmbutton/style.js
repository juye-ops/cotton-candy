import styled from "styled-components";

export const ConfirmButton = styled.button`
    margin-left: auto;
    color: white;
    padding: 8px 16px;
    background-color: ${(props) => props.theme.color.theme.main};
    font-size: ${(props) => props.theme.fontSize.button};
    border-radius: ${(props) => props.theme.borderRadius.lv2};
`