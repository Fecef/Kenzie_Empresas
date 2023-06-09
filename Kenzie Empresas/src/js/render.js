import { ApiRequest } from "./api.js";

export class Render {
  static indexCompanies(tagPai, element) {
    const li = document.createElement("li");
    const div1 = document.createElement("div");
    const p = document.createElement("p");
    const div2 = document.createElement("div");
    const h2 = document.createElement("h2");
    const small1 = document.createElement("small");
    const hr1 = document.createElement("hr");
    const hr2 = document.createElement("hr");
    const small2 = document.createElement("small");

    li.classList.add("card");

    h2.innerText = element.name;
    small1.innerText = element.opening_hours;
    p.innerText = element.description;
    small2.innerText = element.sectors.description;

    tagPai.append(li);
    li.append(div1, p, div2);
    div1.append(h2, small1, hr1);
    div2.append(hr2, small2);
  }

  static navFilter(tagPai, element) {
    const option = document.createElement("option");

    option.value = element;
    option.innerText = element;

    tagPai.append(option);
  }

  static companiesFilter(tagPai, element) {
    const option = document.createElement("option");

    option.innerText = element.name;
    option.id = element.uuid;

    tagPai.append(option);
  }

  static sectors(tagPai, element) {
    const li = document.createElement("li");
    const div1 = document.createElement("div");
    const hr1 = document.createElement("hr");
    const h2 = document.createElement("h2");
    const div2 = document.createElement("div");
    const hr2 = document.createElement("hr");

    li.classList.add("card");

    h2.innerText = element;

    tagPai.append(li);
    li.append(div1, h2, div2);
    div1.append(hr1);
    div2.append(hr2);
  }

  static modalSectors(tagPai, element) {
    const option = document.createElement("option");

    option.value = element.description;
    option.innerText = element.description;
    option.id = element.uuid;

    tagPai.append(option);
  }

  static dashboardCompanies(tagPai, element) {
    const li = document.createElement("li");
    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const h2 = document.createElement("h2");
    const small1 = document.createElement("small");
    const hr1 = document.createElement("hr");
    const btn1 = document.createElement("button");
    const btn2 = document.createElement("button");
    const hr2 = document.createElement("hr");
    const small2 = document.createElement("small");

    li.classList.add("card");
    div2.classList.add("card-btn");
  
    btn1.classList.add("btn");
    btn2.classList.add("btn");
    btn1.classList.add("btn-primary");
    btn2.classList.add("btn-primary");
    btn1.classList.add("btn-depart");
    btn2.classList.add("btn-employee");

    btn1.id = element.uuid;
    btn2.id = element.uuid;

    btn1.setAttribute("data-bs-toggle", "modal");
    btn1.setAttribute("data-bs-target", "#departaments");
    btn2.setAttribute("data-bs-toggle", "modal");
    btn2.setAttribute("data-bs-target", "#allEmployees");

    h2.innerText = element.name;
    small1.innerText = element.opening_hours;
    btn1.innerText = "Departamentos";
    btn2.innerText = "Funcionários";
    small2.innerText = element.sectors.description;

    tagPai.append(li);
    li.append(div1, div2, div3);
    div1.append(h2, small1, hr1);
    div2.append(btn1, btn2);
    div3.append(hr2, small2);
  }

  static departList(tagPai, element) {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.classList.add("btn-depart");
    btn.innerText = element.name;

    btn.setAttribute("data-bs-toggle", "modal");
    btn.setAttribute("data-bs-target", "#companyDepart");

    btn.id = element.uuid;
    tagPai.id = element.companies.uuid;

    tagPai.append(li);
    li.append(btn);
  }
  
  static allFreeEmployees(tagPai, element) {
    if (element.username === "ADMIN") return;

    if (element.kind_of_work == null) {
      element.kind_of_work = "Não atribuído";
    }
    const level = this.normalize(element.professional_level);
    const kindWork = this.normalize(element.kind_of_work);
    const name = this.normalize(element.username);

    tagPai.insertAdjacentHTML(
      "beforeend",
      `
      <tr>
          <th scope="row"><i class="fa-regular fa-square-plus" id="${element.uuid}" data-bs-dismiss="modal"
          aria-label="Close"></i></th>
          <td>${name}</td>
          <td>${level}</td>
          <td>${kindWork}</td>
      </tr>
    `
    );
  }

  static allWorkingEmployees(tagPai, element) {
    if (element.username === "ADMIN") return;

    if (element.kind_of_work == null) {
      element.kind_of_work = "Não atribuído";
    }
    const level = this.normalize(element.professional_level);
    const kindWork = this.normalize(element.kind_of_work);
    const name = this.normalize(element.username);

    tagPai.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
            <th scope="row"><i class="fa-regular fa-square-minus" id="${element.uuid}" data-bs-dismiss="modal"
            aria-label="Close"></i></th>
            <td>${name}</td>
            <td>${level}</td>
            <td>${kindWork}</td>
        </tr>
      `
    );
  }

  static async allEmployee(tagPai, element) {
    if (element.username === "ADMIN") return;
    const res = await ApiRequest.getAllDepartment();
    const filter = res.find((el) => el.uuid === element.department_uuid);

    if (element.kind_of_work == null) {
      element.kind_of_work = "Não atribuído";
    }
    const level = this.normalize(element.professional_level);
    const kindWork = this.normalize(element.kind_of_work);
    const name = this.normalize(element.username);

    tagPai.insertAdjacentHTML(
      "beforeend",
      `
        <tr>
            <td><i class="fa-solid fa-trash" id="${element.uuid}"></i></td>
            <td>${name}</td>
            <td>${level}</td>
            <td>${kindWork}</td>
            <td>${filter.description}</td>
        </tr>
      `
    );
  }

  static async personalData(tagpPai, res) {
    const el = await ApiRequest.getPersonalDepart(res.department_uuid);
    const level = this.normalize(res.professional_level);

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");
    const div3 = document.createElement("div");
    const h21 = document.createElement("h2");
    const h22 = document.createElement("h2");
    const small1 = document.createElement("small");
    const small2 = document.createElement("small");
    const small3 = document.createElement("small");
    const hr1 = document.createElement("hr");
    const hr2 = document.createElement("hr");

    small2.classList.add("modalidade");

    h21.innerText = res.username;
    small1.innerText = res.email;

    if (el.error) {
      h22.innerText = "Você não pertence a nenhum departamento.";
    } else {
      const userDepart = el.departments.find(
        (el) => el.uuid === res.department_uuid
      );
      h22.innerText = el.name;
      small2.innerText = userDepart.description;
    }

    small3.innerText = level;

    tagpPai.append(div1, div2, div3);
    div1.append(h21, small1, hr1);
    div2.append(h22, small2);
    div3.append(hr2, small3);
  }

  static departEmployes(tagpPai, element) {
    if (element.kind_of_work == null) {
      element.kind_of_work = "Não atribuído";
    }

    const level = this.normalize(element.professional_level);
    const kindWork = this.normalize(element.kind_of_work);
    const name = this.normalize(element.username);

    tagpPai.insertAdjacentHTML(
      "afterbegin",
      `
      <tr>
        <td>${name}</td>
        <td>${level}</td>
        <td>${kindWork}</td>
      </tr>
    `
    );
  }

  static normalize(str) {
    const normalizedStr = str
      .split(" ")
      .map((el) => el.replace(el[0], el[0].toUpperCase()))
      .join(" ");

    return normalizedStr;
  }
}
