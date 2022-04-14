/* Global Variables */
const generate = document.getElementById("generate");
const zip = document.getElementById("zip");
const temp = document.getElementById("temp");
const feelings = document.getElementById("feelings");
const date = document.getElementById("date");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

const apiCall =
  "https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}";
const apiURI = "https://api.openweathermap.org/data/2.5/weather?zip=";
const myKey = "&appid=7f36636732065ef63d4dac7063be64e8&units=imperial";
const country = "us";

generate.addEventListener("click", (e) => {
  e.preventDefault();
  const exURI = `${apiURI}${zip.value}${myKey}`;
  getData(exURI).then((data) => {
    cureData(data).then((info) => {
      postData("/add", info).then((data) => {
        retreiveData("/all").then((data) => {
          UI(data);
        });
      });
    });
  });
});

const getData = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    if (data.cod == 200) {
      return data;
    } else {
      console.log(data.message);
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

const cureData = async (data) => {
  try {
    if (data.message) {
      return data;
    } else {
      const info = {
        date: newDate,
        feelings: feelings.value,
        temp: data.main.temp,
      };
      return info;
    }
  } catch (e) {
    console.error(e);
  }
};

const postData = async (url = "", data = {}) => {
  const result = await fetch(url, {
    method: "post",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const response = await result.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};

const retreiveData = async (url) => {
  const data = await fetch(url);
  try {
    const response = await data.json();
    return response;
  } catch (e) {
    console.error(e);
  }
};

const UI = async (data) => {
  const response = await data;
  console.log(response);
};
