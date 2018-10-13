const jobs = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_JOBS_RESPONSE':
      return {
        ...state,
        items: action.jobs
      };
    default:
      return {
        ...state
      }
  }
};

export default jobs;