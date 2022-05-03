import React, { useState, useEffect, useRef } from "react";
import { fetchUsersAPI } from "./utilities/fetchUser";
import { totalPages } from "./utilities/calculatePages";
import { Container, Button } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from "./component/UserList";
import Search from "./component/Search";
import Pagination from "./component/Pagination";
import { config } from "./config/constant";
import "./App.css";

function App() {

  const [usersData, setUsersData] = useState([]);
  const [usersDataList, setUsersDataList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  
  const selectAllRef = useRef(null);

  const totalNoOfPages  = totalPages(usersData.length);
  let pagesVisted = pageNumber * config.PAGE_SIZE;

  useEffect(() => {
    fetchUsersAPI(setUsersData, setUsersDataList);

    return (() => fetchUsersAPI(setUsersData, setUsersDataList));
  }, []);
  

  /**
   *  to perform search on records by name, email or role
   * @param {*} e event
   */
  const handleSearch = (e) => {
      
    setPageNumber(1);
    e.preventDefault();

    let word = e.target.value.toLowerCase();
    let tempData = structuredClone(usersDataList);

    const filteredUsers = tempData.filter((user) => {
        if ( user.name.toLowerCase().includes(word) 
              ||  user.email.toLowerCase().includes(word) 
              || user.role.toLowerCase().includes(word) 
            ) {
            return user;
        }
        return false;
    });

    setUsersData(filteredUsers);
  }

  /**
   *  invoked when selectAll checkbox is clicked
   * @param {e} e event on selected element
   */
  const selectAllHandler = (e) => {
    const tempUsers = structuredClone(usersData);
    
    let length;
    if (totalNoOfPages  === pageNumber) {
      length =  usersData.length; 
    } else {
      length = pagesVisted;
    }

    for (let i= (pagesVisted - config.PAGE_SIZE); i < length; i++) {
      tempUsers[i].isSelected  = e.target.checked;
    }

    setUsersData(tempUsers);
  }

  /**
   *  invoked when any checkbox is clicked for any particular user
   * @param {*} id of user
   */
  const selectUserHandler = (id) => {
    const tempData = structuredClone(usersData);
    
    tempData.forEach(user => {
      if (user.id === id) {
        user.isSelected = !user.isSelected;
        return user;
      }
      return user;
    });

    selectAllRef.current.checked = false;
    setUsersData(tempData);
  }

  /**
   * invoked when Delete Selected button is clicked to delete all records 
   */
  const deleteMultiSelectHandler = () => {

    const tempUsers = structuredClone(usersData);
    const newUserList = tempUsers.filter(user => user.isSelected === false);
    
    selectAllRef.current.checked = false;

    setUsersData(newUserList);
    setUsersDataList(newUserList);

    toast.success('Selected users deleted', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  /**
   *  Function invoked when edit button is clicked to enable edit mode
   * @param {*} id of user
   */
  const editUserHandler = (id) => {

    let tempData = structuredClone(usersData);
    const indexOfFoundUser = tempData.findIndex(user => user.id === id);
   
    tempData[indexOfFoundUser].ifEdit = true;

    setUsersData(tempData);
    setUsersDataList(tempData);
  }

  /**
   *  function invoked when save button is clicked to save user details after editing
   * @param {*} id of user
   * @param {*} nameRef DOM reference to access name input element
   * @param {*} emailRef DOM reference to access email input element
   * @param {*} roleRef DOM reference to access role input element
   */
  const saveUserHandler = (id, nameRef, emailRef, roleRef) => {

    let tempData = structuredClone(usersData);
   
    tempData.forEach(user => {
      if (user.id === id) {
        user.name   = nameRef.current.value;
        user.email  = emailRef.current.value;
        user.role   = roleRef.current.value;
        user.ifEdit = false;
      }
    });

    toast.success('User details updated', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setUsersData(tempData);
    setUsersDataList(tempData);
  }

 /**
 *  invoked when delete button is clicked 
 * @param {*} id of user
 */
  const deleteUserHandler = (id) => {

    const tempData = structuredClone(usersData);
    const userSelected = tempData.find(user => user.id === id);
    const filteredData =  tempData.filter(user => user.id !== id);

    setUsersData(filteredData);
    setUsersDataList(filteredData);

    toast.success(`user ${userSelected.name} is deleted`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });

  }

  return (
    <Container>
      <Search handleSearch={handleSearch}/>   
      <UserList 
        userList={usersData.slice(pagesVisted - config.PAGE_SIZE, pagesVisted)}
        selectAllRef={selectAllRef}
        selectAllHandler={selectAllHandler}
        selectUserHandler={selectUserHandler}
        editUserHandler={editUserHandler}
        saveUserHandler={saveUserHandler}
        deleteUserHandler={deleteUserHandler}
      />
      <div className="page-controls">
        <div>
        <Button 
          variant="danger" 
          onClick={() => deleteMultiSelectHandler()}
        >
          Delete Selected
        </Button>
        </div>
        <Pagination
          totalLength={usersData.length}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}

export default App;
