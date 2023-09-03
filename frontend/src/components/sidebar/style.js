import styled from "styled-components";

export const Section = styled.section`
    width: 280px;
    height: calc(100vh - 92px);
    background-color: ${props => props.theme.color.theme.main_light};
`

export const Header = styled.header`
    font-family: 'Righteous', cursive;
    margin-top: 35px;
    margin-left: 30px;

    & > h2 {
        font-weight: 500;
        font-size: ${props => props.theme.fontSize.pageSub};
    }
`

export const List = styled.ul`
    display: flex;
    flex-direction: column;
    padding-top: 8px;

    & > li {
        position: relative;
    }
`

export const ListButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 6px 0 6px 45px;
    gap: 10px;
    background-color: inherit;
    font-family: 'Righteous', cursive;
    font-size: ${props => props.theme.fontSize.button};

    & > i:first-child {
        width: 12px;
    }

    & > span {
        margin-left: -4px;
    }

    &:hover {
        background-color: ${props => props.theme.color.theme.main_hover};
    }
`

export const ContainerList = styled.ul`
    display: flex;
    flex-direction: column;

    & > li {
        position: relative;
    }
`

export const ContainerButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 6px 0 6px 70px;
    gap: 6px;
    background-color: inherit;
    font-family: 'Righteous', cursive;
    font-size: ${props => props.theme.fontSize.button};

    &:hover {
        background-color: ${props => props.theme.color.theme.main_hover};
    }
`