import Axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const HealthVitals = ({ dispatch, health }) => {
  const { height, weight, sugar, bp } = health;

  function handleUserData(key1, e) {
    dispatch({
      type: "SET_HEALTH_DATA",
      payload: {
        key1,
        value1: Math.abs(e),
      },
    });
  }

  function checkValidValues() {
    return height > 0 && weight > 0 && sugar > 0 && bp[0].split("/")[0] > 0 && bp[0].split("/")[1] > 0
  }

  async function submitHealth(e) {
    e.preventDefault();
    const data = await axios.patch('http://localhost:4000/api/user', {
      height,
      weight,
      bpvalues: bp,
      sugarlevels: sugar
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    dispatch({
      type: "SET_USER_DATA",
      payload: data.data.data
    });
  }

  function handleBP(key, e) {
    let value;
    if (key === "sys") {
      let dys = bp[0].split("/")[1]
      value = `${Math.abs(e.target.value)}/${dys}`
    } else {
      let sys = bp[0].split("/")[0]
      value = `${sys}/${Math.abs(e.target.value)}`
    }
    dispatch({
      type: "SET_HEALTH_DATA",
      payload: {
        key1: "bp",
        value1: [value]
      }
    })
  }

  return (
    <div className="my-5">
      <form>
        <div className="card card-outline-secondary">
          <div className="card-header">
            <h3 className="mb-0">Health Vitals Information</h3>
          </div>
          <div className="card-body">
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                Height(in cms)
                </label>
              <div className="col-lg-9">
                <input
                  className="form-control"
                  type="number"
                  value={height}
                  onChange={(e) => handleUserData("height", Math.abs(e.target.value))}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                Weight(in kgs)
                </label>
              <div className="col-lg-9">
                <input
                  className="form-control"
                  type="number"
                  value={weight}
                  onChange={(e) => handleUserData("weight", Math.abs(e.target.value))}
                  min="0"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                Blood Pressure
                </label>
              <div className="col-lg-2">
                <input
                  className="form-control"
                  type="number"
                  value={bp[0].split("/")[0]}
                  onChange={(e) => handleBP("sys", e)}
                  min="0"
                />
              </div>
              /
              <div className="col-lg-2">
                <input
                  className="form-control"
                  type="number"
                  value={bp[0].split("/")[1]}
                  onChange={(e) => handleBP("dys", e)}
                  min="0"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                Blood Sugar Level
                </label>
              <div className="col-lg-9">
                <input
                  className="form-control"
                  type="number"
                  value={sugar}
                  onChange={(e) => handleUserData("sugar", Math.abs(e.target.value))}
                  min="0"
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label"></label>
              <div className="col-lg-9">
                <button className="btn btn-success" type="submit" disabled={!checkValidValues()} onClick={(e) => submitHealth(e)}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
};

const mapStateToProps = ({ health }) => {
  return {
    health,
  };
};

export default connect(mapStateToProps)(HealthVitals);