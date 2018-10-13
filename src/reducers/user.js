const user = (state = {}, action) => {

  switch (action.type) {

    case 'SAVE_USER':
      return {
        ...state,
        redirectToDashboard: true,
        user: action.user
      };
    default:
      return {
        ...state
      }
  }
};

export default user;