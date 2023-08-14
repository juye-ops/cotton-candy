import * as S from './style';

export default function ConfirmButton({ props: { content, callback } }) {
    return (
        <S.ConfirmButton onClick={callback}>{content}</S.ConfirmButton>
    )
}

