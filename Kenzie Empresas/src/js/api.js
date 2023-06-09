export class ApiRequest {
  static token = localStorage.getItem("@kenzie:token");
  static baseUrl = "http://localhost:6278/";
  static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token}`,
  };

  static async signUp(data) {
    const res = await fetch(`${this.baseUrl}auth/register/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async signIn(data) {
    const res = await fetch(`${this.baseUrl}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async getCompanies() {
    const res = await fetch(`${this.baseUrl}companies`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async getSectors() {
    const res = await fetch(`${this.baseUrl}sectors`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async getCompanyDepartment(id) {
    const res = await fetch(`${this.baseUrl}departments/${id}`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async getAllDepartment() {
    const res = await fetch(`${this.baseUrl}departments`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async getUsers() {
    const res = await fetch(`${this.baseUrl}users`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async getPersonalData() {
    const res = await fetch(`${this.baseUrl}users/profile`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async getPersonalDepart() {
    const res = await fetch(`${this.baseUrl}users/departments`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async userDepartEmployesList() {
    const res = await fetch(`${this.baseUrl}users/departments/coworkers`, {
      method: "GET",
      headers: this.headers,
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async createCompany(data) {
    const res = await fetch(`${this.baseUrl}companies`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async createCompanyDepart(data) {
    const res = await fetch(`${this.baseUrl}departments`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async hireEmploy(data) {
    const res = await fetch(`${this.baseUrl}departments/hire/`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async fireEmploy(id) {
    const res = await fetch(`${this.baseUrl}departments/dismiss/${id}`, {
      method: "PATCH",
      headers: this.headers,
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async deleteDepart(id) {
    const res = await fetch(`${this.baseUrl}departments/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
    // console.log(res);
  }

  static async deleteUser(id) {
    const res = await fetch(`${this.baseUrl}admin/delete_user/${id}`, {
      method: "DELETE",
      headers: this.headers,
    });
    // console.log(res);
  }

  static async editDepart(data, id) {
    const res = await fetch(`${this.baseUrl}departments/${id}`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }

  static async editUserData(data) {
    const res = await fetch(`${this.baseUrl}users`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify(data),
    }).then((res) => res.json());
    // console.log(res);

    return res;
  }
}
