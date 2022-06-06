// 친구목록 => 서버에 요청 (axios-get) / 접속한 user => token으로
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const LoginRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;

  width: 500px;
  height: 350px;

  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
`;

function FriendList({ token }) {
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    if (token) {
      getFriendList(token);
    }
  }, [token]);

  const getFriendList = async (token) => {
    try {
      const res = await axios(
        "http://localhost:8000/friends",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setFriendList(res.data.friends); // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginLayout>
      <LoginRow>
        <div>
          <h1>FriendList</h1>
          {
            friendList.map((friend, index) => {
              const { uid, name } = friend;

              return (
                <ul key={index} onClick={() => getFriendList(uid)}>
                  <li>name: {name}</li>
                </ul>
              );
            })
          }
        </div>
      </LoginRow>
    </LoginLayout>
  );
};

export default FriendList;
