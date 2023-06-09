import { Anime } from "../animation.js";
import { ApiRequest } from "../api.js";
import { Companies } from "../companies.js";
import { Render } from "../render.js";

class Dashboard {
  static allCompanies = [];
  static filterCompanies = [];

  static access() {
    const token = localStorage.getItem("@kenzie:token");

    if (token == null) {
      window.location.replace("../../index.html");
    }
  }

  static logOut() {
    const btn = document.querySelector(".bg-contrast");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();

      return window.location.replace("../../index.html");
    });
  }

  static async addNewCompany() {
    const form = document.querySelector(".modal-body form");
    const select = document.querySelector("#selectSector");
    const res = await ApiRequest.getSectors();

    res.forEach((el) => Render.modalSectors(select, el));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      await ApiRequest.createCompany({
        name: e.target.name.value,
        opening_hours: e.target.openingHour.value,
        description: e.target.descricao.value,
        sector_uuid: e.target.selectSector[selectSector.selectedIndex].id,
      });

      window.location.reload();
    });
  }

  static addNewDepart() {
    const modalTitle = document.querySelector(".modal-content-alert h2");
    const modalMsg = document.querySelector(".modal-content-alert p");
    const form = document.querySelector("#departaments form");
    const btnRegister = document.querySelector(
      "#departaments .modal-body button"
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      ApiRequest.createCompanyDepart({
        name: e.target.departName.value,
        description: e.target.departDescription.value,
        company_uuid: btnRegister.id,
      });

      modalTitle.innerText = "Departamento criado com sucesso.";
      modalMsg.innerText = "";

      Anime.alertModal(false);
    });
  }

  static async listAllSectors() {
    await Companies.main();
    const menu = document.querySelector("#sectors menu");
    const allSectors = Companies.listSectorsName();
    allSectors.forEach((el) => Render.sectors(menu, el));
  }

  static async listCompanyBySector() {
    const unique = [];
    const menu = document.querySelector("#companyBySector menu");
    const listAll = await ApiRequest.getCompanies();

    const filtered = listAll.filter((el) => {
      if (!unique.includes(el.sectors.description)) {
        unique.push(el.sectors.description);
        return true;
      }
    });
    filtered.forEach((el) => Render.indexCompanies(menu, el));
  }

  static async listAllDepartEmployees() {
    const btn = document.querySelectorAll("#newCompany button");
    const tbody = document.querySelector("#allEmployees tbody");

    btn.forEach((el) => {
      el.addEventListener("click", async (e) => {
        const res = await ApiRequest.getCompanyDepartment(e.target.id);
        const allEmploy = await ApiRequest.getUsers();
        const departIds = res.map((el) => el.uuid);

        tbody.innerHTML = "";

        const result = allEmploy.filter((el) => {
          if (departIds.includes(el.department_uuid)) {
            return true;
          }
        });

        result.forEach((el) => {
          Render.allEmployee(tbody, el);
        });
        this.finishUserAccount();
      });
    });
  }

  static finishUserAccount() {
    const icon = document.querySelectorAll("#allEmployees .modal-body tbody");
    const modalTitle = document.querySelector(".modal-content-alert h2");
    const modalMsg = document.querySelector(".modal-content-alert p");

    icon.forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target.tagName === "I") {
          ApiRequest.deleteUser(e.target.id);
          modalTitle.innerText = "Usuário removido com sucesso.";
          modalMsg.innerText = "";

          Anime.alertModal(false);
        }
      });
    });
  }

  static viewDepart() {
    const ul = document.querySelector("#departaments .modal-body ul");

    ul.addEventListener("click", async (e) => {
      const companyId = ul.id;
      const res = await ApiRequest.getCompanyDepartment(companyId);
      if (e.target.tagName === "BUTTON") {
        const h1 = document.querySelector("#companyDepart h1");
        const sectorName = e.target.innerText;
        const depart = res.find((el) => el.name === sectorName);

        h1.innerText = depart.description;
        this.viewEmployees(e.target.id);
      }
    });
  }

  static async viewEmployees(id) {
    const res = await ApiRequest.getUsers();
    const tbodyWork = document.querySelector("#contratados tbody");
    const tbodyFree = document.querySelector("#disponiveis tbody");
    const work = res.filter((el) => el.department_uuid === id);
    const free = res.filter((el) => el.department_uuid == null);

    tbodyWork.innerHTML = "";
    tbodyFree.innerHTML = "";
    work.forEach((el) => Render.allWorkingEmployees(tbodyWork, el));
    free.forEach((el) => Render.allFreeEmployees(tbodyFree, el));

    const btn = document.querySelectorAll(
      "#companyDepart .modal-footer button"
    );

    btn[0].id = id;
    btn[1].id = id;

    this.manageEmployee(id);
    this.removeEditDepart();
  }

  static manageEmployee(departId) {
    const plusIcon = document.querySelectorAll(
      "#companyDepart .fa-square-plus"
    );
    const minussIcon = document.querySelectorAll(
      "#companyDepart .fa-square-minus"
    );

    plusIcon.forEach((el) => {
      el.addEventListener("click", (e) => {
        ApiRequest.hireEmploy({
          user_uuid: e.target.id,
          department_uuid: departId,
        });
      });
    });

    minussIcon.forEach((el) => {
      el.addEventListener("click", (e) => {
        ApiRequest.fireEmploy(e.target.id);
      });
    });
  }

  static removeEditDepart() {
    const btn = document.querySelectorAll(
      "#companyDepart .modal-footer button"
    );
    const input = document.querySelector("#companyDepart .modal-footer input");

    btn[0].addEventListener("click", async () => {
      await ApiRequest.editDepart({ description: input.value }, btn[0].id);
      window.location.reload();
    });

    btn[1].addEventListener("click", async () => {
      console.log("as");
      await ApiRequest.deleteDepart(btn[1].id);
      window.location.reload();
    });
  }

  static async listAllCompanies() {
    const listAll = await ApiRequest.getCompanies();
    const menu = document.querySelector("#newCompany menu");
    const select = document.querySelector("#newCompanyNames");

    this.allCompanies = [...listAll];
    this.allCompanies.forEach((el) => Render.dashboardCompanies(menu, el));
    this.allCompanies.forEach((el) => Render.companiesFilter(select, el));

    this.filterCompany();
    this.showCompanyDeparts();
  }

  static filterCompany() {
    const select = document.querySelector("#newCompanyNames");

    select.addEventListener("mouseup", () => {
      const id = select.options[select.selectedIndex].id;
      this.filterCompanies = this.allCompanies.filter((el) => el.uuid === id);

      if (this.filterCompanies.length === 0) {
        this.filterCompanies = this.allCompanies;
        this.showCompanyDeparts();
      }

      this.showFilteredCompany();
      this.showCompanyDeparts();
    });
  }

  static showFilteredCompany() {
    const menu = document.querySelector("#newCompany menu");
    menu.innerHTML = "";

    this.filterCompanies.forEach((el) => Render.dashboardCompanies(menu, el));
  }

  static showCompanyDeparts() {
    const btn = document.querySelectorAll("#newCompany .btn-depart");
    const ul = document.querySelector("#departaments .modal-body ul");
    const btnDepart = document.querySelector("#foo button");

    btn.forEach((button) => {
      button.addEventListener("click", async (e) => {
        btnDepart.id = e.target.id;

        const res = await ApiRequest.getCompanyDepartment(e.target.id);

        ul.innerHTML = "";
        res.forEach((depart) => Render.departList(ul, depart));
      });
    });

    this.listAllDepartEmployees();
  }
}

Dashboard.access();
Dashboard.logOut();
Dashboard.addNewCompany();
Dashboard.addNewDepart();
Dashboard.listAllSectors();
Dashboard.listAllCompanies();
Dashboard.listCompanyBySector();
Dashboard.viewDepart();
