<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Register</h3>
    <input v-model="userData.fullName" type="text" placeholder="Tam Ad" class="input mb-3" />
    <input v-model="userData.userName" type="text" placeholder="Kullanıcı Adı" class="input mb-3" />
    <input v-model="userData.password" type="password" placeholder="Şifre" class="input mb-3" />
    <button class="default-button" @click="onSave">Kayıt ol</button>
    <span class="text-center mt-3 text-sm">
      Zaten Üyeyim,
      <router-link :to="{ name: 'Login' }" href="#" class="text-red-900 hover:text-black">Giriş yap!</router-link>
    </span>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      userData: {
        fullName: null,
        userName: null,
        password: null,
      },
    };
  },
  methods: {
    onSave() {
      const password = this.userData.password;
      const cryptoPassword = CryptoJS.HmacSHA1(password, this.$store.getters._getKey).toString();
      this.$appAxios.post("/users", { ...this.userData, password: cryptoPassword }).then((register_response) => {
        console.log(register_response);
      });
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
