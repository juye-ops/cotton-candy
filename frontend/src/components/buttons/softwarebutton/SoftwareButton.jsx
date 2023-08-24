import * as S from './style'

export default function SoftwareButton({ props: { image, name, callback, selected, added } }) {
    return (
        <S.SoftwareButton onClick={callback} selected={selected === name} added={added} >
            <img src={image} alt="" />
            <span>{name}</span>
        </S.SoftwareButton>
    )
}
