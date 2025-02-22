setInterval(() => {
  let now = new Date(new Date().getTime() + 6 * 3600000);
  let h = now.getUTCHours() % 12 || 12;
  let m = now.getUTCMinutes().toString().padStart(2, "0");
  let ampm = now.getUTCHours() >= 12 ? "PM" : "AM";
  document.getElementById("clock").innerText = `${h}:${m} ${ampm}`;
}, 1000);
