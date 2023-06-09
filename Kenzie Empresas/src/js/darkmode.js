class DarkMode {
  static toggleDark() {
    const btn = document.querySelector("#darkbtn");
    const root = document.querySelector(":root");
    btn.addEventListener("click", (e) => {
      root.classList.toggle("darkmode");
    });
  }
}
DarkMode.toggleDark();
