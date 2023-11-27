"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let temperature;
let joke;
const reportJokes = [];
const showButtons = () => {
    const buttonScore = document.querySelectorAll(".button-score");
    buttonScore.forEach((button) => {
        button.style.display = "inline-block";
    });
};
const hideButtons = () => {
    const buttonScore = document.querySelectorAll(".button-score");
    buttonScore.forEach((button) => {
        button.style.display = "none";
    });
};
const joke1 = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://icanhazdadjoke.com", {
            headers: {
                Accept: "application/json",
            },
        });
        const data = yield res.json();
        document.getElementById("textJoke").innerHTML = data.joke;
        joke = data.joke;
        console.log("JOKE=>", data);
        showButtons();
    }
    catch (error) {
        console.log("Error calling API:", error);
    }
});
const jokeChuck = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://api.chucknorris.io/jokes/random");
        const data = yield res.json();
        document.getElementById("textJoke").innerHTML = data.value;
        joke = data.value;
        console.log("JOKE2=>", data);
        showButtons();
    }
    catch (error) {
        console.log("Error calling API:", error);
    }
});
const jokes = () => {
    const random = Math.trunc(Math.random() * 2);
    console.log(random);
    if (random <= 0)
        joke1();
    else
        jokeChuck();
};
const scores = (score) => {
    let report = {
        joke: joke,
        score: score,
        date: new Date().toISOString(),
    };
    reportJokes.push(report);
    console.table(reportJokes);
    hideButtons();
};
const weather = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch("https://api.openweathermap.org/data/2.5/weather?lat=41.3851&lon=2.1734&units=metric&appid=ee11567202766ed1b15e51654dcbf58e");
        const data = yield res.json();
        const temperature = data.main.temp;
        const icon = data.weather[0].icon;
        document.getElementById("temp").innerHTML =
            temperature.toFixed(1) + "º" + "C";
        const iconURL = `http://openweathermap.org/img/w/${icon}.png`;
        const iconElement = document.createElement("img");
        iconElement.src = iconURL;
        document.getElementById("iconWeather").appendChild(iconElement);
        console.log(data);
    }
    catch (error) {
        console.log("Error calling API:", error);
    }
});
weather();
