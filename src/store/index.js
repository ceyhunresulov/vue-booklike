import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });
export default createStore({
  state: {
    user: null,
    key: "123ceyhun?456",
  },
  mutations: {
    stateUser(state, user) {
      state.user = user;
    },
    logoutUser(state) {
      state.user = null;
    },
    setLike(state, bookmarkId) {
      state.user.likes = bookmarkId;
    },
    setBookmarkSave(state, bookmarkSaveId) {
      state.user.bookmarkSave = bookmarkSaveId;
    },
  },
  getters: {
    _isAuthenticated: (state) => state.user != null,
    _getCurrentUser(state) {
      const user = state.user;
      delete user?.password;
      return user;
    },
    _userLikes: (state) => state.user?.likes || [],
    _bookmarkSave: (state) => state.user?.bookmarkSave || [],
    _getKey: (state) => state.key,
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
