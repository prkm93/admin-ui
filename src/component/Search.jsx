import React from "react";
import { Form } from "react-bootstrap";
import "./Search.css";

const Search = (props) => {

   const { handleSearch } = props;

    return (
        <div className="search-box">
            <Form.Control 
                type="text"
                name="search" 
                placeholder="search by name, email or role" 
                onChange={(e) => handleSearch(e)}
            />
        </div>
    )
}

export default Search;
