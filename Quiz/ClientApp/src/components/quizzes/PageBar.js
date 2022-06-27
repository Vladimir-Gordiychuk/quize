export default function PageBar({ pageCount, current, onPageChanged }) {
    const renderPrevious = () => {
        const disabled = current <= 0 ? "disabled" : "";
        return (
            <li className={`page-item ${disabled}`} key="previous">
                <a
                    className="page-link"
                    href="#"
                    onClick={() => onPageChanged(current - 1)}
                >
                    Previous
                </a>
            </li>
        );
    };

    const renderPages = () => {
        var pages = [];
        for (let i = 0; i < pageCount; ++i) {
            const active = i == current ? "active" : "";
            pages.push(
                <li className={`page-item ${active}`} key={i + 1}>
                    <a
                        className="page-link"
                        href="#"
                        onClick={() => onPageChanged(i)}
                    >
                        {i + 1}
                    </a>
                </li>
            );
        }
        return pages;
    };

    const renderNext = () => {
        const disabled = !(current < pageCount - 1) ? "disabled" : "";
        return (
            <li className={`page-item ${disabled}`} key="next">
                <a
                    className="page-link"
                    href="#"
                    onClick={() => onPageChanged(current + 1)}
                >
                    Next
                </a>
            </li>
        );
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {renderPrevious()}
                {renderPages()}
                {renderNext()}
            </ul>
        </nav>
    );
}
