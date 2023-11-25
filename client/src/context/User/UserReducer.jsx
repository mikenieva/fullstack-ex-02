// ./src/context/User

const UserReducer = (globalState, action) => {
  switch (action.type) {
    case "SUCCESFUL_REGISTER":
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
