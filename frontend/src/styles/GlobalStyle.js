import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
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
        background-color: ${props => props.theme.color.background.content};
        overflow: hidden;

        &::-webkit-scrollbar {
            display: none;
        }
    }
`