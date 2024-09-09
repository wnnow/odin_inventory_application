document.addEventListener("DOMContentLoaded", () => {
  const maxPokemons = 6;
  const checkboxes = document.querySelectorAll(".pokemon-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const checkedCount = document.querySelectorAll(
        ".pokemon-checkbox:checked"
      ).length;

      if (checkedCount > maxPokemons) {
        alert(
          `You can only select up to ${maxPokemons} Pokémon. You need to unselect the pokemon that you don't want before select new one`
        );
        this.checked = false;
      }
    });
  });
});
