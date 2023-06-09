export class Anime {
  static alertModal(bool) {
    const modal = document.querySelector(".myModal");
    const modalContent = document.querySelector(".modal-content-alert");
    const modalBtn = document.querySelector(".btn-outline");

    if (bool) {
      modal.classList.remove("hidden");
      modalContent.classList.remove("bg-contrast");
      modalContent.classList.remove("modal-out");
      modalContent.classList.add("modal-in");

      modalBtn.addEventListener("click", () => {
        modalContent.classList.remove("modal-in");
        modalContent.classList.add("modal-out");
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 450);
      });
    } else {
      modal.classList.remove("hidden");
      modalContent.classList.remove("modal-out");
      modalContent.classList.add("modal-in");
      modalContent.classList.add("bg-contrast");

      setTimeout(() => {
        modalContent.classList.remove("modal-in");
        modalContent.classList.add("modal-out");
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 450);
      }, 1000);
    }
  }
}
