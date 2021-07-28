import React from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useState, useEffect } from 'react';
import './conversation.css';
import axios from 'axios';

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member != currentUser._id
    );

    const getFriend = async () => {
      try {
        const res = await axios.get(
          'https://codecial-server.herokuapp.com/api/users?userId=' + friendId
        );
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFriend();
  }, [conversation, currentUser]);

  return (
    <div>
      <img
        src={
          user && user.profilePicture
            ? PF + user.profilePicture
            : PF + 'noUserImage.png'
        }
        alt=""
        style={{ height: '32px', width: '32px' }}
        className="rounded-circle ml-2"
      ></img>
      <span className="ml-2">{user?.username}</span>
    </div>
  );
}
