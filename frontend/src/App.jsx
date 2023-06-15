import { BrowserRouter, Route, Routes } from "react-router-dom";
import { reset } from "styled-reset";
import { createGlobalStyle } from "styled-components";

import HomePage from "pages/homepage/HomePage";
import ManagePage from "pages/managepage/ManagePage";
import SettingPage from "pages/settingpage/SettingPage";
import ContainerPage from "pages/containerpage/ContainerPage";

const GlobalStyle = createGlobalStyle`
    ${reset}

    *, *::before, *::after {
        box-sizing: border-box;
    }
`

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/manage" element={<ManagePage />} />
                    <Route path="/setting" element={<SettingPage />} />
                    <Route path="/container/:id" element={<ContainerPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );


}
export default App;