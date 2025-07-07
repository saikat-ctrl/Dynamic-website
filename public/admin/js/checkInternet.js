window.addEventListener("load", () => {
  function checkInternet() {
    if (!navigator.onLine) {
      window.location.href = "/504";
    }
  }

  // Check every 3 seconds
  setInterval(checkInternet, 3000);
});
window.addEventListener('online', () => {
  alert('You are back online!');
});
