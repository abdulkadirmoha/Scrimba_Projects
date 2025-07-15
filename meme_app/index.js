import { catsData } from "/meme_app/data.js";

const emotionRadios = document.getElementById("emotion-radios")



const getEmotionsArray = (cats) => {

    const emotionsArray = [];
     for (let cat of cats) {
       for (let emotion of cat.emotionTags) {
        if(!emotionsArray.includes(emotion)) {
            emotionsArray.push(emotion)
        }
     }
    }
    return emotionsArray;
}



const renderEmotionsRadiosArray = (cats) => {
    let radioItem = ``
    const emotions = getEmotionsArray(cats)

    for(let emotion of emotions) {
        radioItem += ` 
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
    emotionRadios.innerHTML = radioItem
}

renderEmotionsRadiosArray(catsData)

const highlightCheckedOptions = (e) => {
    const radios = document.getElementsByClassName('radio')
    
    for(let radio of radios) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

emotionRadios.addEventListener("change", highlightCheckedOptions);

