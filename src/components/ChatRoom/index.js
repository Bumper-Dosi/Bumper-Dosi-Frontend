import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { COLOR } from "../../constants";

const ChatRoomLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 400px;
  height: 350px;

  position: absolute;
  left: 10px;
  bottom: 10px;

  border: solid 1px;
  border-radius: 30px;
  background-color: rgba(246, 247, 248, 0.8);
  box-shadow: 0px 5px 8px 3px rgb(0 0 0 / 30%),
    0px 2px 5px -2px rgba(0, 0, 0, 0.418), 0px 2px 5px -7px rgb(0 0 0 / 20%);
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

function ChatRoom({ user, friendUid, friendName }) {
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [contents, setContents] = useState([]);
  const [socket, setSocket] = useState(false);
  const [myContents, setMyContents] = useState([]);
  const [friendContents, setFriendContents] = useState([]);

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

    setMyContents((prev) => [
      ...prev,
      {
        roomName: roomId,
        user,
        message,
        timestamps: Date.now(),
      },
    ]);
    setMessage("");
  };

  useEffect(() => {
    setContents(
      [...myContents, ...friendContents].sort(
        (a, b) => a.timestamps - b.timestamps
      )
    );
  }, [myContents.length, friendContents.length]);

  useEffect(() => {
    const socket = io.connect("http://localhost:8000", {
      withCredentials: true,
    });

    setSocket(socket);

    const codedId = [user, friendUid].sort().join("");

    setRoomId(codedId);
    socket.emit("chatRoom", { users: [user, friendUid] });
    socket.on("prevMessages", ({ contents }) => {
      setContents(contents);
    });

    socket.on("message", (message) => {
      setFriendContents((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <ChatRoomLayout>
      <TitleHeader>대화방</TitleHeader>
      <MessageBox>
        {contents.map((content) => {
          if (content.user === user) {
            return (
              <div id="me" key={content.timestamps}>
                me: {content.message}
              </div>
            );
          } else {
            return (
              <div id="friend" key={content.timestamps}>
                {friendName}: {content.message}
              </div>
            );
          }
        })}
      </MessageBox>
      <InputBox>
        <input value={message} onChange={onChange} />
        <input type="button" value="go" onClick={onClick} />
      </InputBox>
    </ChatRoomLayout>
  );
}

export default ChatRoom;
