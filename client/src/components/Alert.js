import React from "react";
import { connect } from "react-redux";

const Alert = (props) => {
  return (
    <>
      {props.currentUser.map((aale) => {
        return (
          <div key={aale.id} className={`alert alert-${aale.alerttyp}`}>
            {aale.user}
          </div>
        );
      })}
    </>
  );
};

const gettheState = ({ userReducer }) => ({
  currentUser: userReducer,
});
export default connect(gettheState)(Alert);
