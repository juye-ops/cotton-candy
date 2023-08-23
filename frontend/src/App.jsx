import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from 'redux/store/index.js';

import ImportFonts from "utils/ImportFonts";

import { theme } from "styles/Theme";
import { GlobalStyle } from "styles/GlobalStyle";

import HeaderLayout from "components/layouts/HeaderLayout";

import LoginPage from "pages/loginpage/LoginPage";

import ProjectMainPage from "pages/projectmainpage/ProjectMainPage";

import ContainerManagePage from "pages/containermanagepage/ContainerManagePage";
import ContainerSettingPage from "pages/containersettingpage/ContainerSettingPage";
import ContainerModifyPage from "pages/containermodifypage/ContainerModifyPage";
import ContainerPage from "pages/containerpage/ContainerPage";

ImportFonts();

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <GlobalStyle />
                    <BrowserRouter>
                        <Routes>
                            {/* 로그인 */}
                            <Route path="/login" element={<LoginPage />} />

                            <Route element={<HeaderLayout />}>
                                {/* 프로젝트 관련 */}
                                <Route path="/" element={<ProjectMainPage />} />

                                {/* 컨테이너 관련 */}
                                <Route path="/:projectName" element={<ContainerManagePage />} />
                                <Route path="/:projectName/container" element={<ContainerSettingPage />} />
                                <Route path="/:projectName/:containerName/modify" element={<ContainerModifyPage />} />
                            </Route>

                            {/* 컨테이너 실행 */}
                            <Route path="/container/:id" element={<ContainerPage />} />
                        </Routes>
                    </BrowserRouter>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;