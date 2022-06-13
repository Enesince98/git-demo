import React from "react";
import { useState, useEffect} from "react";
import axios from "../api/axios";
import "./Table.css";
import {Link, useNavigate} from 'react-router-dom'
let data;
const Table = (props) => {
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState(props.url + "?page=1&limit=10");
  const [data, setData] = useState([]);
  const [count, setCount] = useState();
  useEffect(() => {
    setUrl(props.url + "?page=" + page + "&limit=10");
  }, [page]);
  useEffect(() => {
    const readData = async () => {
      await axios.get(url).then(function (response) {
        setData(response.data.data);
        setCount(response.data.count);
      });
    };
    readData();
  }, [url]);
  function nextData() {
  }
  function prevData() {
    if (page > 1) setPage((prev) => prev - 1);
  }

  var col = [];
  for (let i = 0; i < data.length; i++) {
    for (let key in data[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  let d = data[5];

  let navigate = useNavigate(); 
  const routeChange = (id) =>{
    if (props.isParent){ 
    let path = `/contents/${id}`;
    navigate(path);
  }}
  return (
    <div>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              {col.map((value) => (
                <th style={{textAlign:"center"}}>{value}</th>
              ))}<th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {data.map((value) => (
                 <tr onClick={()=> routeChange(value.id)}>
                {Object.values(value).map((v) => (
                  <td style={{textAlign:"center"}}>{v}</td>
                ))}
                <td>
                  <div className="button-container">
                  <button> <a href="#">Add</a></button>
                  <button> <a href="#">Edit</a></button>
                  <button> <a href="#">Delete</a></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className = "container">
        <div class="pagination p7">
          <ul>
            <a className = {(page > 1 ? "is-active":"disabled")} onClick={prevData}>
              <li className="prev">Previous</li>
            </a>
            <a className = {(page < count / 10 ? "is-active":"disabled")} onClick={nextData}>
              <li className="next">Next</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Table;
