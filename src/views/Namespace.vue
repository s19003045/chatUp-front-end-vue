<template>
  <div class="container mb-5">
    <div class="row mt-2">
      <ChatroomSidebar :room-data="roomData" :nsp-data="nspData" />

      <!-- 根據 進入namespace頁面 或 聊天室頁面載入不同 router-view-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// 載入 components
import ChatroomSidebar from "../components/ChatroomSidebar";

// 載入 apis
import chatAPI from "../apis/chat";
// 載入 utils
import { Toast } from "../utils/helpers";

export default {
  components: {
    ChatroomSidebar
  },
  data() {
    return {
      roomData: [],
      nspData: {}
    };
  },
  created() {
    this.fetchNamespace(this.$route.params.namespaceId);
  },
  methods: {
    async fetchNamespace(namespaceId) {
      try {
        const { data, statusText } = await chatAPI.getNamespace(namespaceId);
        this.roomData = data.roomData;
        this.nspData = data.nspData;

        if (statusText === "OK") {
          Toast.fire({
            icon: "success",
            title: `Welcome to chat namespace ${data.nspData.name} !`
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