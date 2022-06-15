import React from "react";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import "./Table.css";
import { Link, useNavigate } from 'react-router-dom'
let data;
const Table = (props) => {

  const [page, setPage] = useState(1);                              // Pagination için hangi sayfanın gösterilmesi gerektiğini tutan değişken. State içinde tutulmasının sebebi yeni sayfaya geçildiğinde re-render edilmesi.
  const [url, setUrl] = useState(props.url + "?page=1&limit=10");   // Pagination için API tarafında hangi adrese istek atılması gerektiğini tutan değişken.  State içinde tutulmasının sebebi url değiştiğinde sayfanın re-render edilmesi.
  const [data, setData] = useState([]);                             // API den gelen response içindeki datayı tutmamıza yarayan değişken. Veri geldiğinde tablonun güncellenmesi için state içinde tutuluyor.
  const [count, setCount] = useState();                             // API den gelen response içindeki data miktarını tutan değişkendir. 

  useEffect(() => {
    setUrl(props.url + "?page=" + page + "&limit=10");              //Page değişkeni değiştiğinde yani önceki/sonraki sayfaya geçilmek istendiğinde url içini yeni sayfa numarasına göre günceller.
  }, [page]);

  useEffect(() => {
    const readData = async () => {
      await axios.get(url).then(function (response) {               //Genel bir async api isteği işlemidir. Gelen veriyi stateler içinde tutar
        setData(response.data.data);                                //useEffect ile url değiştikçe yeniden istek atılması sağlanır.
        setCount(response.data.count);
      });
    };
    readData(); //istek atmak için oluşturulan fonksiyonu çağırır (BUNUN OLMAMASI DAHA MANTIKLI AMA KALDIRAMADIK.)
  }, [url]);

  function nextData() {
    if (page < count / 10) setPage((prev) => prev + 1);           //Sayfa değerini bir sonraki
  }
  function prevData() {
    if (page > 1) setPage((prev) => prev - 1);                    //Decrease value of page by 1 to get the next page if there is one.
  }

  let col = [];                                                   //Sütun başlıklarını tutmak için dizi
  if (data[0]){col=Object.keys(data[0])}                          //Renderlanma sırasında data geç gelebildiği için eğer data geldiyse, ilkinin keylerini sütun başlıkları olarak diziye aktarıyoruz.


  let navigate = useNavigate();
  const routeChange = (id) => {                                   //Satıra tıklandığında eğer tablonun alt bir tablosu varsa seçilen id için alt tablo açılır.
    if (props.isParent) {                                         //Tablonun alt tablosu olup olmadığı prop tan gelen veri kullanılarak kontrol edilir.
      let path = `/${props.whoseParent}/${id}`;                   //Seçilen id ye göre alt tablonun yüklenmesi için gereken path oluşturulur.
      navigate(path);                                             //Alt tablonun yükleneceği url adresine gidilir.
    }
  }

  return (
    <div>
      <div className="tbl-header">                          {/*Sütun başlıkları için ayrı bir tablo oluşturur. Bu sayede tablo kaydırılsa da sütun isimleri görünür kalır.*/}
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              {col.map((value) => (
                <th style={{ textAlign: "center" }}>{value}</th>   //col dizisindeki her bir eleman sütun başlıklarını içerdiği için herbir elemanı th ile form başlığına yazdırılır.
              ))}<th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding="0" cellSpacing="0" border="0">
          <tbody>
            {data.map((value) => (                               //data değişkeni içerisinde responsedaki tablo girdi verileri bulunur. Bu verilerdeki her bir girdi için yeni bir satır oluşturulur.
              <tr onClick={() => routeChange(value.id)}>      {/* satıra tıklandığında seçili girdi için eğer alt tablo varsa onun gösterildiği tablo sayfası açılır.  */}
                {Object.values(value).map((v) => (               // Response içindeki girdilerin kendi içinde bir döngü oluşturarak girdilerin içerdiği değerler de okunur.
                  <td style={{ textAlign: "center" }}>{v}</td>     // Her bir satırda, girdinin içerdiği değerler, sütunlarına karşılık gelen hücrelere yazdırılır.
                ))}
                <td>
                  <div className="button-container">
                    <button> <a href="#">Add</a></button>         {/*Girdinin eğer alt tablosu varsa, yeni girdi eklemek için bu buton kullanılır. Örneğin products için butona tıklandığında ürün ekleme sayfası açılır.*/}
                    <button> <a href="#">Edit</a></button>        {/*Girdinin fieldları eğer düzenlenmek istiyorsa bu buton kullanılır.*/}
                    <button> <a href="#">Delete</a></button>      {/*Girdi silinmek istendiğinde kullanılır.*/}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container">
        <div className="pagination p7">
          <ul>
            <a className={(page > 1 ? "is-active" : "disabled")} onClick={prevData}> {/*Pagination için önceki sayfaya giden fonksiyonu çalıştırır. Önceki sayfa kalmadığında disable olur.*/}
              <li className="prev">Previous</li>
            </a>
            <a className={(page < count / 10 ? "is-active" : "disabled")} onClick={nextData}>{/*Pagination için sonraki sayfaya giden fonksiyonu çalıştırır. Sonraki sayfa bittiğinde disable olur.*/}
              <li className="next">Next</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Table;
