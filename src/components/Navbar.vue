<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" :to="{name:'root'}">Chat up</router-link>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0 mr-3">
        <li
          v-if="currentUser"
          class="nav-item active navbar-username"
          :data-useruuid="currentUser.uuid"
          :data-name="currentUser.name"
        >
          Hi!
          <span class="ml-2">{{currentUser.name}}</span>
        </li>
      </ul>
      <button
        v-if="isAuthenticated"
        class="btn btn-outline-info btn-sm"
        @click="logout"
        id="logout"
      >登出</button>
      <router-link v-else class="btn btn-outline-info btn-sm" :to="{name:'sing-in'}" id="login">登入</router-link>
    </div>
  </nav>
</template>

<script>
// import store
import { mapState } from "vuex";
// import utils
import { Toast } from "../utils/helpers";

export default {
  name: "NavbarVue",
  // 當 state sub tree name 與 compouted property 一樣時，可以如下使用：(必須先載入 mapState)
  computed: {
    ...mapState(["currentUser", "isAuthenticated"])
  },
  methods: {
    logout() {
      // 向 API 請求 logout，暫時不需要
      // ---------
      // 清除 store.state 中使用者資料及清除 local storage 的 token
      this.$store.commit("revokeAuthentication");

      Toast.fire({
        icon: "success",
        title: "你已成功登出"
      });
      // 成功登出後轉址到登入頁
      this.$router.push("/signin");
    }
  }
};
</script>