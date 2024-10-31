import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem("users"));
        const foundUser = users.find(user => user.email === email && user.password === password);
        
        if (foundUser) {
          setUser(foundUser);
          localStorage.setItem("loggedInUser", JSON.stringify(foundUser)); // Save logged-in status
          navigate(foundUser.accountType === 'developer' ? '/developer-dashboard' : '/realtor-dashboard');
        } else {
          alert("Invalid email or password");
        }
      };
      

    return (
        <div className="login">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
