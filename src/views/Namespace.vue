<template>
  <div class="container mb-5">
    <div class="row mt-2">
      <ChatroomSidebar :room-data="roomData" :nsp-data="nspData" />
      <ChattingArea />
    </div>
  </div>
</template>

<script>
// 載入 components
import ChatroomSidebar from "../components/ChatroomSidebar";
import ChattingArea from "../components/ChattingArea";
// 載入 apis
import chatApis from "../../apis/chat";
// 載入 utils
import { Toast } from "../../utils/helpers";

export default {
  components: {
    ChatroomSidebar,
    ChattingArea
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
        const { data, statusText } = await chatApis.getNamespace(namespaceId);
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