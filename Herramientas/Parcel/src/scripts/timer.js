let time = 0;
const element = document.getElementById("timer");
setInterval(() => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  element.textContent = `${minutes}:${seconds}`;
  time++;
}, 1000);
