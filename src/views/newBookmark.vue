<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Yeni Ekle</h3>
    <input v-model="userData.title" type="text" placeholder="Başlık" class="input mb-3" />
    <input v-model="userData.url" type="text" placeholder="URL" class="input mb-3" />
    <select v-model="userData.categoryId" class="input mb-3">
      <option v-for="category in categories" :key="category.id" v-html="category.category" :value="category.id" selected></option>
    </select>
    <textarea v-model="userData.desc" placeholder="Açıklama" class="input mb-3" cols="30" rows="10"></textarea>
    <div class="flex items-center justify-end gap-x-1">
      <router-link class="secondary-button" :to="{ name: 'Home' }">İptal</router-link>
      <button @click="onSave" class="default-button">Kaydet</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      categories: [],
      userData: {
        title: null,
        url: null,
        categoryId: null,
        desc: null,
      },
    };
  },
  mounted() {
    this.$appAxios.get("/categories").then((categories_response) => {
      this.categories = categories_response?.data || [];
    });
  },
  methods: {
    onSave() {
      const saveData = {
        ...this.userData,
        userId: this.currentUser?.id,
        createdDate: new Date(),
      };

      this.$appAxios.post("/bookmarks", saveData).then((save_bookmark_response) => {
        console.log(save_bookmark_response);
        Object.keys(this.userData).forEach((field) => (this.userData[field] = null));
        this.$router.push({ name: "Home" });
      });
    },
  },
  computed: {
    ...mapGetters({
      currentUser: "_getCurrentUser",
    }),
  },
};
</script>
