import React from 'react';
import { EmojiEmotions, Label, PermMedia, Room } from '@material-ui/icons';
import { AuthContext } from '../../Context/AuthContext';
import { useState, useContext, useRef } from 'react';
import { Cancel } from '@material-ui/icons';
import axios from 'axios';
import './share.css';

export default function Share() {
  const [file, setFile] = useState(null);
  const [emoji, setEmoji] = useState(null);

  const desc = useRef();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return window.alert('First select the file/photo');
    }
    const newPost = { userId: user._id, desc: desc.current.value };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      newPost.img = filename;
      try {
        await axios.post('/upload', data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post('/posts', newPost);
      window.location.reload();
    } catch (err) {
      console.log('Share file error', err);
    }
  };

  const handleremove = () => {
    const container = document.getElementById('removeMargin');
    container.classList.add('mb-5');

    const emjContainer = document.getElementById('emjDiv');
    emjContainer.style.display = 'none';
  };

  return (
    <div
      className="card mt-3 mb-5"
      id="removeMargin"
      style={{
        width: '99%',
        boxShadow: '0px 0px 16px -8px rgb(0, 0, 0, 0.6)',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="d-flex my-2 ml-3">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + 'noUserImage.png'
            }
            alt=""
            style={{ height: '60px', width: '60px' }}
            className="rounded-circle"
          ></img>
          <div style={{ width: '15px' }}></div>
          <div className="d-flex align-items-center" style={{ width: '85%' }}>
            <input
              placeholder={`What's in your mind ${user.username}?`}
              className="form-control border-0"
              ref={desc}
            />
          </div>
        </div>
        <hr />
        {file && (
          <div style={{ position: 'relative' }}>
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="my-2 mx-4"
              style={{ height: '350px', width: '635px' }}
            ></img>
            <Cancel
              onClick={() => setFile(null)}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '5px',
                cursor: 'pointer',
              }}
            />
          </div>
        )}
        <div className="d-flex align-items-center justify-content-around">
          <div
            className="d-flex justify-content-around mt-1 mb-3 ml-2"
            style={{ width: '70%' }}
          >
            <label
              htmlFor="file"
              className="d-flex align-items-center mt-2"
              style={{ cursor: 'pointer' }}
            >
              <PermMedia htmlColor="tomato" />
              <span className="pl-2">Photo or Video</span>
              <input
                className="d-none"
                type="file"
                id="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="d-flex align-items-center">
              <Label htmlColor="blue" />
              <span className="pl-2">Tag</span>
            </div>
            <div className="d-flex align-items-center">
              <Room htmlColor="green" />
              <span className="pl-2">Location</span>
            </div>
            <div className="d-flex align-items-center">
              <EmojiEmotions htmlColor="goldenrod" />
              <span className="pl-2">Feelings</span>
            </div>
          </div>
          <div className="bg-warning mt-1 mb-3" style={{ width: '10%' }}>
            <button
              type="submit"
              className="btn btn-success btn-block rounded-4"
            >
              Share
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
