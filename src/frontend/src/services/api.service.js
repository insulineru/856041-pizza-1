import JwtService from "@/service/jwt.service";
import axios from "@/plugins/axios";

export class BaseApiService {}

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource) {
    super();
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource) {
    super(resource);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}

export class AuthApiService extends BaseApiService {
  constructor() {
    super();
  }

  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common.authorization = token
      ? `Bearer ${token}`
      : "";
  }

  async login(params) {
    const { data } = await axios.post("/login", params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete("/logout");
    return data;
  }

  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}

export class DoughApiService extends ReadOnlyApiService {
  static getDoughValue({ name }) {
    switch (name) {
      case "Тонкое":
        return "small";
      case "Толстое":
        return "big";
      default:
        return "big";
    }
  }

  _normalize(dough) {
    return {
      ...dough,
      value: DoughApiService.getDoughValue(dough),
    };
  }

  async query(config = {}) {
    const doughs = super.query(config);
    return doughs.map((dough) => this._normalize(dough));
  }
}

export class SizesApiService extends ReadOnlyApiService {
  static getSizeValue({ name }) {
    switch (name) {
      case "23 см":
        return "small";
      case "32 см":
        return "normal";
      case "45 см":
        return "big";
      default:
        return "big";
    }
  }

  _normalize(size) {
    return {
      ...size,
      value: SizesApiService.getSizeValue(size),
    };
  }

  async query(config = {}) {
    const sizes = super.query(config);
    return sizes.map((size) => this._normalize(size));
  }
}

export class SauceApiService extends ReadOnlyApiService {
  static getSauceValue({ name }) {
    switch (name) {
      case "Томатный":
        return "tomato";
      case "Сливочный":
        return "creamy";
      default:
        return "tomato";
    }
  }

  _normalize(size) {
    return {
      ...size,
      value: SauceApiService.getSizeValue(size),
    };
  }

  async query(config = {}) {
    const doughs = super.query(config);
    return doughs.map((dough) => this._normalize(dough));
  }
}

export class IngredientApiService extends ReadOnlyApiService {
  static getNameFromPath(path) {
    if (!path) return "";

    const regexp = /^(.*)\/(.*)(\..*)$/;

    return regexp.exec(path)[2] || false;
  }

  _normalize(ingredient) {
    return {
      ...ingredient,
      value: IngredientApiService.getNameFromPath(ingredient.image),
      count: 0,
    };
  }

  async query(config = {}) {
    const ingredients = super.query(config);
    return ingredients.map((ingredient) => this._normalize(ingredient));
  }
}

export class MiscApiService extends ReadOnlyApiService {
  _normalize(misc) {
    return {
      ...misc,
      count: 0,
    };
  }

  async query(config = {}) {
    const additionals = super.query(config);
    return additionals.map((misc) => this._normalize(misc));
  }
}
