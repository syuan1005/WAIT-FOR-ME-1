import React from "react";
import { Button, Form, FormControl, Image, Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

//卡在
// 傳照片一定要先送出才會setnewImg
// 不分開不行
// 試試看用後端ＳＱＬ只另存進去
//解決：不要把newImg當作狀態，直接設變數(狀態改變會在下次渲染？？)
function Create({ onHide, show }) {
  const [status, setstatus] = useState(1); //新增status時
  const [name, setname] = useState(""); //oname->oldname
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  const [city, setcity] = useState("臺北");
  const [cost, setcost] = useState("");
  const [ft, setft] = useState("小吃");
  const [f1, setf1] = useState("11:00");
  const [f2, setf2] = useState("14:00");
  const [s1, sets1] = useState("");
  const [s2, sets2] = useState("");
  const [tag1, settag1] = useState("");
  const [tag2, settag2] = useState("");
  const [tag3, settag3] = useState("");
  const [article, setarticle] = useState("");
  const [files, setFiles] = useState([]); //FileList {0: File, length: 1}//拿來1.post2.拿來預覽

  //選取照片，預覽照片
  let img = "";
  const inputImg = (e) => {
    setFiles(e.target.files);
    let blah = document.getElementById("blah");
    let [file] = e.target.files;
    if (file) {
      blah.src = URL.createObjectURL(file);
    }
    //當選擇檔案後，會暫存？一個檔案，把[file]拿出來，create一個臨時的url給id=blah的用
  };

  // put餐廳資訊(等待照片上傳產生ＵＲＬ後)
  const onSubmit = async () => {
    axios
      .post("http://localhost:3001/sdata/create", {
        name: name,
        status: status,
        address: address,
        phone: phone,
        city: city,
        ft: ft,
        cost: cost,
        tag1: tag1,
        tag2: tag2,
        tag3: tag3,
        img: img,
        time1: f1 + "-" + f2,
        time2: s1 + "-" + s2,
        article: article,
      })
      .then((res) => {
        toast.success("新增成功");

        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };
  //post照片，並產生ＵＲＬ
  const onSubmitF = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
    } //data[] key是'file' ,陣列塞進去，在用下面post方法給後端

    await axios //上傳圖片
      .post("http://localhost:3001/sdata/picupdate", data)
      .then((response) => {
        console.log(response.data[0].filename); //回傳檔名
        img = response.data[0].filename;
      })
      .then(() => {})
      .catch((e) => {
        toast.error("Upload Error");
      });
  };

  return (
    <Modal
      className="model "
      size="lg"
      aria-labelledby="contained-modal-title-vcenter "
      centered
      {...{ onHide, show }}
    >
      <Form className=" mx-auto frame my-5">
        <h5 className="line">
          修改餐廳資訊
          <button
            className="buttonStyle"
            style={{
              fontSize: "15px",
              float: "right",
              borderRadius: "3px 3px 3px 3px",
              // marginTop: "-20px",
              // marginRight: "-10px",
            }}
            // className="btn-close"
          >
            CLOSE
          </button>
        </h5>
        <Form.Group className="mb-3">
          <Form.Label>餐廳名稱</Form.Label>
          <FormControl
            id="name"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>餐廳狀態</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="ft"
            id="ft"
            value={status}
            onChange={(e) => {
              setstatus(e.target.value);
            }}
          >
            <option value={1}>上架中</option>
            <option value={0}>下架中</option>
          </Form.Select>
        </Form.Group>
        <Form.Label>餐廳照片</Form.Label>
        <FormControl
          id="impInp"
          type="file"
          onChange={(e) => inputImg(e)}
          className="form-control"
          multiple
          accept="image/gif, image/jpeg, image/png"
        ></FormControl>

        <Image
          id="blah"
          src={img && `http://localhost:3001/${img}`}
          thumbnail
        />

        <Form.Group className="mb-3">
          <Form.Label>餐廳地址</Form.Label>
          <FormControl
            id="address"
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => {
              setaddress(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>餐廳電話</Form.Label>
          <FormControl
            id="phone"
            type="text"
            placeholder="phone"
            value={phone}
            onChange={(e) => {
              setphone(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>所在城市</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="city"
            id="city"
            value={city}
            onChange={(e) => {
              setcity(e.target.value);
            }}
          >
            <option value="臺北">臺北</option>
            <option value="新北">新北</option>
            <option value="基隆">基隆</option>
            <option value="桃園">桃園</option>
            <option value="新竹">新竹</option>
            <option value="宜蘭">宜蘭</option>
            <option value="苗栗">苗栗</option>
            <option value="臺中">臺中</option>
            <option value="彰化">彰化</option>
            <option value="南投">南投</option>
            <option value="雲林">雲林</option>
            <option value="嘉義">嘉義</option>
            <option value="臺南">臺南</option>
            <option value="高雄">高雄</option>
            <option value="屏東">屏東</option>
            <option value="花蓮">花蓮</option>
            <option value="臺東">臺東</option>
            <option value="澎湖">澎湖</option>
            <option value="綠島">綠島</option>
            <option value="金門">金門</option>
            <option value="蘭嶼">蘭嶼</option>
            <option value="馬祖">馬祖</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>餐點類型</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="ft"
            id="ft"
            value={ft}
            onChange={(e) => {
              setft(e.target.value);
            }}
          >
            <option value="小吃">小吃</option>
            <option value="燒烤">燒烤</option>
            <option value="炸物">炸物</option>
            <option value="飲料">飲料</option>
            <option value="甜點">甜點</option>
            <option value="麵包">麵包</option>
            <option value="熱炒">熱炒</option>
            <option value="禮盒">禮盒</option>
            <option value="素食">素食</option>
            <option value="壽司">壽司</option>
            <option value="丼飯">丼飯</option>
            <option value="吃到飽">吃到飽</option>
            <option value="中式">中式</option>
            <option value="台式">台式</option>
            <option value="韓式">韓式</option>
            <option value="日式">日式</option>
            <option value="泰式">泰式</option>
            <option value="印尼">印尼</option>
            <option value="美式">美式</option>
            <option value="法式">法式</option>
            <option value="義式">義式</option>
            <option value="印度">印度</option>
            <option value="墨西哥">墨西哥</option>
            <option value="越南">越南</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>平均花費</Form.Label>
          <FormControl
            id="cost"
            type="text"
            placeholder="$"
            value={cost}
            onChange={(e) => {
              setcost(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>營業時段1</Form.Label>
          <FormControl
            style={{ marginBottom: "5px" }}
            type="time"
            value={f1}
            onChange={(e) => {
              setf1(e.target.value);
            }}
          />
          <FormControl
            type="time"
            value={f2}
            onChange={(e) => {
              setf2(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>營業時段2</Form.Label>
          <FormControl
            style={{ marginBottom: "5px" }}
            type="time"
            value={s1}
            onChange={(e) => {
              sets1(e.target.value);
            }}
          />
          <FormControl
            type="time"
            value={s2}
            onChange={(e) => {
              sets2(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>標籤1</Form.Label>
          <FormControl
            id="tag1"
            type="text"
            placeholder="ex.有WIFI"
            value={tag1}
            onChange={(e) => {
              settag1(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>標籤2</Form.Label>
          <FormControl
            id="tag2"
            type="text"
            placeholder="ex.有冷氣"
            value={tag2}
            onChange={(e) => {
              settag2(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>標籤3</Form.Label>
          <FormControl
            id="tag3"
            type="text"
            placeholder="ex.寵物友善"
            value={tag3}
            onChange={(e) => {
              settag3(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>餐廳介紹</Form.Label>
          <FormControl
            as="textarea"
            id="article"
            type="text"
            placeholder=""
            value={article}
            onChange={(e) => {
              setarticle(e.target.value);
            }}
          />
        </Form.Group>

        <Button
          className="w-100 buttonStyle"
          variant="outline-primary"
          onClick={async (e) => {
            await onSubmitF(e);
            await onSubmit();
            await onHide();
          }}
        >
          確認送出
        </Button>
      </Form>
    </Modal>
  );
}

export default Create;
