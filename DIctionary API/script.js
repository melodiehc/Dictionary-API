// API endpoint for fetching word definitions
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

// DOM element where the results will be displayed
const result = document.getElementById("result");

// DOM element for pronunciation audio
const sound = document.getElementById("sound");

// Search button element
const btn = document.getElementById("search-btn");

// Event listener attached to the search button to fetch and display word definitions
btn.addEventListener("click", () => {
    // Get the input word from the input field
    let inpWord = document.getElementById("inp-word").value;
    
    // Fetch data from the API
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // Display word details on the webpage
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;
            
            // Set the pronunciation audio source
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
        })
        .catch(() => {
            // Display an error message if the word is not found
            result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        });
});

// Function to play the pronunciation audio
function playSound() {
    sound.play();
}
