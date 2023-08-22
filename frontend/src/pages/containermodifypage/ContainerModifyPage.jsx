// import { useRef, useState } from 'react';

// import ConfirmButton from 'components/buttons/confirmbutton/ConfirmButton';

// import PreventDefault from 'utils/PreventDefault';
// import * as API from 'apis/SettingPageAPIs';

// import * as S from './style'
// import { useLocation, useParams } from 'react-router';
// import PortHashTag from 'components/hashtags/porthashtags/PortHashTag';
// import DeleteButton from 'components/buttons/deletebutton/DeleteButton';


export default function ContainerModifyPage() {
    // const { projectName } = useParams();

    // // 이거 말고 서버에서 데이터 받아와서 처리하기
    // const location = useLocation();

    // // 사용자 입력 관련
    // const [inputs, setInputs] = useState(location.state.container.description);
    // const inputsRef = useRef([]);

    // const onChangeInput = (e) => {
    //     setInputs(e.target.value);
    // }

    // // 포트 관련
    // const [portInput, setPortInput] = useState("");
    // const [ports, setPorts] = useState(location.state.container.settings.ports);
    // const portRef = useRef();

    // const onChangePortInput = (e) => {
    //     const reg = /[^0-9,\s]/g;
    //     const value = e.target.value.replace(reg, '');

    //     if (value.slice(-1) === ' ') {
    //         setPorts([...ports, value.slice(0, -1)]);
    //         setPortInput("");
    //     } else {
    //         setPortInput(value);
    //     }
    // }

    // const onClickPortDelete = (e) => {
    //     const value = e.currentTarget.querySelector('span').innerText;

    //     setPorts(ports.filter(port => "" + port !== value));
    // }

    // // 환경 변수 관련
    // const [envs, setEnvs] = useState(Object.keys(location.state.container.settings.environments).map(key => { return { "key": key, "value": location.state.container.settings.environments[key] } }));
    // const envsRef = useRef([]);

    // const handleAddEnv = () => {
    //     setEnvs([...envs, { key: '', value: '' }]);
    // }

    // const handleReomveEnv = (index) => {
    //     if (envs.length === 1) {
    //         return;
    //     }

    //     const values = [...envs];

    //     values.splice(index, 1);
    //     setEnvs(values);
    // }

    // const handleInputChange = (index, e) => {
    //     const values = [...envs];

    //     if (e.target.name === 'key') {
    //         values[index].key = e.target.value;
    //     } else {
    //         values[index].value = e.target.value;
    //     }

    //     setEnvs(values);
    // }

    // // 수정 버튼
    // const onClickGenerateButton = () => {
    //     const envRst = {};

    //     envs.forEach(env => {
    //         if (env.key === '' || env.value === '') {
    //             return;
    //         }

    //         envRst[env.key] = env.value;
    //     })

    //     const generate = {
    //         "project": location.state.project,
    //         "name": inputs.name,
    //         "description": inputs.desc,
    //         "gpu": "false",
    //         "build": location.state.container.bulid,
    //         "settings": {
    //             "ports": ports,
    //             "environments": envRst,
    //         }
    //     }

    //     API.generateContainer(JSON.stringify(generate));
    // }

    // const onDeleteContainer = () => {

    // }

    return (
        <>
            {/* <S.Header>
                <h1>COTTON CANDY</h1>
            </S.Header>
            <main>
                <S.Section>
                    <S.SectionHeader>
                        <S.SectionHeaderWrapper>
                            <S.SectionHeaderBackLink to={'/' + location.state.project}>
                                <span>Back</span>
                                <i className="fas fa-arrow-left"></i>
                            </S.SectionHeaderBackLink>
                            <h2>Update {location.state.container.name}</h2>
                            <ConfirmButton props={{ content: "Generate", callback: onClickGenerateButton }} />
                        </S.SectionHeaderWrapper>
                    </S.SectionHeader>
                    <S.Form action="" onClick={PreventDefault}>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>이름 설정 영역</S.IROnlyFieldSetLegend>
                            <p>이름</p>
                            <p>{location.state.container.name}</p>
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>설명 설정 영역</S.IROnlyFieldSetLegend>
                            <label htmlFor="descInput">설명<span>(선택 영역)</span></label>
                            <S.DescTextArea id='descInput' name='desc' ref={(element) => (inputsRef.current[0] = element)} onChange={onChangeInput} placeholder='컨테이너 설명을 입력해주세요.' value={inputs} />
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>설명 설정 영역</S.IROnlyFieldSetLegend>
                            <p>프로젝트</p>
                            <p>{projectName}</p>
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
                            <p>{location.state.container.build.os.name} - {location.state.container.build.os.version}</p>
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>Platform 설정 영역</S.IROnlyFieldSetLegend>
                            <p>Platform <span>(Optional)</span></p>
                            <S.PlatformList>
                                {
                                    location.state.container.build.platforms.map((platform, index) => {
                                        return (
                                            <p key={"" + index + platform}>{platform.name} - {platform.version}</p>
                                        )
                                    })
                                }
                            </S.PlatformList>
                        </S.DivideFieldSet>
                        <S.DivideFieldSet>
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
                                        <input type="text" name="port" id="port" placeholder='포트 번호를 입력해주세요. (스페이스 키를 눌러 입력을 완료하세요)' ref={(element) => portRef.current = element} value={portInput} onChange={onChangePortInput} />
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
                        <S.DivideFieldSet>
                            <S.IROnlyFieldSetLegend>삭제 선택 영역</S.IROnlyFieldSetLegend>
                            <label htmlFor="">컨테이너 삭제하기</label>
                            <DeleteButton props={{ content: "Delete", name: projectName, callback: onDeleteContainer }} />
                        </S.DivideFieldSet>
                    </S.Form>
                </S.Section>
            </main> */}
        </>
    )
}