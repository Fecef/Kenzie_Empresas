import { ApiRequest } from "./api.js";

export class Companies {
  static companies = [];

  static async main() {
    const res = await ApiRequest.getCompanies();
    this.companies.push(...res);
  }

  static listAll() {
    return this.companies;
  }

  static listSectorsName() {
    const allSectors = [];

    this.companies.forEach((el) => {
      const sector = el.sectors.description;

      if (!allSectors.includes(sector)) {
        allSectors.push(sector);
      }
    });
    return allSectors;
  }

  static bySector(sector) {
    return this.companies.filter((el) => el.sectors.description === sector);
  }

  static byName(name) {
    return this.companies.find((el) => el.name === name);
  }
}