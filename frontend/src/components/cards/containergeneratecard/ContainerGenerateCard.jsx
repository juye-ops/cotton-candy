import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import * as S from './style';

import { GenerateContainer } from 'apis/ContainerAPIs';

import { clearGeneratingContainer, updateGenerateState } from 'redux/slice/containerSlice';

export default function ContainerGenerateCard({ props: { container } }) {
    const dispatch = useDispatch();
    const location = useLocation();

    const generateContainer = async () => {
        dispatch(updateGenerateState({
            name: container.name,
        }));

        await GenerateContainer(JSON.stringify({
            ...container,
        }));

        dispatch(clearGeneratingContainer({
            name: container.name,
        }));

        if (location.pathname === window.location.pathname) {
            window.location.reload();
        }
    }

    if (!container.generate) {
        generateContainer();
    }

    return (
        <S.Container>
            <S.ContainerHeader>
                <S.ConatinerState>
                </S.ConatinerState>
                <h3>{container.name}</h3>
                <S.MoreButtonWrapper>
                    <S.MoreButton>
                        <i className="fas fa-ellipsis-h"></i>
                        <span>{container.name}</span>
                        <span>more</span>
                    </S.MoreButton>
                </S.MoreButtonWrapper>
            </S.ContainerHeader>
            <S.ContainerDesc>{container.description}</S.ContainerDesc>
            <S.ExecuteLink>
                <i className="fa-solid fa-play"></i>
                <span>Execute</span>
            </S.ExecuteLink>
            <S.AnimationWrapper>
                <S.AnimationContainer>
                    <S.Cloud></S.Cloud>
                    <S.Rain>
                        <S.RainDrop duration='96'></S.RainDrop>
                        <S.RainDrop duration='87'></S.RainDrop>
                        <S.RainDrop duration='47'></S.RainDrop>
                        <S.RainDrop duration='67'></S.RainDrop>
                        <S.RainDrop duration='93'></S.RainDrop>
                        <S.RainDrop duration='55'></S.RainDrop>
                        <S.RainDrop duration='49'></S.RainDrop>
                        <S.RainDrop duration='82'></S.RainDrop>
                        <S.RainDrop duration='79'></S.RainDrop>
                        <S.RainDrop duration='69'></S.RainDrop>
                        <S.RainDrop duration='91'></S.RainDrop>
                        <S.RainDrop duration='39'></S.RainDrop>
                        <S.RainDrop duration='63'></S.RainDrop>
                        <S.RainDrop duration='84'></S.RainDrop>
                        <S.RainDrop duration='77'></S.RainDrop>
                        <S.RainDrop duration='40'></S.RainDrop>
                        <S.RainDrop duration='91'></S.RainDrop>
                        <S.RainDrop duration='59'></S.RainDrop>
                        <S.RainDrop duration='78'></S.RainDrop>
                        <S.RainDrop duration='86'></S.RainDrop>
                    </S.Rain>
                </S.AnimationContainer>
                <S.Text>Creating Container...</S.Text>
            </S.AnimationWrapper>
        </S.Container>
    )
}
