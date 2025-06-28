const generateBtn = document.getElementById("generate-btn");
const passwordBox1 = document.getElementById("passBox-1");
const passwordBox2 = document.getElementById("passBox-2");

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()_-+={[}],|:;<>.?/";

const generatePassword = (length = 15) => {
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

generateBtn.addEventListener("click", () => {
  passwordBox1.textContent = generatePassword();
  passwordBox2.textContent = generatePassword();
});


passwordBox1.addEventListener("click", () => {
  copyToClipboard(passwordBox1.textContent);
});

passwordBox2.addEventListener("click", () => {
  copyToClipboard(passwordBox2.textContent);
});

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showMessage("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Copy failed: ", err);
      showMessage("Failed to copy!");
    });
}

function showMessage(message) {
  const msg = document.createElement("div");
  msg.textContent = message;
  msg.style.position = "fixed";
  msg.style.bottom = "20px";
  msg.style.right = "20px";
  msg.style.backgroundColor = "#333";
  msg.style.color = "#fff";
  msg.style.padding = "10px 15px";
  msg.style.borderRadius = "5px";
  msg.style.zIndex = "9999";
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}
