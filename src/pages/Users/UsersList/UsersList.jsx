import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./UsersList.module.css";
import arrow from "../../../assets/chevron-right (1).svg";
import { AppContext } from "../../../context/AppContext";
import { /* deleteUser,*/ getUsers } from "../../../utils/apiConfig";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery } = useContext(AppContext);
  const fetchUsers = async () => {
    const { data } = await getUsers();
    setUsers(data);
    console.log(data);
  };

  //Fetch all products
  useEffect(() => {
    try {
      fetchUsers();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Search users
  useEffect(() => {
    const onSearch = async (searchQuery) => {
      try {
        const { data: users } = await getUsers();
        const filteredUsers = users.filter(
          (user) =>
            user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.log(error);
      }
    };
    onSearch(searchQuery);
  }, [searchQuery]);

  /*   const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const deletedUser = await deleteUser(parseInt(id));
      console.log(deletedUser);
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  }; */

  return (
    <div className="lists-container">
      {users.length ? (
        <>
          <div className={style.usersListHeader}>
            <span>{users.length} usuarios</span>
          </div>
          <ul className={style.userList}>
            {isLoading ? (
              <li className={style.loaderContainer}>
                <span>Loading</span>
                <div className={style.spinner}></div>
              </li>
            ) : (
              users.map((user) => (
                <Link key={user.id} to={`/users/${user.id}`}>
                  <li className={style.user}>
                    <div className={style.userDetails}>
                      <img src={user.profilePicture} alt="" />
                      <div>
                        <p>{`${user.firstname} ${user.lastname}`}</p>
                      </div>
                    </div>
                    <div>
                      {/*  <button
                        onClick={(e) => handleDelete(e, user.id)}
                        className={style.deleteButton}
                      >
                        Eliminar
                      </button> */}
                      <img className={style.arrow} src={arrow} alt="" />
                    </div>
                  </li>
                </Link>
              ))
            )}
          </ul>
        </>
      ) : (
        <div className={style.noMatch}>
          <p>No se encontraron usuarios</p>
        </div>
      )}
    </div>
  );
};

export default UsersList;
