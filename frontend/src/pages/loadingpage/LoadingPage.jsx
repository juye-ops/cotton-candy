import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import * as S from './style';

import { GenerateContainer } from 'apis/ContainerAPIs';

export default function LoadingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const generateContainer = async () => {
            await GenerateContainer(JSON.stringify(location.state.body));
            
            navigate("/" + location.state.body.project);
        }

        generateContainer();
    }, []);

    return (
        <>
            <S.Header>
                <h1>Loading Page</h1>
            </S.Header>
            <main>
                <S.Section>
                    <header>
                        <h2>Animation Section</h2>
                    </header>
                    <S.Container>
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
                    </S.Container>
                    <S.Text>Creating Container...</S.Text>
                </S.Section>
            </main>
        </>
    )
}
