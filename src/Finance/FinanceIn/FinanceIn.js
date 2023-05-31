import React from "react";
import { useState, useEffect, useContext } from "react";
import "./financein.css";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";


export default function FinanceIn() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [singleUser, setSingleUser] = useState([]);
  const { accessToken } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/addaccount/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const newData = await response.json();
        //console.log(newData);
        const accDetails = newData.message.map((item) => item);
        console.log(accDetails);
        setUsers(accDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onddlChange = (e) => {
    //alert(e.target.value);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/addaccount/?id=" + e.target.value,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newData = await response.json();
        const accDetails = newData.message.map((item) => item);
        console.log(accDetails);
        setSingleUser(accDetails);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  return (
    <>
      <div class="container row1">
        <div class="row ">
          <div class="col-6">
            <h1 className="ac-heading">Account Details</h1>
            <div class="row">
              <div class="col-6">
                <select
                  className="form-control col-md-3"
                  onChange={onddlChange}
                >
                  <option value="0">Select Account No.</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.acc_no}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div class="col-6">
            <button
              type="button"
              class="btn btn-secondary btn-outline-dark addbutton"
               onClick={() => navigate("/addaccount")}
              
            >
              Add Account
            </button>
          </div>
        </div>

        <div class="row">
          <div class="card-body mt-4 card1">
            <table class="table">
              <thead>
                <tr>
                  <td>id</td>
                  <td>acc-no</td>
                  <td>ifsc</td>
                  <td>current bal</td>
                  <td>current due</td>
                </tr>
              </thead>
              <tbody>
                {singleUser.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.acc_no}</td>
                    <td>{user.ifsc}</td>
                    <td>{user.current_bal}</td>
                    <td>{user.current_due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
