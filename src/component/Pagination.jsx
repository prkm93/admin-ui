import { totalPages } from  "../utilities/calculatePages";
import { ChevronLeft, ChevronRight, ChevronDoubleLeft, ChevronDoubleRight } from "react-bootstrap-icons";
import "./Pagination.css";

const Pagination = (props)  => {
    
    const { pageNumber, setPageNumber, totalLength } = props;

    const totalNoOfPages = totalPages(totalLength);

    /**
     *  function called when directly last page or first page button is clicked
     * @param {*} index page number
     */
    const changePageHandler = (index) => {
        setPageNumber(index);
    }

    /**
     *  function called when page is changed via arrows or when directly page no is clicked
     * @param {*} index page number
     */
    const navigatePageHandler = (index) => {

        if (index < 1) {
            index = 1;
        } else if (index > totalNoOfPages) {
            index = totalNoOfPages;
        }
        
        setPageNumber(index);
    }

    let pages = [];

    // button to jump on first Page
    pages.push(
        <button 
            key={-3} 
            className={`pagination-btn ${pageNumber === 1 && "pagination-btn-arrows"}`}
            onClick={() => changePageHandler(1)}
        >
            <ChevronDoubleLeft/>
        </button>   
    );

    // button for left navigation of page
    pages.push(
        <button 
            key={-2} 
            className={`pagination-btn ${pageNumber === 1 && "pagination-btn-arrows"}`}
            onClick={() => navigatePageHandler(pageNumber - 1)}
        >
            <ChevronLeft/>
        </button>   
    );

    // For creating all pages (1.....Total Pages)
    for (let i = 1; i <= totalNoOfPages; i++) {
        pages.push(
            <button 
                key={i} 
                className={`pagination-btn ${pageNumber === i && "pagination-btn-selected"}`}
                onClick={() => changePageHandler(i)}
            >
                {i}
            </button>
        );
    }

    // button for right navigation of page
    pages.push(
        <button 
            key={-1} 
            className={`pagination-btn ${pageNumber === totalNoOfPages && "pagination-btn-arrows"}`}
            onClick={() => navigatePageHandler(pageNumber + 1)}
        >
            <ChevronRight/>
        </button>   
    );

    // button to jump on last Page
    pages.push(
        <button 
            key={0} 
            className={`pagination-btn ${pageNumber === totalNoOfPages && "pagination-btn-arrows"}`}
            onClick={() => changePageHandler(totalNoOfPages)}
        >
            <ChevronDoubleRight/>
        </button>   
    );

    return (
        <div className="pagination-btns">
            {pages}
        </div>
    );
}

export default Pagination;