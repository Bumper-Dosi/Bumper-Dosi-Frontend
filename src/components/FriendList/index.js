import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const FriendListLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const FriendListRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: absolute;

  width: 500px;
  height: 350px;

  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);

  nav {
    position: fixed;
    margin-right: 300px;
  }

  nav h1 {
    position: flex;
    margin-left: 30px;
  }

  nav button {
    position: flex;
    margin-left: 40px;
  }
`;

function FriendList({ token }) {
  const [friendList, setFriendList] = useState([]);
  const [friendName, setfriendName] = useState("");

  const setFindFriendWithName = (event) => {
    event.preventDefault();

    setfriendName(event.target.value);
  };

  useEffect(() => {
    if (token) {
      getFriendList(token);
    }
  }, [token]);

  const getFriendList = async (token) => {
    try {
      const res = await axios.get(
        "http://localhost:8000/friends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFriendList(res.data.friends);
    } catch (error) {
      console.error(error);
    }
  };

  const addFriend = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(
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
      setFriendList(res.data.friends);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFriend = async (uid) => {
    try {
      const res = await axios.delete(
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
      setFriendList(res.data.friends);
    } catch (error) {
      console.error(error);
    }
  };

  return ( // 아이콘 토글 만들기
    <FriendListLayout>
      <FriendListRow>
        <form
          onSubmit={addFriend}
        >
          <div>
            <input
              type="text"
              value={friendName}
              placeholder={"이름을 입력해주세요."}
              onChange={setFindFriendWithName}
            />
          </div>
        </form>
        <nav>
          <h1>FriendList</h1>
          <ul>
            {
              friendList.map((friend, index) => {
                const { uid, name } = friend;

                return (
                  <li
                    id={uid}
                    key={index}
                  >
                    name: {name}
                    <button
                      type="delete"
                      onClick={() => deleteFriend(uid)}
                    >
                      삭제
                    </button>
                  </li>
                );
              })
            }
          </ul>
        </nav>
      </FriendListRow>
    </FriendListLayout>
  );
};

export default FriendList;
