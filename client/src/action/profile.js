import axios from "axios";
import { setCurrentUser } from "./action";

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    console.log(111111111, res);

    dispatch({
      type: "PROFILE_SUCCESS",
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data;

    dispatch({
      type: "PROFILE_FAIL",
      payload: { ...errors },
    });
  }
};
export const creatProfile = (form, history, edit: false) => async (
  dispatch
) => {
  const head = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(form);
  try {
    const res = await axios.post("/api/profile", body, head);
    console.log(1, res);
    dispatch({
      type: "REGISTER_PROFILE",
      payload: res.data,
    });

    dispatch(
      setCurrentUser(edit ? "profile update" : "profile update", "success")
    );
    if (!edit) {
      history.push("/Dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    console.log("error in profile post ", errors);
    if (errors) {
      errors.forEach((element) =>
        dispatch(setCurrentUser(element.msg, "danger"))
      );
    }
  }
};

export const addExperience = (form, history, edit: false) => async (
  dispatch
) => {
  const head = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(form);
  try {
    const res = await axios.put("/api/profile/experience", body, head);
    console.log("1experience responce", res);
    dispatch({
      type: "REGISTER_EXPERIENCE",
      payload: res.data,
    });

    dispatch(
      setCurrentUser(
        edit ? "experience update" : "experience created",
        "success"
      )
    );
    if (!edit) {
      history.push("/Dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    console.log("error in profile post experience ", errors);
    if (errors) {
      errors.forEach((element) =>
        dispatch(setCurrentUser(element.msg, "danger"))
      );
      dispatch({
        type: "EXPERIENCE_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
export const addEducation = (form, history, edit: false) => async (
  dispatch
) => {
  const head = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(form);
  try {
    const res = await axios.put("/api/profile/education", body, head);
    console.log("1education responce", res);
    dispatch({
      type: "REGISTER_EDUCATION",
      payload: res.data,
    });

    dispatch(
      setCurrentUser(
        edit ? "experience update" : "education  created",
        "success"
      )
    );
    if (!edit) {
      history.push("/Dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;
    console.log("error in profile post experience ", errors);
    if (errors) {
      errors.forEach((element) =>
        dispatch(setCurrentUser(element.msg, "danger"))
      );
    }

    dispatch({
      type: "EDUCATION_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const DeleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    console.log("delete experience", res);
    dispatch({
      type: "DELETE_EXPERIENCE",
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log("error in profile delete experience ", errors);
    if (errors) {
      errors.forEach((element) =>
        dispatch(setCurrentUser(element.msg, "danger"))
      );
    }

    dispatch({
      type: "DELETE_EXPERIENCE_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const DeleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    console.log("delete education", res);
    dispatch({
      type: "DELETE_EDUCATION",
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log("error in profile delete Education ", errors);
    if (errors) {
      errors.forEach((element) =>
        dispatch(setCurrentUser(element.msg, "danger"))
      );
    }

    dispatch({
      type: "DELETE_EDUCATION_ERROR",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export const DeletProfile = () => async (dispatch) => {
  if (window.confirm("are you sure to dlelete your profile?")) {
    try {
      const res = await axios.delete("/api/profile");
      console.log("messge from delet profile", res.data);
      dispatch({
        type: "DELET_PROFILE",
      });
      dispatch(setCurrentUser(res.data.msg, "danger"));
    } catch (err) {
      const errors = err.response.data.errors;
      console.log("error in profile delete  ", errors);
      if (errors) {
        errors.forEach((element) =>
          dispatch(setCurrentUser(element.msg, "danger"))
        );
      }

      dispatch({
        type: "DELETE_PROFILE_ERROR",
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
export const GetProfiles = () => async (dispatch) => {

  dispatch({type: "CLEAR_PROFILE"})
  try {
    const res = await axios.get("/api/profile");
    console.log("get profiles", res.data);

    dispatch({
      type: "GET_PROFILE",
      payload: res.data,
    });
  } catch (err) {
  

    dispatch({
      type: "GET_PROFILE_FAIL",
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const GetProfilByid=(id)=> async dispatch=>{

  dispatch({type: "CLEAR_PROFILE"})

try {
    
const res = await axios.get(`/api/profile/user/${id}`);
    console.log("get profileby id", res.data);

    dispatch({
      type: "GET_PROFILE_BYID",
      payload: res.data,
    });


    
} catch (err) {
  dispatch({
    type: "GET_PROFILE_BYID_FAIL",
    payload: { msg: err.response.statusText, status: err.response.status },
  });
}



}