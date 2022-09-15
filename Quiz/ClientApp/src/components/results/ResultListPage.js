import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchResults } from "../../actions";

export default function ResultListPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchResults());
    }, []);

    var results = useSelector((state) => Object.values(state.results));

    var renderedResults = results.map((result) => (
        <li className="list-group-item" key={result.id}>
            <a href={`results/${result.id}`}>
                Result #{result.id} for quiz '{result.title}' :
                {result.status == "Submitted"
                    ? ` ${result.correctAnswers}/${result.totalQuestions}`
                    : ` ${result.status}`}
            </a>
        </li>
    ));

    return <ul className="list-group">{renderedResults}</ul>;
}
