import { BrowserRouter, Route, Routes } from "react-router-dom";
import { reset } from "styled-reset";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import { theme } from "styles/Theme";

import HomePage from "pages/homepage/HomePage";
import ManagePage from "pages/managepage/ManagePage";
import SettingPage from "pages/settingpage/SettingPage";
import ContainerPage from "pages/containerpage/ContainerPage";

const GlobalStyle = createGlobalStyle`
    ${reset}

    *, *::before, *::after {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    li {
        list-style: none;
    }

    button {
        border: 0;
        cursor: pointer;
    }

    body {
        background-color: ${props => props.theme.color.background.main};
    }
`

function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/manage" element={<ManagePage />} />
                    <Route path="/setting" element={<SettingPage />} />
                    <Route path="/container/:id" element={<ContainerPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;