import * as S from './style';

export default function LongInput1({ props: { id, name, placeholder, value, callback, readonly } }) {
    return (
        <S.Wrapper isFill={!!value}>
            <label htmlFor={id}>{placeholder}</label>
            <S.Input type='text' id={id} name={name} value={value} onChange={callback} isFill={!!value} readOnly={readonly} />
        </S.Wrapper>
    )
}
