import styled from "styled-components";
import IROnly from "styles/IROnly";
import { Link } from "react-router-dom";

export const Header = styled.header`
    ${IROnly}
`

export const Main = styled.main`
    padding: 50px 0;
`

export const Section = styled.main`
    font-family: 'Rubik', sans-serif;
    max-width: ${(props) => props.theme.width.wrapperWidth};
    margin: 0 auto;
`

export const SectionHeader = styled.header`
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    & i {
        vertical-align: -2px;
    }

    & > h2 {
        font-family: 'Ubuntu', sans-serif;
        font-size: ${(props) => props.theme.fontSize.pageMain};
        font-weight: 700;
    }
`

export const SectionHeaderBackLink = styled(Link)`
    margin: 0 15px;

    & > span {
        ${IROnly}
    }
`

export const Form = styled.form`
    border: 1px solid ${(props) => props.theme.color.border.normal};
    border-radius: ${(props) => props.theme.borderRadius.lv3};
    background-color: ${(props) => props.theme.color.background.content};
    color: ${props => props.theme.color.font.main};

    & > fieldset + fieldset {
        border-top: 1px solid ${(props) => props.theme.color.border.normal};
    }
`

export const DivideFieldSet = styled.fieldset`
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 32px 25px;
    font-size: ${(props) => props.theme.fontSize.content};

    & > input, & > textarea {
        border: 1px solid ${(props) => props.theme.color.border.normal};
        border-radius: ${(props) => props.theme.borderRadius.lv2};
        padding: 8px 13px;
    }

    & > textarea {
        height: 60px;
        line-height: 20px;
    }

    & > input::placeholder, & > textarea::placeholder {
        color: ${(props) => props.theme.color.font.desc};
    }

    & > input:focus, & > textarea:focus {
        outline: 0;
        border: 1px solid ${(props) => props.theme.color.theme.main};
    }

    & > label:nth-child(2), & > p:nth-child(2) {
        padding-top: 2px;

        & > span {
            font-size: 10px;
            max-lines: 2px;
            vertical-align: 1px;
            margin-left: 2px;
            color: ${(props) => props.theme.color.font.desc};
        }
    }
`

export const IROnlyFieldSetLegend = styled.legend`
    ${IROnly}
`

export const DescTextArea = styled.textarea`
    resize: vertical;
`

export const ScopeList = styled.div`
    display: flex;
    align-items: center;

    & > input {
        margin: 0;
        margin-right: 8px;
    }

    & > label  {
        margin-right: 20px;
    }

    & > input[type="radio"] {
        display: flex;
        justify-content: center;
        align-items: center;
        appearance: none;
        background-color: white;
        font: inherit;
        color: currentColor;
        width: 17px;
        height: 17px;
        border: 2px solid #eee;
        border-radius: 50%;
        cursor: pointer;
    }

    & > input[type="radio"]:hover {
        border: 1px solid ${(props) => props.theme.color.theme.main};
    }

    & > input[type="radio"]:checked {
        border: 5px solid ${(props) => props.theme.color.theme.main};
    }

    & > input[type="radio"]:disabled {
        background-color: #f3f3f3;
    }

    & > input[type="radio"]:disabled:hover {
        border: none;
    }
`

export const PlatformList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 15px;
`

export const SettingList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 16px;
    background-color: ${props => props.theme.color.background.main};
    border-radius: ${props => props.theme.borderRadius.lv3};
`

export const SettingListItem = styled.li`
    width: 100%;
    display: flex;

    & > p {
        width: 17%;
        padding-top: 7px;
    }
`

export const SettingListItemPort = styled(SettingListItem)`
    margin-bottom: 20px;

    & > label {
        width: 17%;
        padding-top: 7px;
    }
`

export const PortInputWarpper = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    border: 1px solid ${(props) => props.theme.color.border.normal};
    background-color: ${props => props.theme.color.background.content};
    border-radius: ${(props) => props.theme.borderRadius.lv2};

    & > input {
        width: 100%;
        padding: 8px 13px;
        border: 0;
    }

    & > input::placeholder {
        color: ${(props) => props.theme.color.font.desc};
    }

    & > input:focus {
        outline: 0;
    }

    &:focus-within {
        border: 1px solid ${(props) => props.theme.color.theme.main};
    }
`

export const PortList = styled.ul`
    display: flex;
`

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

export const SettingListItemEnv = styled(SettingListItem)`
    & > p {
        width: 17%;
        padding-top: 7px;
    }
`

export const EnvWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

`

export const EnvCatetoryWrapper = styled.div`
    display: flex;
    padding: 7px 0 15px 2px;

    & > p:first-child {
        width: calc(50% - 14px);
    }
`

export const EnvList = styled.ul`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const EnvListItem = styled.li`
    display: flex;
    align-items: center;

    & > label {
        ${IROnly}
    }

    & > input {
        width: calc(48% - 16px);
        margin-right: 2%;
        padding: 8px;
        border: 1px solid ${props => props.theme.color.border.normal};
        border-radius: ${props => props.theme.borderRadius.lv1};

        &:focus {
            outline: 0;
            border: 1px solid ${props => props.theme.color.theme.main};
        }
    }
`

export const EnvDelButton = styled.button`
    display: flex;
    align-items: center;
    padding: 9px 11px;
    background-color: ${props => props.theme.color.font.disable};
    border-radius: ${props => props.theme.borderRadius.lv1};
    color: ${props => props.theme.color.font.reverse};

    & > span {
        ${IROnly}
    }
`

export const EnvAddButton = styled.button`
    width: fit-content;
    margin-top: 12px;
    padding: 8px 16px;
    background-color: ${props => props.theme.color.theme.main};
    border-radius: ${props => props.theme.borderRadius.lv1};
    color: ${props => props.theme.color.background.content};
    font-size: ${props => props.theme.fontSize.button};
`