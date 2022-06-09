import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import BackSVG from "./SVG/BackSVG";

const ChatRoomLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  overflow: auto;

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
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  position: sticky;
  top: 0;

  width: 100%;
  border-bottom: solid 0.05px;

  background-color: rgba(255, 255, 255, 1);
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

const BackButton = styled.button`
  padding: 5px;
  border: none;
  background-color: transparent;
  font-weight: bold;
  font-size: 30px;
  color: green;
`;

const TitleHeader = styled.header`
  font-size: 25px;
  margin: 5px 80px;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  width: 100%;
  height: 100%;

  margin: 10px;
  #me {
    margin-left: 190px;
  }

  #friend {
    margin-left: 20px;
  }
`;

const BubbleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 180px;
  height: 50px;

  margin-top: 5px;

  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  position: static;
  border-top: 1px solid;

  position: sticky;
  bottom: 0;

  width: 100%;
  height: 10%;
`;

const TextBox = styled.input`
  width: 100%;
  height: 30px;

  padding-left: 10%;
  border-style: none;
`;

function ChatRoom({
  user,
  friendUid,
  friendName,
  setIsChatMode,
  setIsFriendListOpened,
}) {
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [contents, setContents] = useState([]);
  const [socket, setSocket] = useState(false);
  const [myContents, setMyContents] = useState([]);
  const [friendContents, setFriendContents] = useState([]);
  const messageBoxRef = useRef();
  const saveRef = useRef();

  const onChange = (e) => {
    const value = e.target.value;

    setMessage(value);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
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
    }
  };

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const newMessages = [...myContents, ...friendContents].sort(
      (a, b) => a.timestamps - b.timestamps
    );

    setContents(newMessages);
    scrollToBottom();

    saveRef.current = { user, friend: friendUid, messages: newMessages };
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
      contents.length &&
        contents.map((content) => {
          if (content.user === user) {
            setMyContents((prev) => [...prev, content]);
          } else {
            setFriendContents((prev) => [...prev, content]);
          }
        });
      setContents(contents);
    });

    socket.on("message", (content) => {
      setFriendContents((prev) => [...prev, content]);
    });

    return () => {
      const saveContents = saveRef.current;

      socket.emit("save messages", { contents: saveContents });
      socket.disconnect();
    };
  }, []);

  return (
    <ChatRoomLayout ref={messageBoxRef}>
      <HeaderBox>
        <CloseButton
          type="button"
          onClick={() => {
            setIsFriendListOpened(false);
          }}
        >
          X
        </CloseButton>
        <BackButton
          type="button"
          onClick={() => {
            setIsChatMode(false);
          }}
        >
          <BackSVG />
        </BackButton>
        <TitleHeader>{friendName}</TitleHeader>
      </HeaderBox>
      <MessageBox>
        {contents.map((content) => {
          if (content.user === user) {
            return (
              <BubbleBox id="me" key={content.timestamps}>
                {content.message}
              </BubbleBox>
            );
          } else {
            return (
              <BubbleBox id="friend" key={content.timestamps}>
                {content.message}
              </BubbleBox>
            );
          }
        })}
      </MessageBox>
      <InputBox>
        <TextBox value={message} onChange={onChange} onKeyDown={onKeyDown} />
      </InputBox>
    </ChatRoomLayout>
  );
}

export default ChatRoom;
