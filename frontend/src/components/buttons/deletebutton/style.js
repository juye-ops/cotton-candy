import styled from "styled-components";

export const DeleteButtonWrapper = styled.div`
    margin-left: auto;
`

export const DeleteButton = styled.button`
    margin-left: auto;
    color: white;
    padding: 8px 16px;
    background-color: ${(props) => props.theme.color.theme.sub};
    font-size: ${(props) => props.theme.fontSize.button};
    border-radius: ${(props) => props.theme.borderRadius.lv2};
`

export const DeleteModalWraper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(150, 150, 150, 0.5);
    display: ${props => props.clicked ? 'block' : 'none'};
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

export const ButtonWrapper = styled.div`
    display: flex;
    gap: 15px;

    & > button {
        width: 100%;
    }
`