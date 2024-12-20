import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [brandName, setbrandName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("developer");
  const [isSignedUp, setIsSignedUp] = useState(false); // Toggle between login and signup

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const { accountType } = userDoc.data();
          navigate(accountType === "developer" ? "/developer-dashboard" : "/realtor-dashboard");
        }
      }
    });
    return () => unsubscribe();
  }, []);


  // Handle Sign-Up
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        brandName: user.brandName,
        accountType: role, // "developer" or "realtor"
        createdAt: new Date(),
      });

      console.log("User signed up and data saved to Firestore");
      navigate(role === "developer" ? "/developer-dashboard" : "/realtor-dashboard"); // Navigate to the appropriate dashboard
    } catch (err) {
      console.error("Error during sign up:", err.message);
    }
  };

  // Handle Login
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch account type from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const { accountType } = userDoc.data();
        console.log("User logged in with account type:", accountType);

        navigate(accountType === "developer" ? "/developer-dashboard" : "/realtor-dashboard"); // Navigate
      } else {
        console.error("User document does not exist");
      }
    } catch (err) {
      console.error("Error during login:", err.message);
    }
  };

  return (
    <div className="login">
      <h2>{isSignedUp ? "Sign Up" : "Login"}</h2>
      <input
        type="text"
        required
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {isSignedUp && (
        <>
          <input
            type="text"
            placeholder="Brand Name"
            value={brandName}
            onChange={(e) => setbrandName(e.target.value)}
            required
          />

          <select required value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="developer">Developer</option>
            <option value="realtor">Realtor</option>
          </select>
        </>

      )}

      <input
        type="password"
        placeholder="Password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={isSignedUp ? handleSignUp : handleLogin}>
        {isSignedUp ? "Sign Up" : "Login"}
      </button>
      <p onClick={() => setIsSignedUp(!isSignedUp)}>
        {isSignedUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Login;