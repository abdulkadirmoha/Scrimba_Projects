import tweetsData  from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";


document.addEventListener('click', function(e) {
    if(e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like)
    } else if(e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet)
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply)
    } else if(e.target.dataset.submitReply) {
        handleSubmitReply(e.target.dataset.submitReply) 
    } else if(e.target.id === 'tweet-btn') {
        handleTweetBtnClick()
    }
})
const handleRetweetClick = (tweetId) => {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--
    } else {
        targetTweetObj.retweets ++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}
const handleLikeClick = (tweetId) => {
    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0]
    if(targetTweetObj.isLiked) {
        targetTweetObj.likes --
    } else {
        targetTweetObj.likes ++
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    render()
}
const handleReplyClick = (replyId) => {
    document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

const handleSubmitReply = (tweetId) => {
  const inputEl = document.getElementById(`reply-input-${tweetId}`);
  const replyText = inputEl.value.trim();

  if (replyText) {
    const tweetObj = tweetsData.find((tweet) => tweet.uuid === tweetId);
    tweetObj.replies.push({
      handle: "@CurrentUser", // Change to real username if needed
      profilePic: "images/scrimbalogo.png",
      tweetText: replyText,
    });
    inputEl.value = "";
    render();
    document.getElementById(`replies-${tweetId}`).classList.remove("hidden");
  }
};


const handleTweetBtnClick = () => {
    const tweetInput = document.getElementById("tweet-input")
    if(tweetInput.value) {
         tweetsData.unshift({
           handle: `@Scrimba`,
           profilePic: `images/scrimbalogo.png`,
           likes: 0,
           retweets: 0,
           tweetText: tweetInput.value,
           replies: [],
           isLiked: false,
           isRetweeted: false,
           uuid: uuidv4(),
         });
    tweetInput.value = "";
    render();
    }
    
}


const getFeedHtml = () => {
    let feedHtml = ''
    
    tweetsData.forEach(function(tweet) {
       let likeIconClass = ''
       if(tweet.isLiked) {
        likeIconClass = 'liked'
       }

       let retweetIconClass = ''
       if(tweet.isRetweeted) {
        retweetIconClass = "retweeted";
       }

       let repliesHtml = ''
       if(tweet.replies.length > 0) {
        tweet.replies.forEach(function(reply) {
            repliesHtml += `
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
            </div>
        </div>
</div>`;
        })
       }
        feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                    ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
<div class="hidden" id="replies-${tweet.uuid}">
    ${repliesHtml}
    <div class="reply-input-area">
        <input type="text" id="reply-input-${tweet.uuid}" placeholder="Write a reply..." />
        <button data-submit-reply="${tweet.uuid}">Reply</button>
    </div>
</div>
        `;
    })
    return feedHtml

}

const render = () => {
    document.getElementById('feed').innerHTML = getFeedHtml()
}
render()