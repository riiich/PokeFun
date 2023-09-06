export const Pagination = ({ nextUrl, prevUrl, nextPage, prevPage }) => {
    return (
        <div className="pageButtons">
            <button onClick={ prevUrl && prevPage }>Previous</button>
            <button onClick={ nextUrl && nextPage }>Next</button>
        </div>
    );
};
