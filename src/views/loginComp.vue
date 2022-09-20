<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Login</h3>
    <input v-model="userData.userName" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
    <input v-model="userData.password" type="password" placeholder="Şifre" class="input mb-3" />
    <button @click="onSubmit" class="default-button">Giriş yap</button>
    <span class="text-center mt-3 text-sm">
      Üye değilim,
      <router-link :to="{ name: 'register' }" href="#" class="text-red-900 hover:text-black">Üye olmak istiyorum!</router-link>
    </span>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      userData: {
        userName: null,
        password: null,
      },
    };
  },
  methods: {
    onSubmit() {
      const cryptoPassword = CryptoJS.HmacSHA1(this.userData.password, this.$store.getters._getKey).toString();
      this.$appAxios
        .get(`/users?userName=${this.userData.userName}&password=${cryptoPassword}`)
        .then((login_response) => {
          console.log(login_response);
          if (login_response?.data?.length > 0) {
            this.$store.commit("stateUser", login_response?.data[0]);
          } else {
            alert("bele istfadeci yoxdur!");
          }
        })
        .catch((e) => console.log(e));
      this.$router.push({ name: "Home" });
    },
  },
};
</script>
