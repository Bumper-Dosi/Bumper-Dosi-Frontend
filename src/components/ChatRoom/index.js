import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import BackSVG from "./SVG/BackSVG";

const ChatRoomLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

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

  width: 100%;
  border-radius: 30px 30px 0 0;
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
  height: 90%;

  overflow: auto;

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

  width: 40%;

  margin-top: 5px;
  padding: 5px;

  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
`;

const ChatBox = styled.div``;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  position: static;
  border-top: 1px solid;

  width: 100%;
  height: 10%;
`;

const TextBox = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 0 0 30px 30px;
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
  const [socket, setSocket] = useState(null);
  const messageBoxRef = useRef();
  const saveRef = useRef();

  const onChange = (e) => {
    const value = e.target.value;

    setMessage(value);
  };

  const onKeyPress = (e) => {
    if (!message.length) return;

    if (e.key === "Enter") {
      e.preventDefault();

      socket.emit("message", {
        roomName: roomId,
        user,
        message,
        timestamps: Date.now(),
      });

      setContents((prev) => [
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
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight + 40;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [contents.length]);

  useEffect(() => {
    saveRef.current = contents.sort((a, b) => a.timestamps - b.timestamps);
  }, [contents.length]);

  useEffect(() => {
    const socket = io.connect("http://bumper-dosi-dev.ap-northeast-2.elasticbeanstalk.com", {
      withCredentials: true,
    });

    setSocket(socket);

    const codedId = [user, friendUid].sort().join("");

    setRoomId(codedId);
    socket.emit("chatRoom", { users: [user, friendUid] });
    socket.on("prevMessages", ({ contents }) => {
      contents.length && setContents(contents);
    });

    socket.on("message", (content) => {
      setContents((prev) => [...prev, content]);
    });

    return () => {
      const saveContents = saveRef.current;

      socket.emit("save messages", { contents: saveContents });
      socket.disconnect();
    };
  }, []);

  return (
    <ChatRoomLayout>
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
      <MessageBox ref={messageBoxRef}>
        {contents.map((content) => {
          if (content.user === user) {
            return (
              <BubbleBox id="me" key={content.timestamps}>
                <ChatBox>{content.message}</ChatBox>
              </BubbleBox>
            );
          } else {
            return (
              <BubbleBox id="friend" key={content.timestamps}>
                <ChatBox>{content.message}</ChatBox>
              </BubbleBox>
            );
          }
        })}
      </MessageBox>
      <InputBox>
        <TextBox value={message} onChange={onChange} onKeyPress={onKeyPress} />
      </InputBox>
    </ChatRoomLayout>
  );
}

export default ChatRoom;
