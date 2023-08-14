import styled from "styled-components";
import IROnly from "styles/IROnly";
import { Link } from "react-router-dom";

export const Header = styled.header`
    ${IROnly}
`

export const Section = styled.main`
    font-family: 'Rubik', sans-serif;
    max-width: ${(props) => props.theme.width.wrapperWidth};
    margin: 0 auto;
`

export const SectionHeader = styled.header`
    width: 100%;
    background-color: rgba(247, 247, 250, 0.6);
    backdrop-filter: blur(10px);
    position: fixed;
    top: 0;
    left: 0;
    padding: 50px 0 30px;
    z-index: 200;
`

export const SectionHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: ${(props) => props.theme.width.wrapperWidth};

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
    margin-top: 112px;

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