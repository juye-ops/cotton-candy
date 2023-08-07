import * as S from './style';

export default function PortHashTag({ props: { index, portNo, onClickPortDelete } }) {
    return (
        <S.PortListItem>
            <span>{portNo}</span>
            <S.PortListItemButton onClick={onClickPortDelete}>
                <span>{portNo}</span>
                <i className="fas fa-times"></i>
            </S.PortListItemButton>
        </S.PortListItem>
    )
}
