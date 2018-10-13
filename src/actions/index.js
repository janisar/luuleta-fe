import jwt_decode from 'jwt-decode';

const TOKEN_KEY = "token";
const API_BASE_URL = "http://127.0.0.1:8080/";

export const fetchUser = () => {
  return fetch(API_BASE_URL + "user/1", {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  }).then(user => user.json());
};

export const postJob = (job) => {
  let token = localStorage.getItem(TOKEN_KEY);

  return fetch(API_BASE_URL + "job", {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify(
      job
    )
  }).then(result => result.text());
};
export const fetchJobsForCompany = (userId) => (dispatch, getState) => {
  let token = localStorage.getItem(TOKEN_KEY);

  return fetch(API_BASE_URL + "user/jobs", {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then(jobs => jobs.json()).then(jobs => dispatch(saveJobs(jobs)));
}

export const fetchJobs = () => (dispatch) => {
  let token = localStorage.getItem(TOKEN_KEY);
  return queryJobs(token).then(jobs => dispatch(saveJobs(jobs)));
};

const queryJobs = (token) => {
  return fetch(API_BASE_URL + "job", {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }).then(jobs => jobs.json());
}

export const showInterest = (id, reactionType) => (dispatch) => {
  let token = localStorage.getItem(TOKEN_KEY);

  return fetch(API_BASE_URL + "user/react", {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      id: id,
      reactionType: reactionType
    })
  }).then(result => result.text());
};

export const login = (email, password) => {
  return fetch(API_BASE_URL + "login", {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(token => token.text())
  .then(jwt => {
    localStorage.setItem(TOKEN_KEY, jwt);
    return jwt_decode(jwt);
  });
};

export const register = (user) => {
  return fetch(API_BASE_URL + "register", {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      role: user.role
    })
  }).then(result => result);
};

export const saveUser = (user) => ({
  type: 'SAVE_USER',
  user: user
});

export const saveJobs = (jobs) => ({
  type: 'FETCH_JOBS_RESPONSE',
  jobs: jobs
});

export const logout = () => (dispatch) => {
  localStorage.removeItem(TOKEN_KEY);
};

export const checkIfTokenExists = () => (dispatch) => {
  let token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    let user = jwt_decode(token);
    dispatch(saveUser(user));
  }
};