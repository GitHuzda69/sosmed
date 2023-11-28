import { makeRequest } from "../fetch";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await makeRequest("auth/login", "POST", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};