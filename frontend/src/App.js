import React, { useEffect, useState } from "react";
import "./App.css";
function App() {
  const RegisterUrl = "http://localhost:1234/api/metro_train/";
  const commitUrl = "http://localhost:1234/api/metro_train/commit/";
  const trainNames = [
    "Chennai Express",
    "Coromandel Express",
    "Tamil Nadu Express",
    "Pandian Express",
    "Rockfort Express",
    "Pallavan Express",
    "Vaigai Express",
    "Nilgiri Express",
    "Kaveri Express",
    "Cholan Express",
  ];
  const [trains, setTrains] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [trainName, setTrainName] = useState("");
  const [trainTime, setTrainTime] = useState("");
  const [trainDate, setTrainDate] = useState("");
  const [userPhoneNo, setUserPhoneNo] = useState("");
  const [iscommited, setIsCommited] = useState("false");
  const [index, setIndex] = useState(0);
  let [changes, setChanges] = useState(true);
  useEffect(() => {
    let fetchTrains = async () => {
      try {
        let result = await fetch(RegisterUrl);
        let data = await result.json();
        setTrains(data.result);
      } catch (e) {
        console.error(e);
      }
    };

    fetchTrains();
  }, [changes]);
  useEffect(() => {
    if (trains.length > 0) {
      fetchDetails(index);
    }
  }, [trains]);
  let fetchDetails = (index) => {
    setUserId(trains[index].USER_ID);
    setUserName(trains[index].USER_NAME);
    setTrainName(trains[index].TRAIN_NAME);
    setTrainTime(timeCalculator(trains[index].TRAIN_TIME));
    setTrainDate(trains[index].TRAIN_TIME.substring(0, 10));
    setUserPhoneNo(trains[index].USER_PH_NO);
    setIsCommited(trains[index].ISCOMMITED);
  };
  let timeCalculator = function (time) {
    if (time.substring(20, 22) == "pm") {
      if (time.substring(11, 13) == "12") return "00" + time.substring(13, 16);
      else return 12 + Number(time.substring(11, 13)) + time.substring(13, 16);
    } else return time.substring(11, 16);
  };
  let goToNext = () => {
    if (index < trains.length - 1) {
      setIndex(index + 1);
      fetchDetails(index + 1);
    } else {
      alert("No next record found");
      setIndex(index);
    }
  };
  let goToPrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
      fetchDetails(index - 1);
    } else {
      alert("No previous record found");
      setIndex(index);
    }
  };
  let clear = () => {
    setUserName("");
    setTrainName("");
    setTrainTime("");
    setUserPhoneNo("");

    // console.log(trains[index].RESERVED_DATE);
    setTrainDate("");
    setTrainTime("");
  };
  let insertRecord = () => {
    let key = trains.length > 0 ? trains[trains.length - 1].USER_ID + 1 : 1;
    setUserId(key);
    clear();
  };
  let saveRecord = async () => {
    if (
      userId !== "" &&
      userName !== "" &&
      trainName !== "" &&
      userPhoneNo !== "" &&
      trainDate !== "" &&
      trainTime !== ""
    ) {
      let sendData = {
        userId,
        userName,
        trainName,
        trainTime,
        trainDate,
        userPhoneNo,
      };
      let result = await fetch(RegisterUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });
      // console.log(await result.json());
      setChanges(!changes);
      alert("Successfully Inserted!");
      // insertRecord();
    } else {
      alert("Please fill all the fields");
    }
  };
  let updateRecord = async () => {
    if (iscommited === "false") {
      if (
        userId !== "" &&
        userName !== "" &&
        trainName !== "" &&
        userPhoneNo !== "" &&
        trainDate !== "" &&
        trainTime !== ""
      ) {
        let sendData = {
          userId,
          userName,
          trainName,
          trainTime,
          trainDate,
          userPhoneNo,
        };
        let result = await fetch(RegisterUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sendData),
        });
        // console.log(await result.json());
        setChanges(!changes);
        alert("Successfully Updated!");
        // insertRecord();
      } else {
        alert("Please fill all the fields");
      }
    } else {
      alert("Changes are not allowed!");
    }
  };
  let deleteRecord = async () => {
    if (iscommited === "false") {
      let sendData = {
        userId,
      };
      let result = await fetch(RegisterUrl, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });
      // console.log(await result.json());
      setChanges(!changes);
      alert("Successfully Deleted!");
    } else {
      alert("Deletion not allowed!");
    }
  };
  let commitRecord = async () => {
    if (iscommited === "false") {
      setIsCommited("true");
      alert("Successfully commited!");
      let sendData = {
        userId,
        userName,
        trainName,
        trainTime,
        trainDate,
        userPhoneNo,
      };
      let result = await fetch(commitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });
      setChanges(!changes);
    } else {
      alert("Already commited!");
    }
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <label for="user_id">User Id</label>
            </td>
            <td>
              <input
                type="number"
                name="user_id"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="user_name">User Name</label>
            </td>
            <td>
              <input
                type="text"
                name="user_name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="train_name">Train Name</label>
            </td>
            <td>
              <select
                name="train_name"
                value={trainName}
                onChange={(e) => setTrainName(e.target.value)}
              >
                <option value="">Select Train</option>
                {trainNames.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              <label for="train_time">Train Time</label>
            </td>
            <td>
              <input
                type="time"
                name="train_time"
                value={trainTime}
                onChange={(e) => setTrainTime(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="train_date">Train Date</label>
            </td>
            <td>
              <input
                type="date"
                name="train_date"
                value={trainDate}
                onChange={(e) => setTrainDate(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label for="user_ph_no">Phone No.</label>
            </td>
            <td>
              <input
                type="number"
                name="user_ph_no"
                value={userPhoneNo}
                onChange={(e) => setUserPhoneNo(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="buttondiv">
        <button onClick={goToPrevious}>Prev</button>
        <button onClick={saveRecord}>Save</button>
        <button onClick={insertRecord}>Insert</button>
        <button onClick={updateRecord}>Update</button>
        <button onClick={deleteRecord}>Delete</button>
        <button onClick={commitRecord}>Commit</button>
        <button onClick={goToNext}>Next</button>
      </div>

      <div className="buffer">
        <table>
          <tr>
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>Train Name</th>
            <th>Train Time</th>
            <th>Booking Date</th>
            <th>Phone No.</th>
          </tr>
          {trains.map((train, index) => {
            return (
              <tr
                className={train.COMMITED === "true" ? "iscommited" : null}
                id={index}
              >
                <td>{train.USER_ID}</td>
                <td>{train.USER_NAME}</td>
                <td>{train.TRAIN_NAME}</td>
                <td>{train.TRAIN_TIME.substring(0, 22)}</td>
                <td>{train.BOOKING_DATE.substring(0, 10)}</td>
                <td>{train.USER_PH_NO}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
