import styled from "styled-components";
import IROnly from "styles/IROnly";

export const Wrapper = styled.div`
    max-width: 1140px;
    margin: 0 auto;
`

export const Header = styled.header`
    ${IROnly}
`

export const Section = styled.section`
    margin-top: 50px;
    font-family: 'Rubik', sans-serif;
    margin-bottom: 50px;
`

export const SectionHeader = styled.header`
    width: 100%;
    background-color: rgba(247, 247, 250, 0.6);
    top: 0;
    left: 0;
    padding: 100px 0 30px;
`

export const SectionHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: ${(props) => props.theme.width.wrapperWidth};

    & > h2 {
        font-family: 'Ubuntu', sans-serif;
        font-size: 48px;
        font-weight: 700;
        margin: 0 auto;
    }
`

export const ProjectList = styled.ul`
    margin-top: 112px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
`

export const CreateProjectWrapper = styled.div`
    width: 100%;
    padding: 5px;
`

export const CreateProjectButton = styled.button`
    display: flex;
    width: 100%;
    height: 170px;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 700;
    background-color: inherit;
    border: 3px dashed ${props => props.theme.color.theme.main};
    border-radius: ${props => props.theme.borderRadius.lv2};
    color: ${props => props.theme.color.theme.main};
    font-size: ${props => props.theme.fontSize.pageSub};
    

    &:hover {
        background-color: ${props => props.theme.color.background.dark};
    }

    & > span {
        margin-left: 10px;
    }
`

export const ModalWrapper = styled.div`
    display: ${props => props.visible ? "blick" : "none"};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: ${props => props.theme.color.background.wrapper};
`

export const ModalForm = styled.form`
    width: 480px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${props => props.theme.borderRadius.lv3};
    background-color: ${props => props.theme.color.background.content};

    & > label {
        margin-bottom: 8px;
        font-size: ${(props) => props.theme.fontSize.button};
    }

    & > input, & > textarea {
        border: 1px solid ${(props) => props.theme.color.border.normal};
        border-radius: ${(props) => props.theme.borderRadius.lv2};
        padding: 8px 13px;
        margin-bottom: 30px;
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
`

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
`

export const FormButton = styled.button`
    width: 100%;
    height: 32px;
    font-family: 'Rubik', sans-serif;
    font-size: ${(props) => props.theme.fontSize.button};
    border-radius: ${(props) => props.theme.borderRadius.lv2};
    color: ${(props) => props.theme.color.font.reverse};
`

export const ConfirmButton = styled(FormButton)`
    background-color: ${props => props.theme.color.theme.main};
`

export const CancelButton = styled(FormButton)`
    background-color: ${props => props.theme.color.theme.sub};
`