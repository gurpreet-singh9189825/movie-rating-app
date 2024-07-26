import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../authentication/firebase";
import { ToastContainer, toast } from "react-toastify";

const Header: FC = () => {
  const [isUser, setIsUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUser(user);
      }
    });
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        setIsUser(null);
        toast.success("Sign out successful!", {
          position: "top-right",
        });
      })
      .catch((error) => {
        console.log("problem signing out user", error);
      });
  };

  return (
    <header className="navbar">
      <nav className="nav">
        <div className="logo">
          <Link to="/" className="logo">
            Home
          </Link>
        </div>
        {isUser ? (
          <div>
            <div className="links-welcome">Welcome {isUser.email}</div>
            <div onClick={handleLogout} className="logout">
              logout
            </div>
          </div>
        ) : (
          <div className="links">
            <Link to="/register" className="register">
              Register
            </Link>
            <Link to="/login" className="login">
              Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
