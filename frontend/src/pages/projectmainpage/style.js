import styled from "styled-components";

export const Wrapper = styled.div`
    width: calc(100vw - 280px);
`

export const Section = styled.section`
    padding: 55px 40px;
    height: calc(100vh - 92px);
    font-family: 'Rubik', sans-serif;
`

export const SectionHeader = styled.header`
    width: 100%;
    padding-left: 15px;
`

export const SectionHeaderWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 32px;

    & i {
        vertical-align: -2px;
    }

    & > h2 {
        font-family: 'Ubuntu', sans-serif;
        font-size: ${(props) => props.theme.fontSize.pageMain};
        font-weight: 700;
    }
`

export const ProjectList = styled.ul`
    height: calc(100vh - 229px);
    padding-bottom: 55px;
    margin-top: 50px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: 20px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        display: none;
    }
`

export const CreateProjectButton = styled.button`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 180px;
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
        resize: vertical;
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

export const DeleteModal = styled.div`
    width: 480px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 40px 30px;
    background-color: ${props => props.theme.color.background.content};
    border-radius: ${props => props.theme.borderRadius.lv2};
    color: ${props => props.theme.color.font.main};
`

export const DeleteButtonWrapper = styled.div`
    display: flex;
    gap: 15px;

    & > button {
        width: 100%;
    }
`

export const DeleteButton = styled.button`
    margin-left: auto;
    color: white;
    padding: 8px 16px;
    background-color: ${(props) => props.theme.color.theme.sub};
    font-size: ${(props) => props.theme.fontSize.button};
    border-radius: ${(props) => props.theme.borderRadius.lv2};
`