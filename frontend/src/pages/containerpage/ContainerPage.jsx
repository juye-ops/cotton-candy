import { useParams } from "react-router"

export default function ContainerPage() {
    const { id } = useParams();
    console.log(id);

    return (
        <>
        <iframe src={"http://172.24.0.4/"+ id + "/"} title="codeserver" style={{ width: "100%", height: "100vh" }}></iframe>
        </>
    )
}