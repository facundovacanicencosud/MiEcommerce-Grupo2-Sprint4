import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./UsersList.module.css";
import arrow from "../../../assets/chevron-right.svg";
import { AppContext } from "../../../context/AppContext";
import { getUsers } from "../../../utils/apiConfig";
import noProfilePic from "../../../assets/no-profile-pic.svg";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery } = useContext(AppContext);
  const { theme } = useContext(AppContext);
  const fetchUsers = async () => {
    const { data } = await getUsers();
    setUsers(data);
  };

  //Fetch all users
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
                  <li
                    className={`${style.user} ${theme ? style.user_dark : ""}`}
                  >
                    <div>
                      <img
                        src={
                          user.profilePicture
                            ? user.profilePicture
                            : noProfilePic
                        }
                        alt={`${user.firstname}-profile-pic`}
                      />
                      <div>
                        <p>{`${user.firstname} ${user.lastname}`}</p>
                        <p>{user.email}</p>
                      </div>
                    </div>
                    <img
                      className={`${style.arrow} ${
                        theme ? style.arrow_dark : ""
                      }`}
                      src={arrow}
                      alt=""
                    />
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
