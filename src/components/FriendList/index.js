import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import ChatRoom from "../ChatRoom";

const FriendListLayout = styled.div`
  width: 400px;
  height: 350px;

  position: absolute;
  bottom: 10px;
  left: 10px;

  border: solid 1px;
  border-radius: 30px;
  background-color: rgba(246, 247, 248, 0.8);
  box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%),
    0px 2px 5px -2px rgba(0, 0, 0, 0.418), 0px 2px 5px -7px rgb(0 0 0 / 20%);
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

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: solid 0.05px;
`;

const ToggleButton = styled.button`
  margin-left: 25px;
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

const FormBox = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.input`
  width: 150px;
  height: 20px;
  margin: 0 20px;
  margin-top: 5px;
  border: solid 1px;
  border-radius: 5px;
`;

const FriendListBox = styled.div``;

const FriendListTitle = styled.h1`
  text-align: left;
  margin-left: 40px;
`;

const FriendListItem = styled.ul`
  li {
    display: flex;
    justify-content: space-between;
    padding: 5px;
  }
`;

function FriendList({ user, token, setIsFriendListOpened }) {
  const [friendList, setFriendList] = useState([]);
  const [friendName, setfriendName] = useState("");
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [chatFriend, setChatFriend] = useState(null);
  const [chatFriendUid, setChatFriendUid] = useState(null);

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
        const result = await axios.get("http://localhost:8000/friends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
  }, [token]);

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
        }
      );

      setFriendList(result.data.friends);
      setfriendName("");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFriend = async (uid) => {
    try {
      const result = await axios.delete("http://localhost:8000/friends", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: {
          uid,
        },
      });

      setFriendList(result.data.friends);
    } catch (error) {
      console.error(error);
    }
  };

  const chatOn = (uid, name) => {
    setChatFriend(name);
    setChatFriendUid(uid);
  };

  return isChatMode ? (
    <ChatRoom user={user} friendUid={chatFriendUid} friendName={chatFriend} />
  ) : (
    <FriendListLayout>
      <HeaderBox>
        <ToggleButton type="button" onClick={toggleInput}>
          +
        </ToggleButton>
        <CloseButton
          type="button"
          onClick={() => {
            setIsFriendListOpened(false);
          }}
        >
          X
        </CloseButton>
        {isOpenInput && (
          <FormBox onSubmit={addFriend}>
            <TextInput
              autoFocus
              type="text"
              value={friendName}
              placeholder={"이름을 입력해주세요."}
              onChange={getFriendName}
            />
          </FormBox>
        )}
      </HeaderBox>
      <FriendListBox>
        <FriendListTitle>FriendList</FriendListTitle>
        <FriendListItem>
          {friendList.map((friend, index) => {
            const { uid, name } = friend;

            return (
              <li
                id={uid}
                key={uid}
                onClick={() => {
                  chatOn(uid, name);
                  setIsChatMode(true);
                }}
              >
                {name}
                <DeleteButton type="button" onClick={() => deleteFriend(uid)}>
                  X
                </DeleteButton>
              </li>
            );
          })}
        </FriendListItem>
      </FriendListBox>
    </FriendListLayout>
  );
}

export default FriendList;
