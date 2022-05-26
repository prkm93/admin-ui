import React, { useState } from "react";
import PropTypes from "prop-types";
import Users from "./Users";
import { Table } from "react-bootstrap";
import { ArrowDown , ArrowUp } from "react-bootstrap-icons";
import { config  } from "../config/constant";
import "./UserList.css";

const UserList = (props) => {

    const [columnSortOrder, setColumnSortOrder] = useState({
        name: false,
        email: false,
        role: false
    });

    const { 
            userList, 
            selectAllRef,
            selectAllHandler, 
            selectUserHandler, 
            editUserHandler, 
            deleteUserHandler, 
            saveUserHandler,
            handleSort
    } = props;


    /**
     *  function invoked when column name is clicked
     * @param {*} colName column Name 
     */
    const  columnSortHandler = (colName) => {
        setColumnSortOrder(prevState => {
            return {
                ...prevState,
                [colName]: !prevState[colName]
            }
        });
        handleSort(colName, columnSortOrder[colName]);
    }

    return (
        <Table bordered responsive>
            <thead>
                <tr>
                    <th className="table-header table-data-checkbox text-center">
                        <input 
                            type="checkbox"
                            className="table-input-checkbox"
                            id="selectAll"
                            ref={selectAllRef}
                            name="selectAll"
                            onChange={(e) => selectAllHandler(e)}
                        />
                    </th>
                    <th 
                        className="table-header" 
                        onClick={() => columnSortHandler(config.name_col)}>
                            Name {columnSortOrder.name ? <ArrowDown className="arrow"/> : <ArrowUp className="arrow"/>}
                    </th>
                    <th 
                        className="table-header" 
                        onClick={() => columnSortHandler(config.email_col)}>
                            Email {columnSortOrder.email ? <ArrowDown className="arrow"/> : <ArrowUp className="arrow"/>}
                    </th>
                    <th 
                        className="table-header" 
                        onClick={() => columnSortHandler(config.role_col)}>
                            Role {columnSortOrder.role ? <ArrowDown className="arrow"/> : <ArrowUp className="arrow"/>}
                    </th>
                    <th 
                        className="table-header text-center"
                    >
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    Array.isArray(userList) && userList.length ? userList.map((user) => {
                        return (
                            <Users
                                key={user.id} 
                                user={user} 
                                selectUserHandler={selectUserHandler}
                                editUserHandler={editUserHandler}
                                saveUserHandler={saveUserHandler}
                                deleteUserHandler={deleteUserHandler}
                            />
                        )
                    })
                    : <tr>
                        <td colSpan="5" className="text-center">
                           <p className="mt-2 mb-2"> No results found!</p>
                        </td>
                      </tr>
                }
            </tbody>
        </Table>
    )
}

UserList.propTypes = {
    userList : PropTypes.array, 
    selectAllRef : PropTypes.object,
    selectAllHandler : PropTypes.func, 
    selectUserHandler : PropTypes.func, 
    editUserHandler : PropTypes.func, 
    deleteUserHandler : PropTypes.func, 
    saveUserHandler : PropTypes.func
};

export default UserList;