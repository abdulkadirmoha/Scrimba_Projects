// ========== IMPORT ==========
import { catsData } from "/meme_app/data.js";

// ========== DOM ELEMENTS ==========
const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

// ========== UTILITY FUNCTIONS ==========

// Extract unique emotion tags from all cats
const getEmotionsArray = (cats) => {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
};

// Filter cats based on selected emotion and GIF option
const getMatchingCatsArray = () => {
  const selectedRadio = document.querySelector('input[type="radio"]:checked');
  if (!selectedRadio) return [];

  const selectedEmotion = selectedRadio.value;
  const isGif = gifsOnlyOption.checked;

  return catsData.filter(
    (cat) => cat.emotionTags.includes(selectedEmotion) && (!isGif || cat.isGif)
  );
};

// Pick one cat from matching list (random if >1)
const getSingleCatObject = () => {
  const matchingCats = getMatchingCatsArray();

  if (matchingCats.length === 1) {
    return matchingCats[0];
  } else if (matchingCats.length > 1) {
    const randomIndex = Math.floor(Math.random() * matchingCats.length);
    return matchingCats[randomIndex];
  } else {
    return null;
  }
};

// ========== RENDERING FUNCTIONS ==========

// Render the list of emotion radio buttons
const renderEmotionsRadios = (cats) => {
  const emotions = getEmotionsArray(cats);
  let radioHTML = "";

  for (let emotion of emotions) {
    radioHTML += `
      <div class="radio">
        <label for="${emotion}">${emotion}</label>
        <input
          type="radio"
          id="${emotion}"
          value="${emotion}"
          name="emotions"
        >
      </div>
    `;
  }

  emotionRadios.innerHTML = radioHTML;
};

// Render selected cat image (or fallback)
const renderCat = () => {
  const catObject = getSingleCatObject();

  const image = catObject?.image || "default.png";
  const alt = catObject?.alt || "A default cat image";

  memeModalInner.innerHTML = `
    <img 
      class="cat-img" 
      src="/meme_app/images/${image}" 
      alt="${alt}"
    >
  `;

  memeModal.style.display = "flex";
};

// ========== EVENT HANDLERS ==========

const handleHighlight = (e) => {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
};

const closeMemeModal = () => {
  memeModal.style.display = "none";
};

// ========== INIT APP ==========
renderEmotionsRadios(catsData);

// ========== EVENT LISTENERS ==========
emotionRadios.addEventListener("change", handleHighlight);
getImageBtn.addEventListener("click", renderCat);
memeModalCloseBtn.addEventListener("click", closeMemeModal);
