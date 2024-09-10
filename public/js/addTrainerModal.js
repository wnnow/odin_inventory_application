const modal = document.getElementById("addTrainerModal");
const openAddModalBtn = document.getElementById("openAddModalBtn");
const closeModalBtn = document.querySelector(".close-btn");

const trainersCount =
  document.querySelector("body > main > ul").childElementCount;

// Show the modal when the button is clicked
openAddModalBtn.addEventListener("click", () => {
  if (trainersCount < 8) {
    modal.style.display = "block";
  } else {
    alert(
      "We can only accommodate 8 trainers at a time. We apologize for any inconvenience this may cause."
    );
  }
});

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
