import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ChatRoom from "../ChatRoom";

const appear = keyframes`
  0% {
    bottom: 0%;
    opacity: 0;
  }
  100% {
    bottom: 1%;
    opacity: 1;
  }
`;

const FriendListLayout = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;

  width: 400px;
  height: 350px;

  border: solid 1px;
  border-radius: 30px;
  background-color: rgba(246, 247, 248, 0.8);
  box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%),
    0px 2px 5px -2px rgba(0, 0, 0, 0.418), 0px 2px 5px -7px rgb(0 0 0 / 20%);

  transform: translateY(0%);
  animation: ${appear} 1s ease-in-out;
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
  padding: 5px;
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 30px;
  color: green;
`;

const CloseButton = styled.button`
  margin-left: 25px;
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

function FriendList({ user, token, setIsFriendListOpened, setAlarmMessage }) {
  const [friendList, setFriendList] = useState([]);
  const [friendName, setfriendName] = useState("");
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isChatMode, setIsChatMode] = useState(false);
  const [chatFriend, setChatFriend] = useState(null);
  const [chatFriendUid, setChatFriendUid] = useState(null);

  const toggleInput = (event) => {
    event.preventDefault();

    setIsInputOpen((isOpenInput) => !isOpenInput);
  };

  const getFriendName = (event) => {
    event.preventDefault();

    setfriendName(event.target.value);
  };

  useEffect(() => {
    const getFriendList = async (token) => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/friends`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFriendList(result.data.friends);
      } catch (error) {
        console.error(error);
        setAlarmMessage(error.response.data.message);
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
        `${process.env.REACT_APP_SERVER_URL}/friends`,
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

      setAlarmMessage(result.data.message);
      setFriendList(result.data.friends);
      setfriendName("");
    } catch (error) {
      console.error(error);
      setAlarmMessage(error.response.data.message);
      setfriendName("");
    }
  };

  const deleteFriend = async (uid) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: {
            uid,
          },
        }
      );

      setFriendList(result.data.friends);
      setAlarmMessage(result.data.message);
    } catch (error) {
      console.error(error);
      setAlarmMessage(error.response.data.message);
    }
  };

  const chatOn = (uid, name) => {
    setChatFriend(name);
    setChatFriendUid(uid);
  };

  return isChatMode ? (
    <ChatRoom
      user={user}
      friendUid={chatFriendUid}
      friendName={chatFriend}
      setIsChatMode={setIsChatMode}
      setIsFriendListOpened={setIsFriendListOpened}
    />
  ) : (
    <FriendListLayout>
      <HeaderBox>
        <CloseButton
          type="button"
          onClick={() => {
            setIsFriendListOpened(false);
          }}
        >
          X
        </CloseButton>
        <ToggleButton type="button" onClick={toggleInput}>
          +
        </ToggleButton>
        {isInputOpen && (
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
                onClick={(e) => {
                  if (e.target.type === "button") return;

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
