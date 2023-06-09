import { Anime } from "../animation.js";
import { ApiRequest } from "../api.js";
import { Companies } from "../companies.js";
import { Render } from "../render.js";

class Index {
  static navToggle() {
    const toggleBtn = document.querySelector(".fa-bars");
    const navLinks = document.querySelector("header nav menu");

    toggleBtn.addEventListener("click", () => {
      navLinks.classList.toggle("visible");
    });
  }

  static loginButton() {
    const loginBtn = document.querySelector(".bg-contrast");
    const main = document.querySelector("main");

    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      main.classList.toggle("hidden");
    });
  }

  static signUp() {
    const form = document.querySelector(".signup-container form");
    const modalTitle = document.querySelector(".modal-content-alert h2");
    const modalMsg = document.querySelector(".modal-content-alert p");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const res = await ApiRequest.signUp({
        password: e.target.password.value,
        email: e.target.email.value,
        professional_level: e.target.professionalLevel.value.toLowerCase(),
        username: e.target.username.value,
      });

      if (res.error) {
        modalTitle.innerText = "E-mail já está em uso ou inválido.";
        modalMsg.innerText = "Não foi possível completar o cadastro.";

        Anime.alertModal(true);
      } else {
        modalTitle.innerText = "Cadastro realizado com sucesso!";
        modalMsg.innerText = "";

        Anime.alertModal(false);
      }
    });
  }

  static signIn() {
    const form = document.querySelector(".login-container");
    const modalTitle = document.querySelector(".modal-content-alert h2");
    const modalMsg = document.querySelector(".modal-content-alert p");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const res = await ApiRequest.signIn({
        email: e.target.email.value,
        password: e.target.password.value,
      });

      if (res.error === "password invalid!") {
        modalTitle.innerText = "Senha inválida.";
        modalMsg.innerText = "Não foi possível realizar o login.";

        Anime.alertModal(true);
      } else if (res.error === "email invalid!") {
        modalTitle.innerText = "Email inválido.";
        modalMsg.innerText = "Não foi possível realizar o login.";

        Anime.alertModal(true);
      } else if (res.is_admin) {
        localStorage.setItem("@kenzie:token", res.token);
        localStorage.setItem("@kenzie:userId", res.uuid);

        window.location.replace("../src/pages/dashboard-admin.html");
      } else {
        localStorage.setItem("@kenzie:token", res.token);
        localStorage.setItem("@kenzie:userId", res.uuid);

        window.location.replace("../src/pages/dashboard-user.html");
      }
    });
  }

  static async listCompanies() {
    await Companies.main();
    const companies = Companies.listAll();
    const sectorsNames = Companies.listSectorsName();
    const menu = document.querySelector(".card-wrapper menu");
    const sectors = document.querySelector("#sectors");
    sectorsNames.forEach((el) => Render.navFilter(sectors, el));
    const filterOption = document.querySelectorAll("#sectors option");

    filterOption.forEach((option) => {
      option.addEventListener("click", (e) => {
        const category = e.target.value;
        const filtered = Companies.bySector(category);

        // Caso clique em Login ou Toodas.
        if (category === "Todas" || category === "Login") {
          menu.innerHTML = "";
          return companies.forEach((company) =>
            Render.indexCompanies(menu, company)
          );
        }
        // Filtraad pro categoria
        menu.innerHTML = "";
        return filtered.forEach((company) =>
          Render.indexCompanies(menu, company)
        );
      });
    });

    //  Listagem geral.
    companies.forEach((el) => Render.indexCompanies(menu, el));
  }
}

Index.navToggle();
Index.loginButton();
Index.signUp();
Index.signIn();
Index.listCompanies();
