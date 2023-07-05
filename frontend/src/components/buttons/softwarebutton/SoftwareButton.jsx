import * as S from './style'

export default function SoftwareButton({ props: { image, name, callback, selected } }) {
    return (
        <S.SoftwareButton onClick={callback} selected={selected === name} >
            <img src={image} alt="" />
            <span>{name}</span>
        </S.SoftwareButton>
    )
}
