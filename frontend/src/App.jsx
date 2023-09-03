import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "styles/Theme";
import { GlobalStyle } from "styles/GlobalStyle";

import HeaderLayout from "components/layouts/HeaderLayout";

import LoginPage from "pages/loginpage/LoginPage";
import SignupPage from "pages/signuppage/SignupPage";

import ProjectMainPage from "pages/projectmainpage/ProjectMainPage";

import ContainerManagePage from "pages/containermanagepage/ContainerManagePage";
import ContainerSettingPage from "pages/containersettingpage/ContainerSettingPage";
import ContainerModifyPage from "pages/containermodifypage/ContainerModifyPage";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    {/* 로그인 */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    <Route element={<HeaderLayout />}>
                        {/* 프로젝트 관련 */}
                        <Route path="/" element={<ProjectMainPage />} />

                        {/* 컨테이너 관련 */}
                        <Route path="/:projectName" element={<ContainerManagePage />} />
                        <Route path="/:projectName/container" element={<ContainerSettingPage />} />
                        <Route path="/:projectName/:containerName/modify" element={<ContainerModifyPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;