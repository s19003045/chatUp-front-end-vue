<template>
  <div class="container py-5 mt-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >Submit</button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup">Sign Up</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "../apis/authorization";
import { Toast } from "../utils/helpers";

export default {
  name: "SignIn",
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false
    };
  },
  created() {},
  methods: {
    async handleSubmit() {
      try {
        if (!this.email || !this.password) {
          Toast.fire({
            type: "warning",
            title: "請填入 email 和 password"
          });
          return;
        }
        this.isProcessing = true;

        const { data, statusText } = await authorizationAPI.signIn({
          email: this.email,
          password: this.password
        });

        if (statusText !== "OK" || data.status !== "success") {
          throw new Error(statusText);
        }
        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);

        // 將 user 資料放進 store。
        // commit(mutation-type, user-data)
        this.$store.commit("setCurrentUser", data.user);
        if (statusText === "OK") {
          Toast.fire({
            icon: "success",
            title: `${data.message}`
          });
        }
        // 成功登入後轉址到首頁
        this.$router.push({ name: "namespaces" });
      } catch (err) {
        if (err) console.log(err);
        this.isProcessing = false;
        this.password = "";
        Toast.fire({
          icon: "warning",
          title: "您輸入的帳號或密碼有誤"
        });
      }
    }
  }
};
</script>