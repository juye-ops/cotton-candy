import { useEffect, useRef, useState } from 'react';

import ConfirmButton from 'components/buttons/confirmbutton/ConfirmButton';
import SoftwareButton from 'components/buttons/softwarebutton/SoftwareButton';
import SettingDropBox from 'components/dropbox/settingdropbox/SettingDropBox';

import PreventDefault from 'utils/PreventDefault';
import * as API from 'apis/SettingPageAPIs';

import * as S from './style'
import react_logo from 'assets/react_logo.svg'

// 나중에 받아오던가 처리
const infraList = [
    {
        image: react_logo,
        name: "React",
    },
    {
        image: react_logo,
        name: "React2",
    },
    {
        image: react_logo,
        name: "React3",
    }
];

const frameworkList = [
    {
        image: react_logo,
        name: "React",
    },
    {
        image: react_logo,
        name: "React2",
    },
    {
        image: react_logo,
        name: "React3",
    }
];

const dbList = [
    {
        image: react_logo,
        name: "React4",
    },
    {
        image: react_logo,
        name: "React5",
    },
    {
        image: react_logo,
        name: "React6",
    }
];

export default function SettingPage() {
    // 사용자 입력 관련
    const [inputs, setInputs] = useState({
        name: "",
        desc: "",
    });
    const inputsRef = useRef([]);

    const onChangeInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }

    // infra 관련
    const [infra, setInfra] = useState("");
    const [infraVersionList, setInfraVersionList] = useState([]);
    const [infraVersion, setInfraVersion] = useState("버전을 선택해주세요.");

    useEffect(() => {
        // setInfra(infraList[0].name);
    }, []);

    useEffect(() => {
        if (infra === "") {
            return;
        }

        setInfraVersionList(API.getInfraVersion(infra));
    }, [infra]);

    useEffect(() => {
        if (infraVersionList.length === 0) {
            return;
        }

        setInfraVersion(infraVersionList[0]);
    }, [infraVersionList]);

    const onClickInfraButton = (e) => {
        const target = e.currentTarget;
        const name = target.querySelector("span").innerText;

        if (name === infra) {
            return;
        }

        setInfra(name);
    }

    // platform 관련
    const [platform, setPlatorm] = useState("");
    const [platformVersionList, setPlatformVersionList] = useState([]);
    const [platformVersion, setPlatformVersion] = useState("버전을 선택해주세요.");

    useEffect(() => {
        // setPlatorm(frameworkList[0].name);
    }, []);

    useEffect(() => {
        if (platform === "") {
            return;
        }

        setPlatformVersionList(API.getPlatformVersion(platform));
    }, [platform]);

    useEffect(() => {
        if (platformVersionList.length === 0) {
            return;
        }

        setPlatformVersion(platformVersionList[0]);
    }, [platformVersionList]);

    const onClickPlatformButton = (e) => {
        const target = e.currentTarget;
        const name = target.querySelector("span").innerText;

        if (name === platform) {
            return;
        }

        setPlatorm(name);
    }

    // 포트 관련
    const [ports, setPorts] = useState("");
    const portRef = useRef();

    const onChangePorts = (e) => {
        const reg = /[^0-9,\s]/g;

        setPorts(e.target.value.replace(reg, ''));
    }

    // 환경 변수 관련
    const [envs, setEnvs] = useState([{ key: '', value: '' }]);
    const envsRef = useRef([]);

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

    // 생성 버튼
    const onClickGenerateButton = () => {
        const envRst = {};

        envs.forEach(env => {
            if (env.key === '' || env.value === '') {
                return;
            }

            envRst[env.key] = env.value;
        })

        const generate = {
            "project": inputs.name,
            "description": inputs.desc,
            "gpu": "false",
            "build": {
                "os": {
                    "name": infra,
                    "version": infraVersion,
                },
                "platfroms": [
                    {
                        "name": platform,
                        "version": platformVersion,
                    }
                ]
            },
            "settings": {
                "ports": ports.replace(" ", "").split(","),
                "environments": envRst,
            }
        }

        API.generateContainer(JSON.stringify(generate));
    }

    return (
        <>
            <S.Header>
                <h1>COTTON CANDY</h1>
            </S.Header>
            <S.Main>
                <S.Section>
                    <S.SectionHeader>
                        <S.SectionHeaderBackLink to='/manage'>
                            <span>Back</span>
                            <i className="fas fa-arrow-left"></i>
                        </S.SectionHeaderBackLink>
                        <h2>Generate New Container</h2>
                        <ConfirmButton props={{ content: "Generate", callback: onClickGenerateButton }} />
                    </S.SectionHeader>
                    <S.Form action="" onClick={PreventDefault}>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>이름 설정 영역</S.IROnlyFieldSetLegend>
                            <label htmlFor="nameInput">이름</label>
                            <input type="text" id='nameInput' name='name' ref={(element) => (inputsRef.current[0] = element)} onChange={onChangeInput} placeholder='프로젝트 이름을 입력해주세요.' value={inputs.name} />
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>설명 설정 영역</S.IROnlyFieldSetLegend>
                            <label htmlFor="descInput">설명<span>(선택 영역)</span></label>
                            <S.DescTextArea id='descInput' name='desc' ref={(element) => (inputsRef.current[1] = element)} onChange={onChangeInput} placeholder='컨테이너 설명을 입력해주세요.' value={inputs.desc} />
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>설명 설정 영역</S.IROnlyFieldSetLegend>
                            <p>프로젝트</p>
                            <p>TEST</p>
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>GPU 설정 영역</S.IROnlyFieldSetLegend>
                            <p>GPU</p>
                            <S.ScopeList>
                                <input type="radio" id='useGpu' name='useGpu' disabled />
                                <label htmlFor="useGpu">사용</label>
                                <input type="radio" id='notUseGpu' name='useGpu' defaultChecked />
                                <label htmlFor="notUseGpu">미사용</label>
                            </S.ScopeList>
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>OS 설정 영역</S.IROnlyFieldSetLegend>
                            <p>OS</p>
                            <div>
                                <S.SoftwareStackList>
                                    {
                                        infraList.map(infraItem => {
                                            return (
                                                <li key={infraItem.name}>
                                                    <SoftwareButton props={{ image: infraItem.image, name: infraItem.name, callback: onClickInfraButton, selected: infra }} />
                                                </li>
                                            )
                                        })
                                    }
                                </S.SoftwareStackList>
                                <S.SettingList>
                                    <S.SettingListItem>
                                        <p>Version</p>
                                        <SettingDropBox props={{ list: infraVersionList, target: infraVersion, callback: setInfraVersion }} />
                                    </S.SettingListItem>
                                </S.SettingList>
                            </div>
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>Platform 설정 영역</S.IROnlyFieldSetLegend>
                            <p>Platform <span>(Optional)</span></p>
                            <div>
                                <S.SettingTitle>Frameworks & Libraries</S.SettingTitle>
                                <S.SoftwareStackList>
                                    {
                                        frameworkList.map(infraItem => {
                                            return (
                                                <li key={infraItem.name}>
                                                    <SoftwareButton props={{ image: infraItem.image, name: infraItem.name, callback: onClickPlatformButton, selected: platform }} />
                                                </li>
                                            )
                                        })
                                    }
                                </S.SoftwareStackList>
                                <S.SettingTitle>Databases</S.SettingTitle>
                                <S.SoftwareStackList>
                                    {
                                        dbList.map(infraItem => {
                                            return (
                                                <li key={infraItem.name}>
                                                    <SoftwareButton props={{ image: infraItem.image, name: infraItem.name, callback: onClickPlatformButton, selected: platform }} />
                                                </li>
                                            )
                                        })
                                    }
                                </S.SoftwareStackList>
                                <S.SettingList>
                                    <S.SettingListItem>
                                        <p>Version</p>
                                        <SettingDropBox props={{ list: platformVersionList, target: platformVersion, callback: setPlatformVersion }} />
                                    </S.SettingListItem>
                                </S.SettingList>
                            </div>
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>환경 설정 영역</S.IROnlyFieldSetLegend>
                            <p>환경설정</p>
                            <S.SettingList>
                                <S.SettingListItemPort>
                                    <label htmlFor='port'>Port</label>
                                    <input type="text" name="port" id="port" placeholder='포트 번호를 입력해주세요. (포트가 여러개일 경우 쉼표로 구분해주세요.)' ref={(element) => portRef.current = element} value={ports} onChange={onChangePorts} />
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
                                                                ref={(element) => envsRef.current[2 * index] = element}
                                                                onChange={(e) => handleInputChange(index, e)} />
                                                            <label htmlFor={'value' + index}>값 입력</label>
                                                            <input 
                                                                type="text" 
                                                                placeholder='value 값 입력'
                                                                id={'value' + index}
                                                                name='value'
                                                                value={envItem.value}
                                                                ref={(element) => envsRef.current[2 * index + 1] = element}
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
            </S.Main >
        </>
    )
}