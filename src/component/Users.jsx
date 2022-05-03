import { useRef } from 'react';
import PropTypes from "prop-types";
import { PencilSquare, Trash3Fill, SdCardFill } from 'react-bootstrap-icons';
import "./Users.css";

const Users = (props) => {

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const roleRef = useRef(null);

    const {selectUserHandler, editUserHandler, saveUserHandler,  deleteUserHandler} = props;
    const { id, name, email, role, ifEdit, isSelected } =  props.user;

    return (
       <>
        <tr className="table-row">
            <td className="table-checkbox text-center">
                <input
                    className="table-input-checkbox"
                    type="checkbox"
                    id={id}
                    checked={isSelected}
                    onChange={() => selectUserHandler(id)}
                />
            </td>
            <td className={isSelected ? "table-data-selected": "table-data"}>
                <input 
                    className={ifEdit ? "table-input-box-edit" : isSelected ? "table-input-box-selected" : "table-input-box-readOnly"}
                    type="text"
                    readOnly={!ifEdit}
                    ref={nameRef}
                    name="name"
                    defaultValue={name} 
                />
            </td>
            <td className={isSelected ? "table-data-selected": "table-data"}>
                <input 
                    className={ifEdit ? "table-input-box-edit" : isSelected ? "table-input-box-selected" : "table-input-box-readOnly"}
                    type="email"
                    readOnly={!ifEdit}
                    ref={emailRef}
                    name="email"
                    defaultValue={email} 
                />
            </td>
            <td className={isSelected ? "table-data-selected": "table-data"}>
                <input
                    className={ifEdit ? "table-input-box-edit" : isSelected ? "table-input-box-selected" : "table-input-box-readOnly"} 
                    type="text"
                    readOnly={!ifEdit}
                    ref={roleRef}
                    name="role"
                    defaultValue={role} 
                />
            </td>
            <td className={isSelected ? "table-data-selected text-center": "table-data text-center"}>
                {
                    ifEdit ?
                    <SdCardFill
                        color="#005acf" 
                        className="table-edit-action"
                        size={20}
                        onClick={() => (saveUserHandler(id, nameRef, emailRef, roleRef))}
                    />
                    :
                    <PencilSquare 
                        color="#005acf" 
                        className="table-edit-action"
                        size={20}
                        onClick={() => (editUserHandler(id))}
                    /> 
                } 
                <Trash3Fill 
                    color="#b30202"
                    className="table-delete-action" 
                    size={20}
                    onClick={() => deleteUserHandler(id)}
                />
            </td>
        </tr>
       </>
    )
}

Users.propTypes = {
    user: PropTypes.object,
    selectUserHandler: PropTypes.func, 
    editUserHandler: PropTypes.func, 
    saveUserHandler: PropTypes.func, 
    deleteUserHandler: PropTypes.func
}

export default Users;