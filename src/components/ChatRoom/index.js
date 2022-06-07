import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { COLOR } from "../../constants";

const ChatRoomLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  z-index: -100;
`;

const ChatRoomBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  position: absolute;

  width: 500px;
  height: 450px;

  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const TitleHeader = styled.header`
  font-size: 40px;
  color: ${COLOR.BACKGROUND_COLOR};
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  #me {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  #friend {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
`;

const InputBox = styled.div``;

function ChatRoom({ user }) {
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [contents, setContents] = useState([]);
  const [socket, setSocket] = useState(false);
  const [myContent, setMyContent] = useState([]);
  const [yourContent, setYourContent] = useState([]);
  const onChange = (e) => {
    const value = e.target.value;

    setMessage(value);
  };
  const onClick = (e) => {
    e.preventDefault();

    socket.emit("message", {
      roomName: roomId,
      user,
      message,
      timestamps: Date.now(),
    });

    setMyContent((prev) => [...prev, {
      roomName: roomId,
      user,
      message,
      timestamps: Date.now(),
    }]);
    setMessage("");
  };

  useEffect(() => {
    setContents([...myContent, ...yourContent].sort((a, b) => a.timestamps - b.timestamps));
  }, [myContent.length, yourContent.length]);

  useEffect(() => {
    const socket = io.connect("http://localhost:8000", {
      withCredentials: true,
    });

    setSocket(socket);

    const codedId = ["TzmfH5CNMrcIn2hnFnOe6HMTbVu2", "chong"].sort().join(""); // 여기에 component로 받는 user, friends넣기

    setRoomId(codedId);
    socket.emit("chatRoom", { users: ["TzmfH5CNMrcIn2hnFnOe6HMTbVu2", "chong"] }); // 여기에 component로 받는 user, friends넣기
    socket.on("prevMessages", ({contents}) => {
      setContents(contents);
    });

    socket.on("message", (message) => {
      setYourContent((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <ChatRoomLayout>
      <ChatRoomBox>
        <TitleHeader>대화방</TitleHeader>
        <MessageBox>
          <div id="me">me: hi</div>
          <div id="friend">friend: byes</div>
          {contents.map((content) => {
            if (content.user === user) {
              return <div id="me" key={content.timestamps}>me: {content.message} </div>;
            } else {
              return <div id="you" key={content.timestamps}>you: {content.message} </div>
            }
          })}
        </MessageBox>
        <InputBox>
          <input value={message} onChange={onChange} />
          <input type="button" value="go" onClick={onClick} />
        </InputBox>
      </ChatRoomBox>
    </ChatRoomLayout>
  );
}

export default ChatRoom;
