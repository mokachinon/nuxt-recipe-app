import Cookie from "js-cookie";

export const state = () => ({
  recipes: [],
  recipeDetail: null,
  token: null,
  userData: null,
});

export const getters = {
  recipesData(state) {
    return state.recipes;
  },
  lastId(state) {
    const recipesLength = state.recipes.length;

    const lastRecipe = state.recipes[recipesLength - 1];
    if (lastRecipe) {
      return lastRecipe.id;
    } else {
      return 0;
    }
  },
  isAuth(state) {
    return state.token != null;
  },
  userId(state) {
    if (state.userData) {
      return state.userData.userId;
    } else {
      return null;
    }
  },
  userEmail(state) {
    if (state.userData) {
      return state.userData.email;
    } else {
      return null;
    }
  },
};

export const mutations = {
  addNewRecipe(state, payload) {
    state.recipes.push(payload);
  },
  setRecipeList(state, payload) {
    state.recipes = payload;
  },
  setRecipeDetail(state, payload) {
    state.recipeDetail = payload;
  },
  setToken(state, payload) {
    state.token = payload;
  },
  setUserData(state, payload) {
    state.userData = payload;
  },
  deleteLocalRecipe(state, recipeId) {
    const recipes = state.recipes.filter((item) => item.id !== recipeId);

    state.recipes = recipes;
  },
};

export const actions = {
  async getRecipesList({ commit }) {
    const response = await this.$axios.$get(
      "https://recipelist-306d3-default-rtdb.firebaseio.com/datarecipe.json"
    );

    const recipeArray = [];

    for (const key in response) {
      recipeArray.push({ ...response[key], id: key });
    }
    commit("setRecipeList", recipeArray);
  },

  async addRecipe({ state }, newRecipe) {
    await this.$axios.$post(
      "https://recipelist-306d3-default-rtdb.firebaseio.com/datarecipe.json?auth=" +
        state.token,
      {
        ...newRecipe,
        userId: state.userData.userId,
        userName: state.userData.username,
        dataLikes: ["null"],
      }
    );
  },

  async getRecipeDetail({ commit }, recipeId) {
    const response = await this.$axios.$get(
      "https://recipelist-306d3-default-rtdb.firebaseio.com/datarecipe/" +
        recipeId +
        ".json"
    );

    commit("setRecipeDetail", response);

    return response
  },

  authenticateUser({ commit }, authData) {
    const webAPIKey = "AIzaSyCJSqQlsiO8dxHrEz2TI85gPHKU28WUkO8";

    let authUrl = authData.isLogin
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
      : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
    return this.$axios
      .post(authUrl + webAPIKey, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
        displayName: authData.displayName,
      })
      .then((response) => {
        commit("setToken", response.data.idToken);
        commit("setUserData", {
          username: response.data.displayName,
          userId: response.data.localId,
          email: response.data.email,
        });

        localStorage.setItem("token", response.data.idToken);
        Cookie.set("jwt", response.data.idToken);

        const userData = {
          username: response.data.displayName,
          userId: response.data.localId,
          email: response.data.email,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        Cookie.set("acc_user", JSON.stringify(userData));

        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime() + Number.parseInt(response.data.expiresIn) * 1000
        );
        Cookie.set(
          "expirationDate",
          new Date().getTime() + Number.parseInt(response.data.expiresIn) * 1000
        );
      })
      .catch((error) => {
        console.log(error);
      });
  },

  initAuth({ commit, dispatch }, req) {
    let user;
    let token;
    let expirationDate;

    if (req) {
      if (!req.headers.cookie) {
        return;
      }

      const jwtCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("jwt="));

      const accUserCookie = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("acc_user="));

      const userCookie = accUserCookie.substr(accUserCookie.indexOf("=") + 1);
      user = JSON.parse(decodeURIComponent(userCookie));

      if (!jwtCookie) {
        return;
      }

      token = jwtCookie.split("=")[1];

      expirationDate = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("expirationDate="))
        .split("=")[1];
    } else {
      token = localStorage.getItem("token");
      user = JSON.parse(localStorage.getItem("user"));
      expirationDate = localStorage.getItem("tokenExpiration");
    }

    if (new Date().getTime() > +expirationDate || !token) {
      console.log("No token or invalid token");
      dispatch("logout");
      return;
    }

    commit("setToken", token);
    commit("setUserData", user);
  },

  logout({ commit }) {
    commit("setToken", null);

    Cookie.remove("jwt");
    Cookie.remove("acc_user");
    if (process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  },

  async likeUpdate({ state }, recipe) {
    const url =
      "https://recipelist-306d3-default-rtdb.firebaseio.com/datarecipe/" +
      recipe.recipeId +
      ".json?auth=" +
      state.token;

    await this.$axios.$put(url, recipe.newDataRecipe);
  },

  async deleteRecipe({ commit, state }, recipeId) {
    const url =
      "https://recipelist-306d3-default-rtdb.firebaseio.com/datarecipe/" +
      recipeId +
      ".json?auth=" +
      state.token;

    await this.$axios.$delete(url);

    commit("deleteLocalRecipe", recipeId);
  },

  async updateRecipe({ dispatch, state }, recipe) {
    const url =
      "https://recipelist-306d3-default-rtdb.firebaseio.com/datarecipe/" +
      recipe.id +
      ".json?auth=" +
      state.token;

    await this.$axios.$put(url, recipe.newRecipe);

  }
};
