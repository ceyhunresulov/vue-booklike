<template>
  <body class="bg-gray-100 overflow-x-hidden" id="app">
    <appHeader></appHeader>
    <div class="flex flex-row">
      <sideBar @categoryChange="updateBookmark"></sideBar>
      <bookmarkListIndex :items="bookmarks"></bookmarkListIndex>
    </div>
  </body>
</template>

<script>
import sideBar from "@/components/sidebar/sideBar";
export default {
  components: {
    sideBar,
  },
  data() {
    return {
      bookmarks: [],
    };
  },
  created() {
    this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then((bookmarks_response) => {
      this.bookmarks = bookmarks_response?.data;
      console.log("home", bookmarks_response);
    });
  },
  methods: {
    updateBookmark(categoryId) {
      const url = categoryId ? `/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}` : `/bookmarks?_expand=category&_expand=user`;
      this.$appAxios.get(url).then((bookmarks_response) => {
        console.log("update", bookmarks_response);
        this.bookmarks = bookmarks_response?.data;
        console.log("home", this.bookmarks);
      });
    },
  },
};
</script>
