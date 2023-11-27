let temperature: number;
let joke: string;
const reportJokes: { joke: string; score: number; date: string }[] = [];

const showButtons = () => {
    const buttonScore = document.querySelectorAll(".button-score") as NodeListOf<HTMLElement>;
    buttonScore.forEach((button) => {
        button.style.display = "inline-block";
    });
};

const hideButtons = () => {
    const buttonScore = document.querySelectorAll(".button-score") as NodeListOf<HTMLElement>;
    buttonScore.forEach((button) => {
        button.style.display = "none";
    });
};

const joke1 = async () => {
    try {
        const res = await fetch("https://icanhazdadjoke.com", {
            headers: {
                Accept: "application/json",
            },
        });

        const data = await res.json();
        document.getElementById("textJoke")!.innerHTML = data.joke;
        joke = data.joke;
        console.log("JOKE=>", data);
        showButtons();
    } catch (error) {
        console.log("Error calling API:", error);
    }
};

const jokeChuck = async () => {
    try {
        const res = await fetch("https://api.chucknorris.io/jokes/random");
        const data = await res.json();
        document.getElementById("textJoke")!.innerHTML = data.value;
        joke = data.value;
        console.log("JOKE2=>", data);
        showButtons();
    } catch (error) {
        console.log("Error calling API:", error);
    }
};

const jokes = () => {
    const random = Math.trunc(Math.random() * 2);
    console.log(random);
    if (random <= 0) joke1();
    else jokeChuck();
};

const scores = (score: number) => {
    let report = {
        joke: joke,
        score: score,
        date: new Date().toISOString(),
    };
    reportJokes.push(report);
    console.table(reportJokes);
    hideButtons();
};

const weather = async () => {
    try {
        const res = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?lat=41.3851&lon=2.1734&units=metric&appid=ee11567202766ed1b15e51654dcbf58e"
        );
        const data = await res.json();
        const temperature = data.main.temp;
        const icon = data.weather[0].icon;
        document.getElementById("temp")!.innerHTML =
            temperature.toFixed(1) + "º" + "C";
        const iconURL = `http://openweathermap.org/img/w/${icon}.png`;
        const iconElement = document.createElement("img");
        iconElement.src = iconURL;
        document.getElementById("iconWeather")!.appendChild(iconElement);
        console.log(data);
    } catch (error) {
        console.log("Error calling API:", error);
    }
};

weather();
