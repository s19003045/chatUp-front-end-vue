<template>
  <div class="col col-12 col-md-9 mb-5">
    <!-- Button trigger modal -->
    <button
      type="button"
      class="my-2 btn btn-primary btn-type-name"
      data-toggle="modal"
      data-target="#usernameInput"
    >Type your name</button>
    <div class="userCountOnline my-3">
      目前在線人數：
      <span class></span>
    </div>

    <!-- chat message list here -->
    <ul id="messages" class="list-group py-0">
      <!-- li elements here -->
    </ul>
    <!-- user input here -->
    <form action class="fixed-bottom message-send" @submit.prevent.stop="handleSubmit">
      <input
        id="message-input"
        v-model="message"
        autocomplete="off"
        placeholder="type something ........"
      />
      <button class="btn btn-success">Send</button>
    </form>

    <!-- modal : get username-->
    <!-- Modal -->
    <div
      class="modal fade"
      id="usernameInput"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Welcome</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form">
              <div class="form-group">
                <label for="username-input">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username-input"
                  name="username"
                  placeholder="Enter your name"
                />
                <small class="form-text text-muted small-hint mt-2 ml-3"></small>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn-username-input-save btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 載入 socket
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default {
  data() {
    return {
      message: ""
    };
  },
  props: {},
  created() {
    this.connectSocket();
  },
  methods: {
    connectSocket() {
      // 事件：連結
      socket.on("connect", function() {
        console.log("websocket connected");
      });
    },
    handleSubmit() {
      const data = {
        username: this.$store.state.currentUser.name,
        message: this.message,
        email: this.$store.state.currentUser.email,
        roomuuid: this.$store.state.currentRoom.roomuuid
      };
      // socket.emit;
      socket.emit("client chat", data);
      // clear input
      this.message = "";
    }
  }
};
</script>