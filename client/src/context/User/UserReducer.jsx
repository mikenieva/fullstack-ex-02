// ./src/context/User/UserReducer.jsx

const UserReducer = (globalState, action) => {
  switch (action.type) {
    case "SUCCESSFUL_REGISTER":
      localStorage.setItem("token", action.payload)
      return {
        ...globalState,
        authStatus: true,
      }

    default:
      return globalState
  }
}

export default UserReducer
