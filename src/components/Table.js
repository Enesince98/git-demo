import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "./Table.css";
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
    console.log(url);
    const readData = async () => {
      await axios.get(url).then(function (response) {
        setData(response.data.data);
        setCount(response.data.count);
      });
    };
    readData();
  }, [url]);
  //ilk tıklandığında ileri gitmiyor
  // 10 a bölünmeyen veri olduğunda son sayfayı yüklemiyor.
  function nextData() {
    if (page < count / 10) setPage((prev) => prev + 1);
    // console.log(url)
    // console.log(page)

    // if (count % 10 === 0) {
    //   if (page < count / 10) {
    //     setPage(prev => prev +1);
    //     setUrl(props.url + "?page=" + page + "&limit=10");
    //     console.log(page);
    //     console.log(url);
    //   }
    // } else {
    //   if (page <= count / 10) {
    //     setPage(prev => prev + 1);
    //     setUrl(props.url + "?page=" + page + "&limit=10");
    //     console.log(page);
    //     console.log(url);
    //   }
    // }
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

  //console.log(col);
  let d = data[5];
  //data.map((value)=>(Object.keys(value).map((v)=>(console.log(v.value)))))
  //Object.keys(d).map((v)=>(console.log(v)))
  //console.log(Object.values(data[5]));
  return (
    <div>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              {col.map((value) => (
                <th>{value}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {data.map((value) => (
              <tr>
                {Object.values(value).map((v) => (
                  <td>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className = "container">
        <div class="pagination p7">
          <ul>
            <a className = {(page > 1 ? "is-active":"disabled")} onClick={prevData}>
              <li>Previous</li>
            </a>
            <a className = {(page < count / 10 ? "is-active":"disabled")} onClick={nextData}>
              <li>Next</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Table;
