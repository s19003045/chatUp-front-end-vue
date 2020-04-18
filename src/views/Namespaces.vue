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
import chatApis from "../../apis/chat";
// 載入 utils
import { Toast } from "../../utils/helpers";

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
  methods: {
    async fetchNamespaces() {
      try {
        const { data, statusText } = await chatApis.indexPage();

        this.publicNamespaces = data.publicNsps;
        this.privateNamespaces = data.privateNsps;

        if (statusText === "OK") {
          Toast.fire({
            icon: "success",
            title: "Welcome to chat app !"
          });
        }
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