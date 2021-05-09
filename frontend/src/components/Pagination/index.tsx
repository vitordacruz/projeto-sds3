import { SalePage } from "types/sale";

type Props = {
    page: SalePage;
    onPageChange: Function;
}

const Pagination = ({ page, onPageChange }: Props) => {

    const itensAfter = [];

    const itensBefore = [];

    const totalColumnsBefore = 5;

    let beginNumberColumn = page.number - 4;
    let endNumberColumn = page.number + totalColumnsBefore;

    if (endNumberColumn > page.totalPages) {
        endNumberColumn = page.totalPages;
    }

    if (beginNumberColumn < 0) {

        endNumberColumn = (beginNumberColumn * -1) + endNumberColumn;

        if (endNumberColumn > page.totalPages) {
            endNumberColumn = page.totalPages;
        }

    } else {
        const diff = endNumberColumn - page.number;
        if (diff != totalColumnsBefore) {
            const diferenca = totalColumnsBefore - diff;
            beginNumberColumn = (diferenca * -1) + beginNumberColumn;
        }
    }

    if (beginNumberColumn < 0) {
        beginNumberColumn = 0;
    }

    for (let i = (page.number + 1); i < endNumberColumn; i++) {
        itensAfter.push(
            <li className="page-item" key={i}>
                <button className="page-link" onClick={() => onPageChange(i)}>{ i +1 }</button>
            </li>
        );
    }

    for (let i = beginNumberColumn; i < page.number; i++) {
        itensBefore.push(
            <li className="page-item" key={i}>
                <button className="page-link" onClick={() => onPageChange(i)}>{ i + 1 }</button>
            </li>
        );
    }

    return (
        <>
        <span><strong>Total de páginas: </strong>{ page.totalPages }</span>
        <div className="row d-flex justify-content-center">
            <nav>
                <ul className="pagination">
                    <li className={`page-item ${page.first ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(0)}>Primeira</button>
                    </li>
                    <li className={`page-item ${page.first ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(page.number - 1)}>Anterior</button>
                    </li>
                    { itensBefore }
                    <li className="page-item disabled">
                        <span className="page-link">{page.number + 1}</span>
                    </li>
                    { itensAfter }
                    <li className={`page-item ${page.last ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(page.number + 1)}>Próxima</button>
                    </li>
                    <li className={`page-item ${page.last ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => onPageChange(page.totalPages - 1)}>Última</button>
                    </li>
                </ul>
            </nav>
        </div>
        </>
    );
};

export default Pagination;