import { useParams } from "react-router-dom";

export default function QuizEdit(props) {
    const { id } = useParams();

    return <div>Edit Quiz #{id}</div>;
}
