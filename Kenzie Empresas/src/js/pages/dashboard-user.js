import { ApiRequest } from "../api.js";
import { Render } from "../render.js";

class DashboardUser {
  static userToken = localStorage.getItem("@kenzie:token");
  static logOut() {
    const btn = document.querySelector(".bg-contrast");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();

      return window.location.replace("../../index.html");
    });
  }

  static editAccount() {
    const form = document.querySelector("#editAccModalForm");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      await ApiRequest.editUserData({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
      });

      window.location.reload();
    });
  }

  static async getPersonalData() {
    const res = await ApiRequest.getPersonalData();
    const li = document.querySelector("#user-data");

    Render.personalData(li, res);
  }

  static async listDepartEmployes() {
    const res = await ApiRequest.userDepartEmployesList();
    const tbody = document.querySelector("#contratados tbody");
    const h2 = document.querySelector(".card h2");
    if (res.length === 0) return;

    res[0].users.forEach((el) => {
      h2.innerText = res[0].name;
      Render.departEmployes(tbody, el);
    });
  }
}
DashboardUser.editAccount();
DashboardUser.logOut();
DashboardUser.getPersonalData();
DashboardUser.listDepartEmployes();
