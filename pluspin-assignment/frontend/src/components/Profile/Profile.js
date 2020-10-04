import Axios from "axios";
import React from "react";
import { connect } from "react-redux";

const Profile = ({ dispatch, profileData }) => {
  const { name, gender, date, address, phonenumber } = profileData;

  function handleUserData(key, e) {
    dispatch({
      type: "SET_PROFILE_DATA",
      payload: {
        key,
        value: e.target.value,
      },
    });
  }

  function calculateAge() {
    if (date) {
      let ageDifMs = Date.now() - new Date(date);
      let ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
  }

  function checkValues() {
    const validName = name.trim().length !== 0;
    const validAddress = address.trim().length !== 0;
    const validPhone = ("" + phonenumber).trim().length === 10;
    return validName && validAddress && validPhone && date && phonenumber > 0;
  }

  async function updateUser(e) {
    e.preventDefault();
    const data = await Axios.patch('http://localhost:4000/api/user', {
      name,
      address,
      contactNumber: phonenumber,
      dob: date
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
    dispatch({
      type: "SET_USER_DATA",
      payload: data.data.data
    })
  }

  return (
    <div className="my-5">
      <div className="card card-outline-secondary">
        <div className="card-header">
          <h3 className="mb-0">Profile Information</h3>
        </div>
        <div className="card-body">
          <form autocomplete="off" className="form" role="form">
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                Name
                </label>
              <div className="col-lg-9">
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => handleUserData("name", e)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                Phone Number
                </label>
              <div className="col-lg-9">
                <input
                  className="form-control"
                  type="number"
                  value={phonenumber}
                  onChange={(e) => handleUserData("phonenumber", e)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                Date of birth
                </label>
              <div className="col-lg-9">
                <input
                  className="form-control"
                  type="date"
                  value={date}
                  onChange={(e) => handleUserData("date", e)}
                />
                {date ? (
                  <small className="form-text text-muted" id="passwordHelpBlock">
                    Age-{calculateAge()}
                  </small>
                ) : null}
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                Gender
                </label>
              <div className="col-lg-9">
                <select
                  value={gender}
                  className="form-control"
                  id="gender"
                  size="0"
                  onChange={(e) => handleUserData("gender", e)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label">
                Address
                </label>
              <div className="col-lg-9">
                <textarea
                  className="form-control"
                  type="text"
                  value={address}
                  rows="4"
                  onChange={(e) => handleUserData("address", e)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-lg-3 col-form-label form-control-label"></label>
              <div className="col-lg-9">
                <button className="btn btn-success" type="submit" disabled={!checkValues()} onClick={(e) => updateUser(e)}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ profileData }) => {
  return {
    profileData,
  };
};

export default connect(mapStateToProps)(Profile);
