import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import * as S from './style'

import ConfirmButton from 'components/buttons/confirmbutton/ConfirmButton';
import PortHashTag from 'components/hashtags/porthashtags/PortHashTag';
import LongInput1 from 'components/inputs/longinput1';

import PreventDefault from 'utils/PreventDefault';

import { UpdateContainer } from 'apis/ContainerAPIs';
import LongTextarea1 from 'components/textareas/longtextarea1';

export default function ContainerModifyPage() {
    const { projectName, containerName } = useParams();
    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1);
    }

    // 현재 컨테이너 정보
    const [nowContainer, setNowContainer] = useState({});

    useEffect(() => {
        // 비동기로 컨테이너 데이터 불러오기


        setNowContainer(
            {
                "project": "test",
                "name": "test_container",
                "description": "test description",
                "gpu": false,
                "build": {
                    "os": {
                        "name": "ubuntu",
                        "version": "20.04"
                    },
                    "frameworks": [
                        {
                            "name": "python",
                            "version": "3.9"
                        },
                        {
                            "name": "node",
                            "version": "20"
                        }
                    ]
                },
                "settings": {
                    "ports": [
                        "8080",
                        "8081",
                        "8082"
                    ],
                    "environments": {
                        "key01": "value01"
                    }
                }
            }
        )
    }, [containerName]);

    // 사용자 입력 관련
    const [inputs, setInputs] = useState({
        name: "",
        desc: "",
    });
    const [validState, setValidState] = useState("");

    const onChangeInput = (e) => {
        if (e.target.name === "name") {
            const reg = /[a-z,A-Z,-,_,0-9]/g;
            const rst = e.target.value.replace(reg, '');

            setValidState(!!rst ? "알파벳, 숫자, 하이픈(-), 언더바(_)만 입력해야 합니다!" : "");
        } 
        
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    // 포트 관련
    const [portInput, setPortInput] = useState("");
    const [ports, setPorts] = useState([]);
    const portRef = useRef();

    const onChangePortInput = (e) => {
        const reg = /[^0-9,\s]/g;
        const value = e.target.value.replace(reg, '');

        if (value.slice(-1) === ' ') {
            if (parseInt(value.slice(0, -1)) <= 65535 && parseInt(value.slice(0, -1)) > 0 && !ports.includes(parseInt(value.slice(0, -1)))) {
                setPorts([...ports, parseInt(value.slice(0, -1))]);
            }

            setPortInput("");
        }  else {
            setPortInput(value);
        }
    }

    const onKeyDownInput = (e) => {
        if (!portInput && e.keyCode === 8) {
            setPorts(ports => ports.slice(0, -1));
        }
    }

    const onClickPortDelete = (e) => {
        const value = e.currentTarget.querySelector('span').innerText;

        setPorts(ports.filter(port => "" + port !== value));
    }

    // 환경 변수 관련
    const [envs, setEnvs] = useState([{ key: '', value: '' }]);

    const handleAddEnv = () => {
        setEnvs([...envs, { key: '', value: '' }]);
    }

    const handleReomveEnv = (index) => {
        if (envs.length === 1) {
            return;
        }

        const values = [...envs];

        values.splice(index, 1);
        setEnvs(values);
    }

    const handleInputChange = (index, e) => {
        const values = [...envs];

        if (e.target.name === 'key') {
            values[index].key = e.target.value;
        } else {
            values[index].value = e.target.value;
        }

        setEnvs(values);
    }

    // 컨테이너 불러오기 성공 시 데이터 업데이트
    useEffect(() => {
        if (!nowContainer.name) {
            return;
        }

        setInputs({
            name: nowContainer.name,
            desc: nowContainer.description,
        });

        setPorts(nowContainer.settings.ports);

        const nowEnvs = [];

        Object.keys(nowContainer.settings.environments).forEach(key => {
            nowEnvs.push({
                key: key,
                value: nowContainer.settings.environments[key],
            })
        });

        setEnvs([
            ...nowEnvs,
            { key: '', value: '' }
        ])
    }, [nowContainer]);

    // 생성 버튼
    const onClickGenerateButton = async () => {
        if (!inputs.name) {
            alert('이름을 입력해주세요.');

            return;
        }

        if (validState) {
            alert('이름에는 알파벳, 숫자, 하이픈(-), 언더바(_)만 입력해야 합니다!');

            return;
        }

        const envRst = {};

        envs.forEach(env => {
            if (env.key === '' || env.value === '') {
                return;
            }

            envRst[env.key] = env.value;
        });

        const result = await UpdateContainer(JSON.stringify({
            "project": projectName,
            "old_name": containerName,
            "new_name": inputs.name,
            "description": inputs.desc,
            "gpu": false,
            "settings": {
                "ports": ports,
                "environments": envRst,
            }
        }));

        console.log(result);

        if (result === 200) {
            navigate("/" + projectName);
        } else {
            alert("컨테이너 생성 실패");
        }
    }

    return (
        <S.Wrapper>
            <S.Section>
                <S.SectionHeader>
                    <S.SectionHeaderWrapper>
                        <S.SectionHeaderBackLink onClick={(e) => { e.preventDefault(); onClickBack(); }} to={'/'}>
                            <span>Back</span>
                            <i className="fas fa-arrow-left"></i>
                        </S.SectionHeaderBackLink>
                        <h2>Update {containerName}</h2>
                        <ConfirmButton props={{ content: "Update", callback: onClickGenerateButton }} />
                    </S.SectionHeaderWrapper>
                </S.SectionHeader>
                <S.Form action="">
                    <S.DivideFieldSet>
                        <S.IROnlyFieldSetLegend>이름 설정 영역</S.IROnlyFieldSetLegend>
                        <LongInput1 props={{ id: "nameInput", name: "name", placeholder: "Container Name", value: inputs.name, callback: onChangeInput }} />
                        <S.ValidText visible={!!validState}>{validState}</S.ValidText>
                    </S.DivideFieldSet>
                    <S.InputFieldset>
                        <S.IROnlyFieldSetLegend>설명 설정 영역</S.IROnlyFieldSetLegend>
                        {/* { id, placeholder, value, callback } */}
                        <LongTextarea1 props={{ id: "descInput", name: "desc", placeholder: "Container Description", value: inputs.desc, callback: onChangeInput }} />
                    </S.InputFieldset>
                    <S.DivideFieldSet onClick={PreventDefault}>
                        <S.IROnlyFieldSetLegend>GPU 설정 영역</S.IROnlyFieldSetLegend>
                        <p>GPU</p>
                        <S.ScopeList>
                            <input type="radio" id='useGpu' name='useGpu' disabled />
                            <label htmlFor="useGpu">사용</label>
                            <input type="radio" id='notUseGpu' name='useGpu' defaultChecked />
                            <label htmlFor="notUseGpu">미사용</label>
                        </S.ScopeList>
                    </S.DivideFieldSet>
                    <S.DivideFieldSet onClick={PreventDefault}>
                        <S.IROnlyFieldSetLegend>OS 설정 영역</S.IROnlyFieldSetLegend>
                        <p>OS</p>
                        <p>{nowContainer.name ? nowContainer.build.os.name + " - " + nowContainer.build.os.version : ""}</p>
                    </S.DivideFieldSet>
                    <S.DivideFieldSet onClick={PreventDefault}>
                        <S.IROnlyFieldSetLegend>Platform 설정 영역</S.IROnlyFieldSetLegend>
                        <p>Platforms</p>
                        <S.SoftwareVersionList>
                            {
                                nowContainer.name ? nowContainer.build.frameworks.map(framework => {
                                    return (
                                        <li key={framework.name}>
                                            <p>{framework.name + " - " + framework.version}</p>
                                        </li>
                                    )
                                }) : <></>
                            }
                        </S.SoftwareVersionList>
                    </S.DivideFieldSet>
                    <S.DivideFieldSet onClick={PreventDefault}>
                        <S.IROnlyFieldSetLegend>환경 설정 영역</S.IROnlyFieldSetLegend>
                        <p>환경설정</p>
                        <S.SettingList>
                            <S.SettingListItemPort>
                                <label htmlFor='port'>Port</label>
                                <S.PortInputWarpper>
                                    <S.PortList>
                                        {
                                            ports.map((portNo, index) => {
                                                return (
                                                    <PortHashTag props={{ index, portNo, onClickPortDelete }} key={index + ':' + portNo} />
                                                )
                                            })
                                        }
                                    </S.PortList>
                                    <input type="text" name="port" id="port" placeholder='포트 번호를 입력해주세요. (스페이스 키를 눌러 입력을 완료하세요)' ref={(element) => portRef.current = element} value={portInput} onChange={onChangePortInput} onKeyDown={onKeyDownInput} />
                                </S.PortInputWarpper>
                            </S.SettingListItemPort>
                            <S.SettingListItemEnv>
                                <p>Envs</p>
                                <S.EnvWrapper>
                                    <S.EnvCatetoryWrapper>
                                        <p>key</p>
                                        <p>value</p>
                                    </S.EnvCatetoryWrapper>
                                    <S.EnvList>
                                        {
                                            envs.map((envItem, index) => {
                                                return (
                                                    <S.EnvListItem key={index + "env"}>
                                                        <label htmlFor={'key' + index}>키 입력</label>
                                                        <input
                                                            type="text"
                                                            placeholder='key 값 입력'
                                                            id={'key' + index}
                                                            name='key'
                                                            value={envItem.key}
                                                            onChange={(e) => handleInputChange(index, e)} />
                                                        <label htmlFor={'value' + index}>값 입력</label>
                                                        <input
                                                            type="text"
                                                            placeholder='value 값 입력'
                                                            id={'value' + index}
                                                            name='value'
                                                            value={envItem.value}
                                                            onChange={(e) => handleInputChange(index, e)} />
                                                        <S.EnvDelButton onClick={() => handleReomveEnv(index)}>
                                                            <i className="fas fa-times"></i>
                                                            <span>{envItem.key}</span>
                                                        </S.EnvDelButton>
                                                    </S.EnvListItem>
                                                );
                                            })
                                        }
                                    </S.EnvList>
                                    <S.EnvAddButton onClick={handleAddEnv}>
                                        <span>New Variable</span>
                                    </S.EnvAddButton>
                                </S.EnvWrapper>
                            </S.SettingListItemEnv>
                        </S.SettingList>
                    </S.DivideFieldSet>
                </S.Form>
            </S.Section>
        </S.Wrapper>
    )
}