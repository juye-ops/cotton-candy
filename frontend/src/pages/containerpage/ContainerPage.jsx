import { useParams } from "react-router"

export default function ContainerPage() {
    const { id } = useParams();
    console.log(id);

    return (
        <>
            <iframe src={"http://container/" + id} title="codeserver" style={{ width: "100%", height: "100vh" }}></iframe>
        </>
    )
}