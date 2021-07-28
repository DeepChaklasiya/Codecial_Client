import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';

export default function Online({ userId }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `https://codecial-server.herokuapp.com/api/users?userId=${userId}`
        );
        setUser(res.data);
      } catch (err) {
        console.log('Online File Error', err);
      }
    };
    getUser();
  }, [userId]);

  return (
    <ul className="list-group">
      <li
        className="d-flex align-items-center my-2 pl-2"
        style={{
          height: '40px',
          width: '100%',
          borderRadius: '10px',
        }}
      >
        <div className="relativePosition">
          <img
            src={
              user?.profilePicture
                ? PF + user.profilePicture
                : PF + 'noUserImage.png'
            }
            alt="empty"
            style={{ height: '30px', width: '30px' }}
            className="rounded-circle"
          ></img>
          <span className="rightbarOnline"></span>
        </div>
        <div style={{ width: '15px' }}></div>
        <span>{user?.username}</span>
      </li>
    </ul>
  );
}
