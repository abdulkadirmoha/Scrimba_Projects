import { tweetsData } from "/tweet_clone/data.js"
const tweetInput = document.getElementById('tweet-input')
const tweetBtn = document.getElementById('tweet-btn')
const feed = document.getElementById('feed')



function getFeedHtml(){
    let feedHtml = ``
    for(let tweet of tweetsData) {

        let likeIconClass = ''

        if(tweet.isLiked) {
            likeIconClass = "liked"
        }

        let retweetIconClass = ''
        if(tweet.isRetweeted) {
            retweetIconClass = "retweeted";
        }
        feedHtml += `
    <div class="tweet">
        <div class="tweet-inner">
            <img src="./${tweet.profilePic}" class="profile-pic">
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
    </div>`;
    }
     return feedHtml;
}

const render = () => {
    feed.innerHTML = getFeedHtml()

}

render()



document.addEventListener('click', function(e) {
   if(e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
   }
   if (e.target.dataset.retweet) {
     handleRetweetClick(e.target.dataset.retweet);
   }
})

const handleLikeClick = (tweetId) => {
        const targetTweetObj = tweetsData.filter(function(tweet) {
            return tweet.uuid === tweetId
        })[0]

        if (targetTweetObj.isLiked) {
            targetTweetObj.likes --
        }  else {
            targetTweetObj.likes++
        }
       targetTweetObj.isLiked = !targetTweetObj.isLiked
       render()
}

const handleRetweetClick = (tweetId) => {

    const targetTweetObj = tweetsData.filter(function(tweet) {
        return tweet.uuid === tweetId
    })[0]

    if(targetTweetObj.isRetweeted) {
        targetTweetObj.retweets --
    } else {
        targetTweetObj.retweets ++
    }

    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}