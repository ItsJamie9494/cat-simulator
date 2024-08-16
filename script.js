const userInput = document.getElementById("user-input");
const chatArea = document.getElementById("chat");
const sendBtn = document.querySelector(".fa-paper-plane");
const form = document.getElementById("form");
const jadeBtn = document.getElementById('jadebtn');
const leaBtn = document.getElementById('leabtn');
const mdConverter = new showdown.Converter();

// currently active cat
let cat = 'jade';

function calculateLengthOfMeow(meow, letter) {
  var length = Math.floor(Math.random() * 3);
  for (var i = 0; i < length; i++) {
    meow += letter;
  }
  return meow;
}

function wrapMeow(meow, character) {
  return character + meow + character;
}

function generateMeows(meows) {
  var returnedMeows = "";
  for (var i = 0; i < meows; i++) {
    var evenOdd = Math.floor((Math.random() * 100) + 1);
    if (evenOdd % 2 == 0) {
      if (evenOdd < 50) {
        var random = Math.round(Math.random());
        if (random == 0) {
          returnedMeows += ` ${wrapMeow(calculateLengthOfMeow("purr", "r"), "*")}`;
        } else {
          returnedMeows += ` ${calculateLengthOfMeow("purr", "r")}`;
        }
      } else {
        returnedMeows += " mew";
      }
    } else {
      if (evenOdd < 50) {
        returnedMeows += ` ${calculateLengthOfMeow("meow", "w")}`;
      } else {
        returnedMeows += ` ${calculateLengthOfMeow("nya", "a")}`;
      }
    }
  }

  var random = Math.round(Math.random());
  if (random == 0) {
    returnedMeows += "!";
  } else {
    returnedMeows += ".";
  }

  return returnedMeows;
}

function buildChatBubble(user) {
  let bubble = document.createElement("div");
  let bubbleContainer = document.createElement("div");
  let image = document.createElement("img");
  let bubbleClass = `${user}-bubble`;
  if (user != "jamie")
    bubbleClass = `cat-bubble`;
  bubbleContainer.classList.add("chat-bubble-container", bubbleClass);
  bubble.classList.add("chat-bubble");
  image.classList.add("profile-picture");
  image.src = `/${user}.png`;
  bubbleContainer.appendChild(image);
  bubbleContainer.appendChild(bubble);
  chatArea.appendChild(bubbleContainer);
  return bubble;
}

function clearChat() {
  let chat = document.getElementById('chat');
  for (const child of chat.children) {
    chat.removeChild(child);
  }
}

function createChat(event) {
  if (event !== undefined) {
    event.preventDefault();
  }

  if (userInput.value !== "") {
    let userBubble = buildChatBubble("jamie");
    userBubble.innerHTML = mdConverter.makeHtml(userInput.value);
    userInput.value = "";
  }

  // Random number of meows between 1 and 14;
  var numberOfMeows = Math.floor((Math.random() * 14) + 1);

  let leaBubble = buildChatBubble(cat);
  leaBubble.innerHTML = "...";
  form.scrollIntoView();
  let currentMeow = 0;
  let meows = generateMeows(numberOfMeows);

  let meowLoop = setInterval(() => {
    if (currentMeow < meows.length) {
      currentMeow += Math.floor(Math.random() * 10)
      leaBubble.innerHTML = mdConverter.makeHtml(meows.slice(0, currentMeow) + " ");
    } else {
      leaBubble.innerHTML = mdConverter.makeHtml(meows);
      clearInterval(meowLoop);
      userInput.focus();
    }
  }, 100);
}

function changeChat(newCat) {
  cat = newCat;
  clearChat();
  createChat();
}

sendBtn.addEventListener("click", createChat);
form.addEventListener("submit", createChat);

jadeBtn.addEventListener("change", () => changeChat('jade'))
leaBtn.addEventListener("change", () => changeChat('lea'));

window.addEventListener('load', () => {
  if (jadeBtn.checked) {
    changeChat('jade')
  } else if (leaBtn.checked) {
    changeChat('lea')
  }
}, false);