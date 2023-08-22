import { Outlet } from "react-router"

import * as S from './style';

import Header from "components/header"
import Sidebar from "components/sidebar/Sidebar";

export default function HeaderLayout() {
    return (
        <>
            <Header />
            <S.Main>
                <Sidebar />
                <Outlet />
            </S.Main>
        </>
    )
}
