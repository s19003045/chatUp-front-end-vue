<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Chat up</a>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav ml-auto mt-2 mt-lg-0 mr-3">
        <li
          v-if="user"
          class="nav-item active navbar-username"
          :data-useruuid="user.uuid"
          :data-name="user.name"
        >
          Hi!
          <span class="ml-2">{{user.name}}</span>
        </li>
      </ul>
      <a v-if="user" class="btn btn-outline-info btn-sm" href="/logout" id="logout">登出</a>
      <a v-else class="btn btn-outline-info btn-sm" href="/signin" id="login">登入</a>
    </div>
  </nav>
</template>

<script>
const fakerUser = {
  name: "John",
  uuid: "12345678",
  email: "user1@example.com"
};

export default {
  name: "Navbar",
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.user = fakerUser;
    }
  }
};
</script>