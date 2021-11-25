import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import socketIOClient from 'socket.io-client';
import uuid from 'react-native-uuid';

const socket = socketIOClient('http://127.0.0.1:3000');
const userID = uuid.v4();

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(userID);

  useEffect(() => {
    socket.on('chat message', data => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, data),
      );
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  const onSend = useCallback((messagesData = []) => {
    setUserId(messagesData[0].user._id);
    messagesData[0].user = {
      _id: userId,
      name: `React Native - ${userId}`,
      avatar: 'https://placeimg.com/140/140/any',
    };
    socket.emit('chat message', messagesData);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      scrollToBottom
      renderAvatarOnTop
      user={{
        _id: userId,
      }}
    />
  );
};

export default App;
