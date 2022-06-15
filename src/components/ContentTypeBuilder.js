import React, { useEffect } from "react";
import { useState } from "react";
import $ from "jquery";
const ContentTypeBuilder = () => {

  const [postJson, setPostJson] = useState({}); //Gönderilecek JSON dosyasını tutuyor.
  const [newFields, setNewFields] = useState([]); //fields:[] şeklinde json içinde  bulunacak fieldları tutuyor.
  const [fieldCount, setFieldCount] = useState(1); //elimizdeki field sayısını tutuyor. Yeni field eklendikçe ekranda yeni seçim kutucukları oluşturmak için kullanılıyor.
  const[save,setSave]= useState(0); //şimdilik meçhul

  let index = fieldCount - 1; // ekrana yazdırılan checkbox ve textboxların isimleri 0'dan başladığı için böyle bir indexleme yaptım.
  function control(){ //field name, field type, content type name girilmiş mi kontrol etmek için kullanılıyor.
    let fieldType = $(`input[name=${index}]:checked`).val(); // ekranda sadece son field tipinin kutucukları aktif olduğu için 
    let fieldName = $(`input[id=${index}]`).val();          // index değeri kullanarak bunlara ulaşılıyor ve değerleri kontrol ediliyor.
    let contentTypeName = $(`input[id="contentType"]`).val(); // boşsa false döndürüyor.
    let isOK = fieldType && fieldName.length != 0 && contentTypeName.length !=0; //işte burada radio buttonlar için değer, textbox için uzunluk kontrolü yapılıyor.
    return isOK; //dönüş değeri
  }

  function addField(e) { //ekrana girilen her şeyi alıp newFields içine yazmak için ve değişiklik yapılmaması için ekranı kapatan bi de üstüne yeni field oluşturma için gerekli elementler eklensin diye fieldCount sayısını arttıran koca yürekli fonksiyon.
    //fonksiyondaki e parametresi yeni field oluşturmak istenip istenmediğini kontrol ediyor. Çok fonksiyonel bir fonksiyon olduğu için sadece fieldı yazmak için de kullanılabiliyor.
    let fieldType = $(`input[name=${index}]:checked`).val(); //yine indexleme kullanılarak ekranda açık son field kutucuklarının içerikleri değişkenlere aktarılıyor.
    let fieldName = $(`input[id=${index}]`).val();
    let createField = {}                // her bir fieldın isim, tip ve zorunluluk bilgilerinin tutulması için kullanılan değişken. Bir state değil çünkü re-renderda sıfırlanmalı. Her field için baştan yazılacak.
    if (control()) { //kontrol fonksiyonu sorun yok dediyse field objesi doldurulur.
      createField["fieldName"] = fieldName; //fieldName : title tarzında bir şey yazılıyor.
      createField["fieldType"] = fieldType; // fieldType : number
      createField["mandatory"] = true; //mandatory checkbox seçimi henüz yapılamasa da koydum.
      setNewFields(prev => [...prev, createField]); //oluşturulan obje bir array içine tek bir girdi olarak atılır. Bu sayede dizinin her elemanı bir field'ın gerekli tüm değerlerini barındırır.
      //console.log(newFields);
      //console.log(createField);
      ////////////Disable Field Section///////////////
      $(`[name=${index}]`).prop("disabled", true);////field işlemleri bitince değişiklik yapılmaması için
      $(`[name=${index}]`).prop("disabled", true);////tüm bölgeler kapatılır.
      $(`[id=${index}]`).prop("disabled", true);  ////
      ////////////Disable Field Section/////////////// 
      if (e) setFieldCount((prev) => prev + 1) //yeni field eklenmek istendiği için ki bu fonksiyon o işe de yarıyor, fieldCount arttırılır bu sayede yeni elementler oluşturulur ve fonksiyon dinamik olarak kullanılabilir.
    }
    else { alert("Please choose type of your field!") } //control false döndürdüyse alert atar
  }
  function previewTable() { //İstenen sayıda field oluşturulduktan sonra bunları yani newFields arrayini postJson içine atmak için kullanılır.
    if (control()) { //önce kontrol
      addField(false); //ekranda kalan son field yeni bir field eklenmediği için okunmaz. Bu sebeple addField fonksyionunu false parametresiyle çalıştırıp sadece verileri okuyup yeni bir field oluşturmadan kullanabiliriz.
      setPostJson({ ["fields"]: newFields}); //fields:[{fieldName: title,...},{fieldName: desc}] tarzında bir yapı oluşturulur obje içerisinde.
    console.log(postJson);
    }
  }

  let fields = []; //fieldlar için oluşturulacak tüm html elementlerini tutan koca array.

  let types = ["number", "string", "date", "boolean"]; //tipleri tutan array. İşte buna comment derim

  for (let i = 0; i < fieldCount; i++) { //field sayısı kadar elementi oluşturan ve bunları fields içinde tutan döngü
    //console.log(i);
    fields.push( //field içine atıyor
      <section>
        <label htmlFor={i}>Field Name</label>
        <input type="text" id={i}></input>
        {types.map((value) => ( //her bir tip için radio button oluşturuyor.
          <>
            <input
              type="radio"
              name={i}  //0,1,2 gibi isimleri olacak. Bu sayede field sayısını kullanarak bu butonlardaki verilere kolayca ulaşabileceğiz.
              value={value} //value için number, boolean gibi değerleri tutar ki ulaşabilelim.
              
            />
            <label>{value}</label>
          </>
        ))}
      </section>
    );
  }

  return (
    <main>
      <label htmlFor="contentType">Cotent Type Name</label>
        <input type="text" id = "contentType"></input>
      {fields}
      <button onClick={addField}> {/*yeni field oluşturmak için gerekli fonksiyonu şaapıyor.*/}
        Add new field
      </button>
      <button id = "preview" onClick={previewTable}> {/*json formatı haline getirip ekranda önizleme oluşturuyor.*/}
        Preview Content Type
      </button>
    </main>
  );
};

export default ContentTypeBuilder;
