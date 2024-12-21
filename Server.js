const express = require("express");
const cors = require("cors");
const odbc = require("odbc");
const app = express();
app.use(cors());
app.use(express.json());
// User Edit Area
let uid = "selva2";
let pwd = "s142";
let dsn = "MyOracleDB";
async function connectDb() {
  try {
    let connection = await odbc.connect(`DSN=${dsn};UID=${uid};PWD=${pwd}`);
    return connection;
  } catch (e) {
    console.error("Error connecting to database");
  }
}
app.get("/api/metro_train/", async (req, res) => {
  try {
    let connection = await connectDb();
    let selectQuery =
      "select USER_ID,USER_NAME ,TRAIN_NAME ,to_char(TRAIN_TIME,'yyyy-mm-dd hh:mi:ss am') as TRAIN_TIME ,BOOKING_DATE ,USER_PH_NO ,ISCOMMITED  from metro_train order by user_id";
    let result = await connection.query(selectQuery);
    res.json({ result });
  } catch (e) {
    console.error(e.message);
  }
});

app.post("/api/metro_train/", async (req, res) => {
  try {
    let connection = await connectDb();
    let data = req.body;
    let time;
    if(data.trainTime.substring(0,2)=='00'){
      time='12'+data.trainTime.substring(2,5)+' am';
    }
    else if(Number(data.trainTime.substring(0,2))>12){
      time=Number(data.trainTime.substring(0,2))%12+data.trainTime.substring(2,5)+' pm';
    }
    else{
      time=data.trainTime+' am';
    }
    let insertQuery = `insert into metro_train (user_id,user_name,train_name,train_time,user_ph_no) values(${data.userId},'${data.userName}','${data.trainName}',to_date('${data.trainDate} ${time}','YYYY-MM-DD HH:MI am'),${data.userPhoneNo})`;
    
    let result = await connection.query(insertQuery);

    res.json({ result });
  } catch (e) {
    console.error(e.message);
  }
});
app.put("/api/metro_train/", async (req, res) => {
  try {
    let connection = await connectDb();
    let data = req.body;
    let time;
    if(data.trainTime.substring(0,2)=='00'){
      time='12'+data.trainTime.substring(2,5)+' am';
    }
    else if(Number(data.trainTime.substring(0,2))>12){
      time=Number(data.trainTime.substring(0,2))%12+data.trainTime.substring(2,5)+' pm';
    }
    else{
      time=data.trainTime+' am';
    }
    let updateQuery = `update metro_train set user_id=${data.userId}, user_name='${data.userName}', train_name='${data.trainName}',train_time=to_date('${data.trainDate} ${time}','yyyy-MM-dd hh:mi am'),user_ph_no=${data.userPhoneNo} where user_id=${data.userId}`;

    let result = await connection.query(updateQuery);
    res.json({ result });
  } catch (e) {
    console.error(e.message);
  }
});
app.delete("/api/metro_train/", async (req, res) => {
  try {
    let connection = await connectDb();
    let data = req.body;
    let deleteQuery = `delete from metro_train where user_id=${data.userId}`;
    let result = await connection.query(deleteQuery);
    res.json({ result });
  } catch (e) {
    console.error(e.message);
  }
});
app.post("/api/metro_train/commit/", async (req, res) => {
  let connection = await connectDb();
  let data = req.body;
  let result = await connection.query(
    `update metro_train set iscommited='true' where user_id=${data.userId}`
  );
  let time;
    if(data.trainTime.substring(0,2)=='00'){
      time='12'+data.trainTime.substring(2,5)+' am';
    }
    else if(Number(data.trainTime.substring(0,2))>12){
      time=Number(data.trainTime.substring(0,2))%12+data.trainTime.substring(2,5)+' pm';
    }
    else{
      time=data.trainTime+' am';
    }
  let insertQuery = `insert into metro_train_db (user_id,user_name,train_name,train_time,user_ph_no) values(${data.userId},'${data.userName}','${data.trainName}',to_date('${data.trainDate} ${time}','YYYY-MM-DD HH:MI am'),${data.userPhoneNo})`;
  let result2 = await connection.query(insertQuery);
  
  // console.log(query);
  res.json({ result, result2 });
});
app.listen(1234, () => {
  console.log("Server successfully started! at PORT 1234");
});
