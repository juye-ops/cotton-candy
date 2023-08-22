import styled from "styled-components";

export const HeaderWrapper = styled.div`
    position: fixed;
    width: 100vw;
    z-index: 10000;
    box-shadow: 0 0 20px 1px ${props => props.theme.color.theme.main_light};
`

export const Header = styled.header`
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 50px;
    font-family: 'Righteous', cursive;

    & > a > h1 {
        font-size: 32px;
        color: ${props => props.theme.color.theme.main};
        letter-spacing: -2px;
    }
`

export const HeaderButton = styled.button`
    padding: 6px 12px;
    border-radius: ${props => props.theme.borderRadius.lv2};
    font-size: ${props => props.theme.fontSize.button};
    color: ${props => props.theme.color.font.reverse};
    background-color: ${props => props.theme.color.theme.main};
`