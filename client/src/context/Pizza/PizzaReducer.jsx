// ./src/context/PizzaReducer.jsx

const PizzaReducer = (globalState, action) => {
  switch (action.type) {
    case "GET_PIZZAS":
      return {
        ...globalState,
        pizzas: action.payload,
      }

    default:
      return globalState
  }
}

export default PizzaReducer
