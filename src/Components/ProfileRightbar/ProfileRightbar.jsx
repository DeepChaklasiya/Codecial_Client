import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function ProfileRightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser?.following.includes(user._id)
  );

  useEffect(() => {
    setFollowed(currentUser?.following.includes(user._id));
  }, [currentUser, user._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });

        const flag = await axios.get(
          `/conversations/find/${currentUser._id}/${user._id}`
        );
        if (!flag.data) {
          const newConversation = {
            senderId: currentUser._id,
            receiverId: user._id,
          };

          const res = await axios.post("/conversations", newConversation);
        }
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  return (
    <div className="mr-1" style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <div
        className="container-fluid"
        style={{
          height: "calc(100vh - 55px)",
          overflow: "scroll",
        }}
      >
        {user?.username !== currentUser?.username && (
          <div className="row mb-3 mb-2">
            <div>
              <button
                className="btn btn-primary btn-block d-flex align-items-center border-none"
                style={{ curson: "pointer" }}
                onClick={handleClick}
              >
                {followed ? "Unfollow" : "Follow"}
                {followed ? <Remove /> : <Add />}
              </button>
            </div>
          </div>
        )}
        <div className="row my-3">
          <div className="mb-1" style={{ width: "100%" }}>
            <div className="font-weight-bold">User Infromation</div>
          </div>
          <div>
            <ul className="list-group">
              <li>City : &nbsp; {user.city}</li>
              <li>From : &nbsp; {user.from}</li>
              <li>
                Relationship : &nbsp;{" "}
                {user.relationship === 1
                  ? "Married"
                  : user.relationship === 2
                  ? "Unmarried"
                  : "-"}
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="mb-2" style={{ width: "100%" }}>
            <div className="font-weight-bold">User Friends</div>
          </div>
          <div className="d-flex flex-wrap align-content-start">
            <div>
              <div></div>
            </div>
            {friends.map((frnd) => (
              <Link
                to={`/profile/${frnd.username}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card border-0 ml-2 mb-2"
                  style={{ width: "100px" }}
                >
                  <img
                    src={
                      frnd.profilePicture
                        ? PF + frnd.profilePicture
                        : PF + "noUserImage.png"
                    }
                    alt=""
                    width="100px"
                    height="100px"
                    className="card-img"
                  ></img>
                  <div
                    className="card-body text-center"
                    style={{ padding: "0px" }}
                  >
                    <p className="card-text" style={{ fontSize: "15px" }}>
                      {frnd.username}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
