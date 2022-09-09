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
        <li>
            <a href={`results/${result.id}`}>
                Result #{result.id} ({result.correctAnswers}/
                {result.totalQuestions})
            </a>
        </li>
    ));

    return <ul>{renderedResults}</ul>;
}
