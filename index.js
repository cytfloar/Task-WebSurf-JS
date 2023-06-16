var container = document.getElementById("container");
var resizeListeners = [];

function newElement(createDOM, settings = {}) {
  const {x = 0.0, y = 0.0, isVideo = false} = settings;
  var w = document.body.clientWidth;
  var h = document.body.clientHeight;

  const DOM = createDOM();
  DOM.style.position = "absolute";
  if (settings.style) Object.assign(DOM.style, settings.style)
  container.appendChild(DOM);

  function adjustSize() {
    DOM.style.left = w * (x / 2 + 0.5) - DOM.offsetWidth / 2;
    DOM.style.top = h * (y / 2 + 0.5) - DOM.offsetHeight / 2;
  }

  adjustSize();
  DOM.addEventListener("load", adjustSize);
  if (isVideo) {
    DOM.addEventListener("canplay", adjustSize);
    DOM.load();
    DOM.play();
  }

  var resizeListener = (e) => {
    console.log("window changed");
    w = document.body.clientWidth;
    h = document.body.clientHeight;
    adjustSize();
  }

  resizeListeners.push(resizeListener);
  window.addEventListener("resize", resizeListener);
} 

function newInstruction(text, settings = {}) {
  newElement(() => {
    const textDOM = document.createElement("div");
    textDOM.innerHTML = text;

    Object.assign(textDOM.style, {
      color: "black",
      fontFamily: "Arial",
      fontSize: "50px",
      whiteSpace: "pre-wrap",
      textAlign: "center",
      width: "60%"
    });

    return textDOM;
  }, settings);
}

function newImage(image, settings = {}) {
  newElement(() => {
    var imageDOM;
    imageDOM = new Image();
    imageDOM.src = image;
    return imageDOM;
  }, settings);
}

function newVideo(video, settings = {}) {
  settings.isVideo = true;
  newElement(() => {
    var videoDOM = document.createElement("video");
    // videoDOM.src = video;
    videoDOM.autoplay = true;
    videoDOM.innerHTML = `<source src="${video}" type="video/mp4">`;
    if (settings.width && settings.height) {
      videoDOM.width = settings.width;
      videoDOM.height = settings.height;
    }
    return videoDOM;
  }, settings);
}

function newProgressBar(seconds, settings = {}) {
  var progress;
  newElement(() => {
    const DOM = document.createElement("div");
    progress = document.createElement("div");
    progress.classList.add("zero-width");
    DOM.appendChild(progress);

    Object.assign(DOM.style, {
      height: "95px",
      width: "35%",
      border: "1px solid",
      borderColor: "white"
    });

    Object.assign(progress.style, {
      backgroundColor: "white",
      height: "100%",
      border: "1px solid",
      borderColor: "white",
      transitionDuration: `${seconds}s`
    });
    return DOM;
  }, settings);
  return () => {
    progress.classList.toggle("zero-width");
    progress.classList.toggle("full-width");
  }
}

function newRatingScale(howmany, settings = {}) {
  newElement(() => {
    const DOM = document.createElement("div");
    const table = document.createElement("table");
    const tr = document.createElement("tr");
    const numbers = document.createElement("div");
    DOM.appendChild(table);
    DOM.appendChild(numbers);
    table.appendChild(tr);
    var td = [];
    for (var i = 0; i < howmany + 1; ++ i) {
      if (i < howmany) tr.appendChild(document.createElement("td"));
      var number = document.createElement("div")
      numbers.appendChild(number);
      number.innerHTML = i + 1;
      number.style.fontSize = "50px";
    };
    DOM.style.width = "30%";
    Object.assign(numbers.style, {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "space-between"
    });
    Object.assign(table.style, {
      height: "15px",
      width: "100%"
    });
    return DOM;
  }, settings);
}

function clearScreen() {
  container.innerHTML = "";
  for (var i in resizeListeners) {
    window.removeEventListener("resize", resizeListeners[i]);
  }
  resizeListeners = [];
}

function KeyPress(listens, timeout = -1) {
  var initialTime = Date.now();
  return new Promise((resolve) => {
    if (timeout > 0)
      setTimeout(() => resolve({
        reactionTime: timeout,
        code: null
      }), timeout * 1000);
    window.addEventListener("keydown", (e) => {
      if (e.code === listens || listens.includes(e.code)) {
        var timeElapsed = (Date.now() - initialTime) / 1000;
        resolve({
          reactionTime: timeElapsed,
          code: e.code
        });
      }
    })
  });
}

function Timer(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time * 1000)
  })
}

async function manyInstructions(list) {
  for (var i in list) {
    clearScreen()
    newInstruction(list[i])
    await KeyPress("Space")
  }
}

function randint(min, max) {
  return min + Math.floor((max - min + 1) * Math.random());
}

function uniform(min, max) {
  return (max - min) * Math.random() + min;
}
