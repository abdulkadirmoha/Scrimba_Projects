const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "images/avatar-vangogh.jpg",
    post: "images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 21,
  },
  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "images/avatar-courbet.jpg",
    post: "images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4,
  },
  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "images/avatar-ducreux.jpg",
    post: "images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 152,
  },
];
const feed = document.getElementById("feed")
feed.innerHTML = ''

posts.forEach(post => {
    feed.innerHTML += `
    <section class="post">
            <div class="post-header">
                <img src="${post.avatar}" alt="Avatar" class="Avatar">
                <div class="post-user-info">
                    <h3>${post.name}</h3>
                    <p>${post.location}</p>
                </div>
                <div class="post-menu">
                    <img src="images/dots-horizontal.svg" alt="More options">
                </div>
            </div>
        
            <div class="post-image">
                <img src="${post.post}" alt="Post image">
            </div>
            <div class="post-actions">
                <img src="images/icon-heart.png" alt="Like">
                <img src="images/icon-comment.png" alt="Comment">
                <img src="images/icon-dm.png" alt="Direct Message">
            </div>
            <p class="likes"><strong>${post.likes} Likes</strong></p>
            <p class="comments"><strong>${post.username}</strong> ${post.comment}</p> 
        </section> 
`
});

