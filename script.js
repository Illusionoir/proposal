const wrapper = document.querySelector(".wrapper");
const question = document.querySelector(".question");
const gif = document.querySelector(".gif");
const yesBtn = document.querySelector(".yes-btn");
const noBtn = document.querySelector(".no-btn");
const body = document.body;

yesBtn.addEventListener("click", () => {
  question.innerHTML = "Yay, thank you! 💞️💖";
  gif.src = "https://media.giphy.com/media/jRkaiw4ZUSHeuv1wBU/giphy.gif";
  gif.style.transform = "scale(1.05)";
  noBtn.style.display = "none";
  body.classList.add("celebrating");
  wrapper.classList.add("celebrate");
});

noBtn.addEventListener("mouseover", () => {
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = Math.max(window.innerWidth - noBtnRect.width - 24, 12);
  const maxY = Math.max(window.innerHeight - noBtnRect.height - 24, 12);

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
  noBtn.style.transform = "none";
});

noBtn.addEventListener("click", () => {
  noBtn.style.transform = "scale(0.95)";
});
