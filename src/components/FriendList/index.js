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
  z-index: 101;

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
  }
`;

const DeleteButton = styled.button`
  display: flex;
  margin-top: 5px;
  margin-right: 30px;
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 15px;
  color: red;
`;

const CloseDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: solid 0.05px;
`;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px;
`;

const ToggleButton = styled.button`
  padding: 5px;
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 30px;
  color: green;
`;

const CloseButton = styled.button`
  padding: 5px;
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 20px;
  color: red;
`;

const TextInput = styled.div`
  width: 150px;
  height: 20px;
  margin: 0 20px;
  margin-top: 5px;
  border: solid 1px;
  border-radius: 5px;
`;

function FriendList({ token, setIsFriendListOpened }) {
  const [friendList, setFriendList] = useState([]);
  const [friendName, setfriendName] = useState("");
  const [isOpenInput, setIsOpenInput] = useState(false);

  const toggleInput = (event) => {
    event.preventDefault();

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
        <CloseDiv
          className="close"
        >
          <HeaderDiv
            className="header"
          >
            <ToggleButton
              className="toggle-button"
              type="button"
              onClick={toggleInput}
            >
              +
            </ToggleButton>
            <CloseButton
              className="close-button"
              type="button"
              onClick={() => {setIsFriendListOpened(false)}}
            >
              X
            </CloseButton>
          </HeaderDiv>
        </CloseDiv>
          {
            !isOpenInput ?? (
              <form
                onSubmit={addFriend}
              >
                <TextInput
                  autoFocus
                  type="text"
                  value={friendName}
                  placeholder={"이름을 입력해주세요."}
                  onChange={getFriendName}
                />
              </form>
            )
          }
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
                      <DeleteButton
                        className="delete"
                        type="button"
                        onClick={() => deleteFriend(uid)}
                      >
                        X
                      </DeleteButton>
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
