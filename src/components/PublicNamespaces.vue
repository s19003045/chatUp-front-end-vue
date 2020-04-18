<template>
  <div class="col col-12 col-lg-8 mx-auto mb-3">
    <h3 class="my-2">Public Namespace</h3>
    <div v-for="(publicNamespace,index) in publicNamespaces" :key="index">
      <router-link
        :to="{name:'namespace',params:{namespaceId:publicNamespace.uuid}}"
        class="btn btn-outline-info btn-lg btn-block my-2"
        role="button"
        :data-pathname="publicNamespace.pathname"
        :data-uuid="publicNamespace.uuid"
      >{{publicNamespace.name}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    publicNamespaces: {
      type: Array,
      required: true
    }
  }
};
</script>