import React, { useContext, useState, useEffect } from 'react';
import './Login.css';
import { UserContext } from './App';
import { fetchUserList } from './service';

const Login = () => {
  const defaultUsers = [
    {
      index: 1,
      name: 'Baibhav Saxena',
      userID: 'BS1',
      password: 'Shreyyuuu@123',
    },
    {
      index: 2,
      name: 'Shreya Shukla',
      userID: 'SS1',
      password: 'Baibhav@123',
    },
  ];

  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const authUserList = JSON.parse(localStorage.getItem('authUserList')) || defaultUsers
  const [userList, setUserList] = useState([] || authUserList);

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  // const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // getting userList from service.js
  useEffect(()=>{
    const userListData = async () =>{
    // In case if server is not running
      try{if(userList && userList.length>0){
        const userListResult = await fetchUserList();
        setUserList(userListResult)
      } else {
        setUserList(authUserList)
      }
        
      } catch(err) {
        console.log(err)
      }
    }
    userListData();
  },[])

  useEffect(() => {
    // In case if server is not running
    if(userList && userList.length>0){
      localStorage.setItem('authUserList', JSON.stringify(userList));
    } else {
      localStorage.setItem('authUserList', JSON.stringify(authUserList));
    }
  }, [userList]);

  const toggleSignupModal = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
  };

  const handleLogin = () => {
    let successfulLoginFlag = false;

    userList.map((item) => {
      if (
        item.userID.toLowerCase() === userName.toLowerCase() &&
        item.password === userPassword
      ) {
        console.log('User is verified');
        successfulLoginFlag = true;
        return setIsLoggedIn(true);
      }
      return null;
    });

    if (!successfulLoginFlag) {
      alert('Invalid username or password');
    }

    setUserPassword('');
    setUserName('');
  };

  const handleSignupSubmit = async (event) => {
      event.preventDefault();
      const newUser = {
          index: authUserList.length + 1,
          name: event.target?.[0].value,
          userID:event.target?.[1].value,
          password: event.target?.[2].value,
      }
    const isEmailExisting = userList.some(user => user.userID === newUser.userID);
    if(isEmailExisting) {
      alert('userID already exists, please pick a different id')
    } else {
      try {
        const addNewUserRes = await fetch('http://localhost:3020/createUser',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser)
        })
        const addNewUser = await addNewUserRes.json()
      setUserList([...userList, addNewUser])

      const updatedUserList = await fetchUserList();
      setUserList(updatedUserList);

      } catch(err) {
        alert("Can't add the new user. Please check logs, something went wrong")
        console.log(err)
      }
      


    setIsSignupModalOpen(false);
    }      
};

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <label>User ID</label>
        <input
          type="string"
          placeholder="Enter user id"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={userName.length === 0}>
          Login
        </button>
        <button onClick={toggleSignupModal}>Sign Up</button>
      </div>

      {isSignupModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleSignupModal}>
              &times;
            </span>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input type="text" placeholder="Username" required />
              <input type="text" placeholder="userID" required />
              <input type="password" placeholder="Password" required />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
