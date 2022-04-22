import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { checkVoterId } from "../redux/actions/voter";
import StatusScreen from "./StatusScreen";

const EnterVoterIdScreen = () => {
  const [voterId, setVoterId] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(checkVoterId(voterId))
      .then((res) => {
        if (res.message) {
          console.log("error");
          setErrorMsg(res.message);
        } else {
          setErrorMsg("");
          history.push("/vicepresident");
        }
      })
      .catch((e) => {
        console.log("checkVoterId: ", e.response.data);
      });
  };

  return (
    <>
      <StatusScreen>
        <form className="w-2/5" onSubmit={(e) => submitHandler(e)}>
          <h2 className="text-3xl font-atkinson">Enter Voter ID</h2>
          <div className="my-4">
            <input
              type="text"
              required
              style={{ border: "1.4px solid #2B00FF" }}
              className="py-1 px-4 rounded-md w-3/4 focus:outline-none focus:border-8"
              value={voterId}
              onChange={(e) => setVoterId(e.target.value)}
            />
            {errorMsg.length !== 0 && (
              <p className="text-sm text-red-500">{errorMsg}</p>
            )}
          </div>
          <button className="rounded-md py-2 px-5 bg-blueBg text-white hover:bg-blue-900">
            Continue
          </button>
        </form>
      </StatusScreen>
      {/* <div className="w-full h-screen flex justify-center items-center">

    </div> */}
    </>
  );
};

export default EnterVoterIdScreen;