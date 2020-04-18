<template>
  <div class="col col-12 col-lg-8 mx-auto mb-3">
    <h3 class="my-2">Private Namespace</h3>
    <div v-for="(privateNamespace,index) in privateNamespaces" :key="index">
      <router-link
        :to="{name:'namespace',params:{namespaceId:privateNamespace.uuid}}"
        class="btn btn-outline-info btn-lg btn-block my-2"
        role="button"
        :data-pathname="privateNamespace.pathname"
        :data-uuid="privateNamespace.uuid"
      >{{privateNamespace.name}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    privateNamespaces: {
      type: Array,
      required: true
    }
  }
};
</script>