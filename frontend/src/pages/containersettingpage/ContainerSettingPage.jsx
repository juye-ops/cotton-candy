import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

import * as S from './style'

import ConfirmButton from 'components/buttons/confirmbutton/ConfirmButton';
import SoftwareButton from 'components/buttons/softwarebutton/SoftwareButton';
import SettingDropBox from 'components/dropbox/settingdropbox/SettingDropBox';
import PortHashTag from 'components/hashtags/porthashtags/PortHashTag';
import LongInput1 from 'components/inputs/longinput1';
import LongTextarea1 from 'components/textareas/longtextarea1';

import PreventDefault from 'utils/PreventDefault';

import { GetOSList, GetOSVersionList, GetPlatformList, GetPlatformVersionList, GenerateContainer } from 'apis/ContainerAPIs';

import { Images } from 'utils/Images';

const osSelectText = "Select your Operating-System";

export default function ContainerSettingPage() {
    const { projectName } = useParams();
    const navigate = useNavigate();

    const onClickBack = () => {
        navigate(-1);
    }

    // 사용자 입력 관련
    const [inputs, setInputs] = useState({
        name: "",
        desc: "",
    });
    const [validState, setValidState] = useState("");

    const onChangeInput = (e) => {
        if (e.target.name === "name") {
            const reg = /[a-z,A-Z,\-,_,0-9]/g;
            const rst = e.target.value.replace(reg, '');

            setValidState(!!rst ? "알파벳, 숫자, 하이픈(-), 언더바(_)만 입력해야 합니다!" : "");
        }

        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    // infra 관련
    const [infraList, setInfraList] = useState([]);
    const [infra, setInfra] = useState("");
    const [infraVersionList, setInfraVersionList] = useState([]);
    const [infraVersion, setInfraVersion] = useState(osSelectText);

    useEffect(() => {
        const getOSList = async () => {
            const result = await GetOSList();

            setInfraList(result);
        }

        getOSList();
    }, []);

    useEffect(() => {
        if (infra === "") {
            return;
        }

        const getOSVersionList = async () => {
            const result = await GetOSVersionList(infra);

            setInfraVersionList(result.sort().reverse());
        }

        getOSVersionList();
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
    const [platformList, setPlatformList] = useState([]);
    const [platform, setPlatform] = useState("");
    const [platformVersionList, setPlatformVersionList] = useState([]);
    const [platformVersion, setPlatformVersion] = useState("버전을 선택해주세요.");
    const [selectedPlatforms, setSelectedPlatforms] = useState([]);

    useEffect(() => {
        const getPlatformList = async () => {
            const result = await GetPlatformList();

            setPlatformList(result);
        }

        getPlatformList();
    }, []);

    useEffect(() => {
        if (platform === "") {
            return;
        }

        const getOSPlatformList = async () => {
            const result = await GetPlatformVersionList(platform);

            setPlatformVersionList(result.sort().reverse());
        }

        getOSPlatformList();
    }, [platform]);

    const onClickPlatformButton = (e) => {
        const target = e.currentTarget;
        const name = target.querySelector("span").innerText;

        if (name === platform) {
            return;
        }

        setPlatform(name);
    }

    const onClickPlatformAddButton = () => {
        if (platform === "") {
            return;
        }

        if (platformVersion === '버전을 선택해주세요.') {
            return;
        }

        setSelectedPlatforms([
            ...selectedPlatforms,
            {
                name: platform,
                version: platformVersion,
            }
        ]);
        setPlatform("");
        setPlatformVersionList([]);
        setPlatformVersion("버전을 선택해주세요.");
    }

    useEffect(() => {
        if (platformVersion === '버전을 선택해주세요.') {
            return;
        }

        onClickPlatformAddButton();
    }, [platformVersion]);

    const onClickPlatformRemoveButton = (e) => {
        const target = e.currentTarget.querySelector('span').innerText;
        const temps = [...selectedPlatforms];

        setSelectedPlatforms(temps.filter(temp => temp.name !== target));
    }

    // 포트 관련
    const [portInput, setPortInput] = useState("");
    const [ports, setPorts] = useState([]);
    const [portValidState, setPortValidState] = useState("");

    const onChangePortInput = (e) => {
        const reg = /[^0-9,\s]/g;
        const value = e.target.value.replace(reg, '');

        if (value.slice(-1) === ' ') {
            if (parseInt(value.slice(0, -1)) > 65535 || parseInt(value.slice(0, -1)) < 1024) {
                setPortValidState("포트 번호는 1024 ~ 65535 사이에 존재해야 합니다.");
            } else if (ports.includes(parseInt(value.slice(0, -1)))) {
                setPortValidState("이미 설정된 포트 번호입니다.");
            } else {
                setPortValidState("");
                setPorts([...ports, parseInt(value.slice(0, -1))]);
            }

            setPortInput("");
        } else {
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
        const reg = /[^a-z,A-Z,_]/g;
        const value = e.target.value.replace(reg, '');

        if (e.target.name === 'key') {
            values[index].key = value;
        } else {
            values[index].value = value;
        }

        setEnvs(values);
    }

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

        if (!infra) {
            alert('os를 선택해주세요.');

            return;
        }

        const envRst = {};

        envs.forEach(env => {
            if (env.key === '' || env.value === '') {
                return;
            }

            envRst[env.key] = env.value;
        });

        navigate('/container/generate', {
            state: {
                body: {
                    "project": projectName,
                    "name": inputs.name,
                    "description": inputs.desc,
                    "gpu": false,
                    "build": {
                        "os": {
                            "name": "ubuntu",
                            "version": "20.04",
                        },
                        "frameworks": selectedPlatforms,
                    },
                    "settings": {
                        "ports": ports,
                        "environments": envRst,
                    }
                }
            }
        });
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
                        <h2>Create New Container</h2>
                        <ConfirmButton props={{ content: "Generate", callback: onClickGenerateButton }} />
                    </S.SectionHeaderWrapper>
                </S.SectionHeader>
                <S.Form action="">
                    <S.InputFieldset>
                        <S.IROnlyFieldSetLegend>이름 설정 영역</S.IROnlyFieldSetLegend>
                        <LongInput1 props={{ id: "nameInput", name: "name", placeholder: "Container Name", value: inputs.name, callback: onChangeInput }} />
                        <S.ValidText visible={!!validState}>{validState}</S.ValidText>
                    </S.InputFieldset>
                    <S.InputFieldset>
                        <S.IROnlyFieldSetLegend>설명 설정 영역</S.IROnlyFieldSetLegend>
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
                        <div>
                            <S.SoftwareStackList>
                                {
                                    infraList.map((infraItem, index) => {
                                        return (
                                            <li key={"" + infraItem + index}>
                                                <SoftwareButton props={{ image: Images[infraItem], name: infraItem, callback: onClickInfraButton, selected: infra }} />
                                            </li>
                                        )
                                    })
                                }
                            </S.SoftwareStackList>
                            <S.SettingList visible={infra !== ""}>
                                <S.SettingListItem>
                                    <p>Version</p>
                                    <SettingDropBox props={{ list: infraVersionList, target: infraVersion, callback: setInfraVersion }} />
                                </S.SettingListItem>
                            </S.SettingList>
                        </div>
                    </S.DivideFieldSet>
                    <S.DivideFieldSet onClick={PreventDefault}>
                        <S.IROnlyFieldSetLegend>Platform 설정 영역</S.IROnlyFieldSetLegend>
                        <p>Platforms <span>(Optional)</span></p>
                        <div>
                            <S.SettingTitle>Frameworks & Libraries</S.SettingTitle>
                            <S.SoftwareStackList>
                                {
                                    platformList.filter(platform => platform.type === 'framework').map(framework => {
                                        let added = false;

                                        selectedPlatforms.forEach((selectedPlatform => {
                                            if (selectedPlatform.name === framework.name) {
                                                added = true;
                                            }
                                        }));

                                        return (
                                            <li key={framework.name}>
                                                <SoftwareButton props={{ image: Images[framework.name], name: framework.name, callback: added ? onClickPlatformRemoveButton : onClickPlatformButton, selected: platform, added: added }} />
                                            </li>
                                        )
                                    })
                                }
                            </S.SoftwareStackList>
                            <S.SettingTitle>Databases</S.SettingTitle>
                            <S.SoftwareStackList>
                                {
                                    platformList.filter(platform => platform.type === 'database').map(db => {
                                        let added = false;

                                        selectedPlatforms.forEach((selectedPlatform => {
                                            if (selectedPlatform.name === db.name) {
                                                added = true;
                                            }
                                        }));

                                        return (
                                            <li key={db.name}>
                                                <SoftwareButton props={{ image: Images[db.name], name: db.name, callback: added ? onClickPlatformRemoveButton : onClickPlatformButton, selected: platform, added: added }} />
                                            </li>
                                        )
                                    })
                                }
                            </S.SoftwareStackList>
                            <S.SettingList visible={platform !== "" || selectedPlatforms.length !== 0}>
                                <S.SettingListItem>
                                    <p>Version</p>
                                    <SettingDropBox props={{ list: platformVersionList, target: platformVersion, callback: setPlatformVersion }} />
                                </S.SettingListItem>
                                <S.SettingListItem>
                                    <p>Selected</p>
                                    <S.SelectedPlatformList>
                                        {
                                            selectedPlatforms.map((selectedPlatform, index) => {
                                                return (
                                                    <S.SelectedPlatformListItem key={'' + selectedPlatform.name + index}>
                                                        <S.SelectedPlatformRemoveButton onClick={onClickPlatformRemoveButton}><span>{selectedPlatform.name}</span><i className="fas fa-minus"></i></S.SelectedPlatformRemoveButton>
                                                        <p><span>{selectedPlatform.name}</span><span>-</span><span>{selectedPlatform.version}</span></p>
                                                    </S.SelectedPlatformListItem>
                                                )
                                            })
                                        }
                                    </S.SelectedPlatformList>
                                </S.SettingListItem>
                            </S.SettingList>
                        </div>
                    </S.DivideFieldSet>
                    <S.DivideFieldSet onClick={PreventDefault}>
                        <S.IROnlyFieldSetLegend>환경 설정 영역</S.IROnlyFieldSetLegend>
                        <p>환경설정</p>
                        <S.SettingList visible={true}>
                            <S.SettingListItemPort>
                                <label htmlFor='port'>Port</label>
                                <S.PortValidWrapper>
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
                                        <input type="text" name="port" id="port" placeholder='포트 번호를 입력해주세요. (스페이스 키를 눌러 입력을 완료하세요)' value={portInput} onChange={onChangePortInput} onKeyDown={onKeyDownInput} />
                                    </S.PortInputWarpper>
                                    <S.ValidText visible={!!portValidState}>{portValidState}</S.ValidText>
                                </S.PortValidWrapper>
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