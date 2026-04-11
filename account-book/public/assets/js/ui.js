document.addEventListener("DOMContentLoaded", () => {
  // 드롭다운 
  const dropdownBtn = document.querySelector(".btn_dropdown");
  const dropdownMenu = document.querySelector(".dropdown_menu");

  dropdownBtn.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });

});