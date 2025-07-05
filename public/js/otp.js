const emailInput = document.getElementById("exampleInputEmail1");
  const getOtpBtn = document.getElementById("getOtpBtn");

  emailInput.addEventListener("input", () => {
    const email = emailInput.value;
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    getOtpBtn.style.display = isValidEmail ? "block" : "none";
  });

  getOtpBtn.addEventListener("click", () => {
    // Here you would normally call your backend to send OTP
    alert("OTP sent to " + emailInput.value);
    // You could also disable the button after sending to prevent spamming
    getOtpBtn.disabled = true;
  });