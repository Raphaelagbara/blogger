window.onload = function() {
  const formSel = document.querySelector("form[name='loginForm']");
  const emailInput = document.querySelector("input[name='email']");
  const passwordInput = document.querySelector("input[name='password']");

  formSel.addEventListener("submit", e => {
    if (emailInput.value !== "" && passwordInput.value !== "") {
      return true;
    } else {
      alert("Please fill in your email ID and password!");
      e.preventDefault();
      return false;
    }
  });
};
