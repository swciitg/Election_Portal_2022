import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./CandidatePositionForm.module.css";
import TopNav from "../../components/Home/TopNav/TopNav";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getPos } from "../../actions/positions";
import { getUser } from "../../actions/auth";
import { candidateRegistration } from "../../api";
import { Navigate, useNavigate } from "react-router-dom";
import { SET_CANDIDATE_DATA } from "../../constants";

// import { useNavigate } from "react-router-dom";

const CandidatePositionForm = () => {
  const positions = useSelector((store) => store.positions);
  const navigate = useNavigate();
  const userData = useSelector((store) => store.auth);
  const [error, setError] = useState(null);
  const posRef = useRef(null);

  const dispatch = useDispatch();

  const registerCandidate = async () => {
    if (!posRef.current.value) {
      setError("Please select valid post!!");
      return;
    }
    try {
      const res = await candidateRegistration({
        position: parseInt(posRef.current.value),
      });
      dispatch({ type: SET_CANDIDATE_DATA, data: res.data });
      dispatch(getUser());
      navigate("/nominate/about");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Something went wrong!Please try logging in again."
      );
    }
  };

  useEffect(() => {
    dispatch(getPos());
  }, []);

  return (
    <div className="">
      <Helmet>
        <title>Nominate Yourself</title>
        <style>{"body { background-color: #f8fafe; }"}</style>
      </Helmet>
      {/* <TopNav /> */}
      <div className={`${styles.cont} ml-2.5 mr-2.5 sm:ml-auto sm:mr-auto `}>
        <h1 className="text-4xl pb-4 mb-4">
          {" "}
          Nominate Yourself as a Candidate{" "}
        </h1>
        <div>
          <form>
            <label for="name" className="font-semibold text-s text-gray-800">
              Name:{" "}
            </label>
            <br />
            <input
              type="text"
              id="Name"
              name="name"
              disabled
              defaultValue={userData?.first_name}
              className={` ${styles.input} md:w-11/12 w-full`}
            />
            <br />
            <br />
            <label for="degree" className="font-semibold text-s text-gray-800">
              Post:{" "}
            </label>{" "}
            <br />
            <select
              id="degree"
              className={` ${styles.input} md:w-11/12 w-full`}
              required
              ref={posRef}
            >
              {positions?.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            <br />
            <br />
          </form>
        </div>
        {error && <p className="text-red">{error}</p>}

        <button
          className={styles.button2}
          type="submit"
          onClick={registerCandidate}
        >
          Continue
        </button>

        <button
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/election_portal";
          }}
        >
          Cancel{" "}
        </button>
      </div>
    </div>
  );
};

export default CandidatePositionForm;
