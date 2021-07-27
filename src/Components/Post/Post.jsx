import { Delete } from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import axios from "axios";
import { Link } from "react-router-dom";
// import { Users } from "../../dummyData";
import { AuthContext } from "../../Context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [isLike, setIsLike] = useState(false);

  useEffect(() => {
    setIsLike(post.likes.includes(currentUser?._id));
  }, [currentUser?._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };

    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      const res = await axios.put(`/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
    } catch (err) {
      console.log("post file error", err);
    }
    setLike(isLike ? like - 1 : like + 1);
    setIsLike(!isLike);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/posts/${post._id}`);
      window.alert(res.data);
      window.location.reload();
    } catch (err) {
      console.log("Post file error");
    }
  };

  return (
    <div style={{ width: "99%" }}>
      <div className="card mb-4">
        <div className="d-flex justify-content-between my-2 ml-3">
          <div>
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noUserImage.png"
                }
                alt=""
                style={{ height: "27px", width: "27px" }}
                className="rounded-circle"
              ></img>
            </Link>
            <span className="pl-2 ">{user.username}</span>
            <span className="pl-2 small" style={{ color: "#636763" }}>
              {format(post.createdAt)}
            </span>
          </div>
          <div
            className="mr-2"
            onClick={handleDelete}
            style={{ color: "#636763", cursor: "pointer" }}
          >
            {post.userId === currentUser._id && <Delete />}
          </div>
        </div>
        <div>
          <div className="mx-3">
            <span>{post.desc}</span>
          </div>

          <img
            src={PF + post.img}
            alt=""
            className="my-2 mx-3"
            style={{ height: "400px", width: "655px" }}
          ></img>
        </div>
        <div className="mx-3 my-3 d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src={PF + "4.png"}
              height="24px"
              width="24px"
              onClick={likeHandler}
              style={{ cursor: "pointer" }}
              className="mr-1"
            />
            <img
              src={PF + "5.png"}
              height="24px"
              width="24px"
              style={{ cursor: "pointer" }}
              className="mr-1"
            />
            <span>{like} people like it</span>
          </div>
          <div>
            <span style={{ borderBottom: "1px dashed gray" }}>
              {post.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
