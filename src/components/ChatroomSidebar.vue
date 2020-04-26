<template>
  <div class="col col-12 col-md-3" id="roomlist-sidebar" data-useruuid>
    <h3 class="mt-2">{{nspData.name}}</h3>
    <h5 class="mt-2" id="room-list">Room List :</h5>
    <template v-if="roomData.length > 0">
      <router-link
        v-for="(room, index) in roomData"
        :key="index"
        :to="{name:'chatroom',params:{roomuuid:room.uuid}}"
        class="btn btn-outline-info btn-block my-2"
        :data-uuid="room.uuid"
      >
        {{room.name}}
        ( {{room.usersCount}} )
      </router-link>
    </template>
    <template v-else>
      <h6 class="mt-4">尚未建立任何聊天室</h6>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    roomData: {
      type: Array,
      required: true
    },
    nspData: {
      type: Object,
      required: true
    }
  }
};
</script>