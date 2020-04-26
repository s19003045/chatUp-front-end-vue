<template>
  <div class="container mb-5">
    <div class="row mt-2">
      <Spinner v-if="isLoading"></Spinner>
      <template v-else>
        <ChatroomSidebar :room-data="roomData" :nsp-data="nspData" />

        <!-- 根據 進入namespace頁面 或 聊天室頁面載入不同 router-view-->
        <router-view></router-view>
      </template>
    </div>
  </div>
</template>

<script>
// 載入 components
import ChatroomSidebar from "../components/ChatroomSidebar";
import Spinner from "../components/Spinner.vue";
// 載入 apis
import chatAPI from "../apis/chat";
// 載入 utils
import { Toast } from "../utils/helpers";
// 載入 socket
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default {
  components: {
    ChatroomSidebar,
    Spinner
  },
  data() {
    return {
      roomData: [],
      nspData: {},
      isLoading: true
    };
  },
  created() {
    this.fetchNamespace(this.$route.params.namespaceId);
    this.connectSocket();
  },
  methods: {
    async fetchNamespace(namespaceId) {
      try {
        const { data, statusText } = await chatAPI.getNamespace(namespaceId);
        this.roomData = data.roomData;
        this.nspData = data.nspData;

        setTimeout(() => {
          this.isLoading = false;
        }, 500);
        if (statusText === "OK") {
          Toast.fire({
            icon: "success",
            title: `You are now in namespace ${data.nspData.name} !`,
            timer: 1500
          });
        }
      } catch (err) {
        if (err) console.log(err);
        this.isLoading = true;
        Toast.fire({
          icon: "error",
          title: "無法順利取得資料，請稍後再試 !"
        });
      }
    },
    connectSocket() {
      // 事件：連結
      socket.on("connect", function() {
        console.log("websocket connected");
      });
    }
  }
};
</script>