import React from "react";
import PropTypes from "prop-types";
import Users from "./Users";
import { Table } from "react-bootstrap";
import "./UserList.css";

const UserList = (props) => {

    const { 
            userList, 
            selectAllRef,
            selectAllHandler, 
            selectUserHandler, 
            editUserHandler, 
            deleteUserHandler, 
            saveUserHandler 
    } = props;


    return (
        <Table bordered>
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
                    <th className="table-header">Name</th>
                    <th className="table-header">Email</th>
                    <th className="table-header">Role</th>
                    <th className="table-header text-center">Actions</th>
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