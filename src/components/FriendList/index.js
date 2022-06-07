import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const FriendListLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bolder;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const FriendListRow = styled.div`
  width: 400px;
  height: 350px;

  border: solid 1px;
  border-radius: 30px;
  background-color: rgba(0, 0, 0, 0.07);

  form {

    .show-input {
      width: 150px;
      height: 20px;
      margin: 0 20px;
      margin-top: 5px;
      border: solid 1px;
      border-radius: 5px;
    }
  }

  .hide-input {
    display: none;
  }

  .title {
    text-align: left;
    margin-left: 40px;
  }

  .list {

    li {
      display: flex;
      justify-content: space-between;
      padding: 5px;
    }

    button {
      display: flex;
      margin-top: 5px;
      margin-right: 30px;
      border: none;
      background-color: transparent;
      font-weight: bold;
      font-size: 15px;
      color: red;
    }
  }

  .close {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: solid 0.05px;

    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0 30px;
    }

    .toggle-button {
      padding: 5px;
      border: none;
      background-color: transparent;
      font-weight: bold;
      font-size: 30px;
      color: green;
    }

    .close-button {
      padding: 5px;
      border: none;
      background-color: transparent;
      font-weight: bold;
      font-size: 20px;
      color: red;
    }
  }
`;

function FriendList({ token, setIsFriendListOpned }) {
  const [friendList, setFriendList] = useState([]);
  const [friendName, setfriendName] = useState("");
  const [isOpenInput, setIsOpenInput] = useState(false);

  const toggleInput = () => {
    setIsOpenInput((isOpenInput) => !isOpenInput);
  };

  const getFriendName = (event) => {
    event.preventDefault();

    setfriendName(event.target.value);
  };

  useEffect(() => {
    const getFriendList = async (token) => {
      try {
        const result = await axios.get(
          "http://localhost:8000/friends",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setFriendList(result.data.friends);
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      if (!friendList.length) {
        getFriendList(token);
      }
    }
  }, [
    token,
  ]);

  const addFriend = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post(
        "http://localhost:8000/friends",
        {
          friendName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setFriendList(result.data.friends);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFriend = async (uid) => {
    try {
      const result = await axios.delete(
        "http://localhost:8000/friends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            uid,
          },
        },
      );

      setFriendList(result.data.friends);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FriendListLayout>
      <FriendListRow>
        <div
          className="close"
        >
          <div
            className="header"
          >
            <button
              className="toggle-button"
              type="showinput"
              onClick={toggleInput}
            >
              +
            </button>
            <button
              className="close-button"
              onClick={setIsFriendListOpned}
            >
              X
            </button>
            <form
              onSubmit={addFriend}
            >
              <input
                className={isOpenInput ? "show-input" : "hide-input"}
                autoFocus
                type="text"
                value={friendName}
                placeholder={"이름을 입력해주세요."}
                onChange={getFriendName}
              />
            </form>
          </div>
        </div>
        <div>
          <h3 className="title">FriendList</h3>
            <ul className="list">
              {
                friendList.map((friend, index) => {
                  const { uid, name } = friend;

                  return (
                    <li
                      id={uid}
                      key={uid}
                    >
                      {name}
                      <button
                        type="delete"
                        onClick={() => deleteFriend(uid)}
                      >
                        X
                      </button>
                    </li>
                  );
                })
              }
            </ul>
        </div>
      </FriendListRow>
    </FriendListLayout>
  );
};

export default FriendList;
