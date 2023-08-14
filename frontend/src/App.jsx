import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "styles/Theme";
import { GlobalStyle } from "styles/GlobalStyle";

import LoginPage from "pages/loginpage/LoginPage";

import ProjectMainPage from "pages/projectmainpage/ProjectMainPage";
import ProjectSettingPage from "pages/projectsettingpage/ProjectSettingPage";
import ProjectModifyPage from "pages/projectmodifypage/ProjectModifyPage";

import ContainerManagePage from "pages/containermanagepage/ContainerManagePage";
import ContainerSettingPage from "pages/containersettingpage/ContainerSettingPage";
import ContainerModifyPage from "pages/containermodifypage/ContainerModifyPage";
import ContainerPage from "pages/containerpage/ContainerPage";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    {/* 로그인 */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* 프로젝트 관련 */}
                    <Route path="/" element={<ProjectMainPage />} />
                    <Route path="/project/setting" element={<ProjectSettingPage />} />
                    <Route path="/:projectName/modify" element={<ProjectModifyPage />} />

                    {/* 컨테이너 관련 */}
                    <Route path="/:projectName" element={<ContainerManagePage />} />
                    <Route path="/:projectName/container/setting" element={<ContainerSettingPage />} />
                    <Route path="/:projectName/:containerName/modify" element={<ContainerModifyPage />} />

                    {/* 컨테이너 실행 */}
                    <Route path="/container/:id" element={<ContainerPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;