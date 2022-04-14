/* Global Variables */
//read from elements
const generate = document.getElementById("generate");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");

//write to elements
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

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

const jsonData = async (url) => {
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
  date.innerHTML = newDate;
  temp.innerHTML = data.main.temp;
  content.innerHTML = feelings.value;
};

generate.addEventListener("click", (e) => {
  e.preventDefault();
  const exURI = `https://api.openweathermap.org/data/2.5/weather?zip=${zip.value}&appid=7f36636732065ef63d4dac7063be64e8&units=imperial`;
  getData(exURI).then((data) => {
    postData("/post", data).then((data) => {
      jsonData("/get").then((data) => {
        UI(data);
      });
    });
  });
});
