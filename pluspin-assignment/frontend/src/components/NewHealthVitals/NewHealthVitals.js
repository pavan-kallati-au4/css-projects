import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

const NewHealthVitals = ({ dispatch, userData }) => {
  const { bpvalues, sugarlevels } = userData;

  const [bp, setbp] = useState("0/0");
  const [sugar, setSugar] = useState(0);
  const [sugarAlert, setSugarAlert] = useState(false);
  const [bpAlert, setbpAlert] = useState(false);

  function averageBP() {
    const bpSum = bpvalues.reduce(
      (acc, val) => {
        return [acc[0] + val.split("/")[0] * 1, acc[1] + val.split("/")[1] * 1];
      },
      [0, 0]
    );
    let sys = Math.floor(bpSum[0] / bpvalues.length);
    let dys = Math.floor(bpSum[1] / bpvalues.length);
    return `${sys}/${dys}`;
  }

  function averageSugar() {
    const sugar =
      sugarlevels.reduce((acc, val) => acc + val, 0) / sugarlevels.length;
    return Math.floor(sugar);
  }

  function handleBP(key, e) {
    let value;
    if (key === "sys") {
      let dys = bp.split("/")[1];
      value = `${Math.abs(e.target.value)}/${dys}`;
    } else {
      let sys = bp.split("/")[0];
      value = `${sys}/${Math.abs(e.target.value)}`;
    }
    setbp(value);
  }

  async function uploadSugarValue() {
    if (
      sugar > averageSugars + Math.floor(0.2 * averageSugars) ||
      sugar < averageSugars - Math.floor(0.2 * averageSugars)
    ) {
      setSugarAlert(true);
    }
    sugarlevels.push(sugar * 1);
    const data = await axios.patch(
      "http://localhost:4000/api/user",
      {
        sugarlevels,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setSugar(0);
    dispatch({
      type: "SET_USER_DATA",
      payload: data.data.data,
    });
  }

  async function uploadBPValue() {
    let [sys, dys] = bp.split("/");
    if (
      sys > sys * 1 + Math.floor(0.2 * sys) ||
      sys < sys * 1 - Math.floor(0.2 * sys) ||
      dys > dys * 1 + Math.floor(0.2 * dys) ||
      dys > dys * 1 - Math.floor(0.2 * dys)
    ) {
      setbpAlert(true);
    }
    bpvalues.push(bp);
    const data = await axios.patch(
      "http://localhost:4000/api/user",
      {
        bpvalues,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setbp('0/0');
    dispatch({
      type: "SET_USER_DATA",
      payload: data.data.data,
    });
  }

  const averageSugars = averageSugar();
  const averageBPS = averageBP();
  return (
    <div className="my-5">
      {(sugarAlert || bpAlert)
        && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Oops!</strong> You health is deteriorating, Please consult a
            doctor!
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={() => {
                setSugarAlert(false)
                setbpAlert(false)
              }}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      <div className="card card-outline-secondary">
        <div className="card-header">
          <h3 className="mb-0">Health Vitals Information</h3>
        </div>
        <div className="form-group row mt-3">
          <label className="col-lg-3 col-form-label form-control-label">
            Blood Pressure
          </label>
          <div className="col-lg-2">
            <input
              className="form-control"
              type="number"
              value={bp.split("/")[0]}
              onChange={(e) => handleBP("sys", e)}
              min="0"
            />
          </div>
          /
          <div className="col-lg-2">
            <input
              className="form-control"
              type="number"
              value={bp.split("/")[1]}
              onChange={(e) => handleBP("dys", e)}
              min="0"
            />
          </div>
          <div className="col-lg-3">
            <button
              className="btn btn-success"
              disabled={!(bp.split("/")[0] * 1 && bp.split("/")[1] * 1)}
              onClick={() => uploadBPValue()}
            >
              Add BP Value
            </button>
          </div>
        </div>
        <p>Average BP values - {averageBPS}</p>
        <div className="form-group row">
          <label className="col-lg-3 col-form-label form-control-label">
            Blood Sugar Level
          </label>
          <div className="col-lg-6">
            <input
              className="form-control"
              type="number"
              value={sugar}
              onChange={(e) => setSugar(e.target.value * 1)}
              min="0"
            />
          </div>
          <div className="col-lg-3">
            <button
              className="btn btn-success"
              disabled={!sugar}
              onClick={() => uploadSugarValue()}
            >
              Add Sugar Value
            </button>
          </div>
        </div>
        <p className="">Average Sugar values - {averageSugars}</p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ userData }) => {
  return {
    userData,
  };
};

export default connect(mapStateToProps)(NewHealthVitals);
