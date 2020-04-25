<template>
  <div class="container py-5 mt-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          required
          autofocus
        />
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

      <div class="form-label-group mb-3">
        <label for="password-check">Password check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
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
          <router-link to="/signin">Sign In</router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2020</p>
    </form>
  </div>
</template>

<script>
// import API
import authorizationAPI from "../apis/authorization";
// import helpers
import { Toast } from "../utils/helpers";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false
    };
  },
  methods: {
    async handleSubmit() {
      try {
        console.log("authorizationAPI:", authorizationAPI);
        this.isProcessing = true;
        // 檢查 input
        // 必填欄位是否都有填
        if (
          this.name === "" ||
          this.email === "" ||
          this.password === "" ||
          this.passwordCheck === ""
        ) {
          Toast.fire({
            icon: "warning",
            title: "請確認所有欄位是否都有填寫"
          });
          this.isProcessing = false;
          return;
        }
        // 檢查 email 是否符合規範

        // 檢查 password 是否符合規範

        // password 與 passwordCheck 是否一致
        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: "warning",
            title: "密碼不一致"
          });
          this.isProcessing = false;
          this.passwordCheck = "";
          return;
        }
        // 上述皆無誤後，則送出申請
        const { data } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        });

        // 是否註冊成功
        if (data.status === "success") {
          Toast.fire({
            icon: "success",
            title: "sign up successifully !"
          });
          this.$router.push({ name: "sign-in" });
        } else {
          Toast.fire({
            icon: "warning",
            title: `${data.message}`
          });
          this.isProcessing = false;
          this.passwordCheck = "";
          return;
        }
      } catch (err) {
        this.isProcessing = false;
        if (err) console.log(err);
        Toast.fire({
          icon: "error",
          title: "連線異常，請稍後再試"
        });
      }
    }
  }
};
</script>