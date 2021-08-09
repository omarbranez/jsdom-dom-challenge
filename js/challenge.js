// list dom elements
const counter = document.getElementById("counter")
const buttons = document.getElementById("button-container")
const likeList = document.querySelector("ul.likes")
const commentForm = document.getElementById("comment-form")
const comments = document.getElementById("list")

// starts at 0
// counter runs as soon as dom loads
// no liked numbers yet
// let allows them to change
let currentNumber = 0
let counterOn = true
let likedNumbers = {}

// run code every second after page loads
function updateCounter(amount) {
    currentNumber = currentNumber + amount
    counter.textContent = currentNumber
}

setInterval( () => {
    if (counterOn) {
        updateCounter(1)
    }
}, 1000)   //function that will run every 1000 milliseconds

//what do the buttons do?
buttons.addEventListener("click", (e) => {
    if (e.target.id == "minus") {
        updateCounter(-1)
    } else if (e.target.id == "plus") {
        updateCounter(1)
    } else if (e.target.id == "heart") {
        likeAction()
    } else if (e.target.id == "pause") {
        pauseAction()
    }
})

// liking
function likeAction() {
    if (likedNumbers[currentNumber]) {
      const li = document.querySelector(`[data-number="${currentNumber}"]`);
      likedNumbers[currentNumber] ++;
      li.textContent = `${currentNumber} has been liked ${likedNumbers[currentNumber]} times`;
    } else {
        // the first time
      likedNumbers[currentNumber] = 1;
      const li = document.createElement("li");
      li.dataset.number = currentNumber;
      li.textContent = `${currentNumber} has been liked 1 time`;
      likeList.append(li);
    }
  }

//pausing
function pauseAction() {
    // stop the counter
    counterOn = !counterOn // make it false
    //disable all the non pause buttons
    document.querySelectorAll("button").forEach((button) => {
        if (button.id !== "pause") {
            button.disabled = !counterOn
        // the pause button should let you know what actions are possible
        } else {
            if (counterOn) {
                button.textContent = "pause"
            } else {
                button.textContent = "resume"
            }
        }
    })
}

//comments
commentForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let li = document.createElement("li")
    let input = document.querySelector("#comment-input")
    li.textContent = input.value
    comments.append(li)
    e.target.reset() //clear the form
})