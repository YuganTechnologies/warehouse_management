import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: !!user,
      isLoading: false,
      user: user || null,
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state, action) => handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const [userData, setUserData] = useState(null);
  let userId = useRef(1);

  const initialize = async () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";

    if (isAuthenticated) {
      const user = {
        id: "5e86809283e28b96d2d38537",
        avatar: "/assets/avatars/avatar-anika-visser.png",
        name: "Anika Visser",
        email: "anika.visser@devias.io",
      };

      dispatch({ type: HANDLERS.INITIALIZE, payload: user });
    } else {
      dispatch({ type: HANDLERS.INITIALIZE });
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/Auth/LoginUser");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      setUserData(`An Error Happened: ${error}`);
    }
  };

  useEffect(() => {
    fetchUserData();
    initialize();
  }, []);

  const signIn = async (email, password) => {
    if (email !== "sample@gmail.com" || password !== "1234567890") {
      throw new Error("Please check your email and password");
    }

    window.sessionStorage.setItem("authenticated", "true");

    const user = {
      id: "5e86809283e28b96d2d38537",
      avatar: "/assets/avatars/avatar-anika-visser.png",
      name: "Anika Visser",
      email: "anika.visser@devias.io",
    };

    dispatch({ type: HANDLERS.SIGN_IN, payload: user });
  };

  const forgot = async (email) => {
    if (email !== "svinothkumar0301@gmail.com") {
      throw new Error("Enter your registered email to reset your password");
    }
    return true;
  };

  const signUp = async (email, name, password) => {
    const userData = { id: userId.current, email, name, password };
    
    try {
      const response = await fetch("http://localhost:8080/api/v1/Auth/RegisterUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      userId.current += 1;
      return result;
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  };

  const otpValidation = async (otp) => {
    if (otp.join("") !== "123456") {
      throw new Error("Enter valid OTP");
    }
    return true;
  };

  const resetPassword = async (password, confirmPassword) => {
    if (password !== confirmPassword) {
      throw new Error("Password and confirm password must be the same");
    }
    // Implement password reset logic here
    throw new Error("Reset password function is not implemented");
  };

  const signOut = () => {
    dispatch({ type: HANDLERS.SIGN_OUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        forgot,
        signIn,
        signUp,
        signOut,
        otpValidation,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);


// Backup codes

// const skip = () => {
//   try {
//     window.sessionStorage.setItem("authenticated", "true");
//   } catch (err) {
//     console.error(err);
//   }

//   const user = {
//     id: "5e86809283e28b96d2d38537",
//     avatar: "/assets/avatars/avatar-anika-visser.png",
//     name: "Anika Visser",
//     email: "anika.visser@devias.io",
//   };

//   dispatch({
//     type: HANDLERS.SIGN_IN,
//     payload: user,
//   });
// };
