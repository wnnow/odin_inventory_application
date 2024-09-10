const modal = document.getElementById("addTrainerModal");

const closeModalBtn = document.querySelector(".close-btn");

const openEditTrainerInfoModalBtn = document.getElementById(
  "openEditTrainerInfoModalBtn"
);

const trainersCount =
  document.querySelector("body > main > ul").childElementCount;

// Close the modal when the close button is clicked
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal if the user clicks outside the modal content
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

openEditTrainerInfoModalBtn.addEventListener("click", () => {
  const promptPassword = prompt("Password ?");
  if (promptPassword === adminPassword) {
    modal.style.display = "block";
  } else {
    alert("Password incorrect.");
  }
});
