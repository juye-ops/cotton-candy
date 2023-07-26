import { useLocation } from "react-router"

export default function ContainerPage() {
    const location = useLocation();
    console.log(location.state);

    return (
        <>
            <iframe src={"http://container/" + location.state.containerName} title="codeserver" style={{ width: "100%", height: "100vh" }}></iframe>
        </>
    )
}