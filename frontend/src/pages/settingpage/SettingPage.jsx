import React from 'react'
import styled from 'styled-components'

import IROnly from 'styles/IROnly'

import react_logo from 'assets/react_logo.svg'

const SettingPageHeader = styled.header`
    display: flex;
    justify-content: center;
`

const SettingSection = styled.main`
    max-width: 1140px;
    margin: 0 auto;
`

const SettingSectionHeader = styled.header`
    display: flex;
`

const SettingSectionGenerateButton = styled.button`
    margin-left: auto;
`

const SettingForm = styled.form`
    padding: 20px 0;
`

const DivideFieldSet = styled.fieldset`
    display: grid;
    grid-template-columns: 2fr 5fr;
    padding: 10px;
`

const IROnlyFieldSetLegend = styled.legend`
    ${IROnly}
`

const DescTextArea = styled.textarea`
    resize: vertical;
`

const ScopeList = styled.ul`
    display: flex;
`

const SoftwareStackList = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 13px;

    
    background-color: #ccc;
`

const SoftwareStackButton = styled.button`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;

    & > img {
        width: 60%;
    }

    & > span {
        font-size: 12px;
    }
`

const VersionList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;

    background-color: #ccc;
    margin-top: 20px;
`

const VersionListItem = styled.li`
    display: grid;
    grid-template-columns: 1fr 3fr;
`

export default function SettingPage() {
    const preventFromDefault = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <SettingPageHeader>
                <h1>COTTON CANDY</h1>
            </SettingPageHeader>
            <main>
                <SettingSection>
                    <SettingSectionHeader>
                        <a href='/manage'>back</a>
                        <h2>Generate New Container</h2>
                        <SettingSectionGenerateButton>Generate</SettingSectionGenerateButton>
                    </SettingSectionHeader>
                    <SettingForm action="" onClick={preventFromDefault}>
                        <DivideFieldSet>
                            <IROnlyFieldSetLegend>이름 설정 영역</IROnlyFieldSetLegend>
                            <label htmlFor="nameInput">이름</label>
                            <input type="text" id='nameInput' />
                        </DivideFieldSet>
                        <DivideFieldSet>
                            <IROnlyFieldSetLegend>설명 설정 영역</IROnlyFieldSetLegend>
                            <label htmlFor="descInput">설명<span>(선택 영역)</span></label>
                            <DescTextArea id='descInput' />
                        </DivideFieldSet>
                        <DivideFieldSet>
                            <IROnlyFieldSetLegend>공개 범위 설정 영역</IROnlyFieldSetLegend>
                            <p>공개 범위</p>
                            <ScopeList>
                                <li>
                                    <input type="radio" id='scopePublic' name='scope' />
                                    <label htmlFor="scopePublic">Public</label>
                                </li>
                                <li>
                                    <input type="radio" id='scopePrivate' name='scope' />
                                    <label htmlFor="scopePrivate">Private</label>
                                </li>
                            </ScopeList>
                        </DivideFieldSet>
                        <DivideFieldSet>
                            <IROnlyFieldSetLegend>소프트웨어 스택 설정 영역</IROnlyFieldSetLegend>
                            <p>소프트웨어 스택</p>
                            <div>
                                <SoftwareStackList>
                                    <li>
                                        <SoftwareStackButton>
                                            <img src={react_logo} alt="" />
                                            <span>React</span>    
                                        </SoftwareStackButton>
                                    </li>
                                    <li>
                                        <SoftwareStackButton>
                                            <img src={react_logo} alt="" />
                                            <span>React</span>    
                                        </SoftwareStackButton>
                                    </li>
                                    <li>
                                        <SoftwareStackButton>
                                            <img src={react_logo} alt="" />
                                            <span>React</span>    
                                        </SoftwareStackButton>
                                    </li>
                                    <li>
                                        <SoftwareStackButton>
                                            <img src={react_logo} alt="" />
                                            <span>React</span>    
                                        </SoftwareStackButton>
                                    </li>
                                    <li>
                                        <SoftwareStackButton>
                                            <img src={react_logo} alt="" />
                                            <span>React</span>    
                                        </SoftwareStackButton>
                                    </li>
                                    <li>
                                        <SoftwareStackButton>
                                            <img src={react_logo} alt="" />
                                            <span>React</span>    
                                        </SoftwareStackButton>
                                    </li>
                                    <li>
                                        <SoftwareStackButton>
                                            <img src={react_logo} alt="" />
                                            <span>React</span>    
                                        </SoftwareStackButton>
                                    </li>
                                    <li>
                                        <SoftwareStackButton>
                                            <img src={react_logo} alt="" />
                                            <span>React</span>    
                                        </SoftwareStackButton>
                                    </li>
                                    <li>
                                        <SoftwareStackButton>
                                            <img src={react_logo} alt="" />
                                            <span>React</span>    
                                        </SoftwareStackButton>
                                    </li>
                                    <li>
                                        <SoftwareStackButton>
                                            <img src={react_logo} alt="" />
                                            <span>React</span>    
                                        </SoftwareStackButton>
                                    </li>
                                </SoftwareStackList>
                                <VersionList>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                    <VersionListItem>
                                        <p>Version</p>
                                        <p>Test</p>
                                    </VersionListItem>
                                </VersionList>
                            </div>
                        </DivideFieldSet>
                    </SettingForm>
                </SettingSection>
            </main>
            <footer>

            </footer>
        </>
    )
}