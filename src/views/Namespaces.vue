<template>
  <div class="row">
    <PublicNamespaces :public-namespaces="publicNamespaces" />
    <PrivateNamespaces :private-namespaces="privateNamespaces" />
  </div>
</template>

<script>
// 載入 components
import PublicNamespaces from "../components/PublicNamespaces";
import PrivateNamespaces from "../components/PrivateNamespaces";
// 載入 apis
import chatAPI from "../apis/chat";
// 載入 utils
import { Toast } from "../utils/helpers";
// import store
import store from "../store";

export default {
  components: {
    PublicNamespaces,
    PrivateNamespaces
  },
  data() {
    return {
      publicNamespaces: [],
      privateNamespaces: []
    };
  },
  created() {
    this.fetchNamespaces();
  },
  beforeRouteEnter(to, from, next) {
    // 在此，必須使用 store.state 取得 isAuthenticated，無法使用 this.$store
    let isAuthenticated = store.state.isAuthenticated;

    // 連結首頁前，若來自 signin 頁面且通過驗證，則顯示歡迎訊息
    if (isAuthenticated && from.name === "sign-in") {
      Toast.fire({
        icon: "success",
        title: "Welcome to chat app !"
      });
    }
    next();
  },
  methods: {
    async fetchNamespaces() {
      try {
        const { data, statusText } = await chatAPI.indexPage();

        this.publicNamespaces = data.publicNsps;
        this.privateNamespaces = data.privateNsps;
        console.log("statusText:", statusText);
      } catch (err) {
        if (err) console.log(err);
        Toast.fire({
          icon: "error",
          title: "無法順利取得資料，請稍後再試 !"
        });
      }
    }
  }
};
</script>