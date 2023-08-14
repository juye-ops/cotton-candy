import { useRef, useState } from 'react';

import PreventDefault from 'utils/PreventDefault';
import * as API from 'apis/SettingPageAPIs';

import * as S from './style'
import ConfirmButton from 'components/buttons/confirmbutton/ConfirmButton';

export default function ProjectSettingPage() {
    // 사용자 입력 관련
    const [inputs, setInputs] = useState({
        name: "",
        desc: "",
    });
    const inputsRef = useRef([]);

    const onChangeInput = (e) => {
        if (e.target.name === "name") {
            const reg = /[^a-z,A-Z,-,_,0-9]/g;
            const rst = e.target.value.replace(reg, '');

            setInputs({
                ...inputs,
                "name": rst,
            });
        } else {
            setInputs({
                ...inputs,
                [e.target.name]: e.target.value,
            });
        }
    }

    // 생성 버튼
    const onClickGenerateButton = () => {
        const generate = {
            "name": inputs.name,
            "description": inputs.desc,
        }

        API.generateContainer(JSON.stringify(generate));
    }

    return (
        <>
            <S.Header>
                <h1>COTTON CANDY</h1>
            </S.Header>
            <main>
                <S.Section>
                    <S.SectionHeader>
                        <S.SectionHeaderWrapper>
                            <S.SectionHeaderBackLink to='/'>
                                <span>Back</span>
                                <i className="fas fa-arrow-left"></i>
                            </S.SectionHeaderBackLink>
                            <h2>Create New Project</h2>
                            <ConfirmButton props={{ content: "Generate", callback: onClickGenerateButton }}/>
                        </S.SectionHeaderWrapper>
                    </S.SectionHeader>
                    <S.Form action="" onClick={PreventDefault}>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>이름 설정 영역</S.IROnlyFieldSetLegend>
                            <label htmlFor="nameInput">이름</label>
                            <input type="text" id='nameInput' name='name' ref={(element) => (inputsRef.current[0] = element)} onChange={onChangeInput} placeholder='프로젝트 이름을 입력해주세요. (알파벳, 숫자, 하이픈(-), 언더바(_)만 입력해야 합니다.)' value={inputs.name} />
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>설명 설정 영역</S.IROnlyFieldSetLegend>
                            <label htmlFor="descInput">설명</label>
                            <S.DescTextArea id='descInput' name='desc' ref={(element) => (inputsRef.current[1] = element)} onChange={onChangeInput} placeholder='컨테이너 설명을 입력해주세요.' value={inputs.desc} />
                        </S.DivideFieldSet>
                    </S.Form>
                </S.Section>
            </main>
        </>
    )
}