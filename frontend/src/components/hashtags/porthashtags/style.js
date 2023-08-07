import styled from "styled-components"
import IROnly from "styles/IROnly"

export const PortListItem = styled.li`
    display: flex;
    overflow: hidden;
    margin-left: 5px;
    padding-left: 5px;
    background-color: ${props => props.theme.color.theme.main};
    border-radius: ${(props) => props.theme.borderRadius.lv1};
    color: ${props => props.theme.color.font.reverse};

    & > span {
        line-height: 24px;
    }
`

export const PortListItemButton = styled.button`
    background-color: inherit;
    color: inherit;

    & > span {
        ${IROnly}
    }
`