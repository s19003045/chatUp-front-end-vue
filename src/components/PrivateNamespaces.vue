<template>
  <div class="col col-12 col-lg-8 mx-auto mb-5">
    <h3 class="my-2">Private Namespace</h3>
    <a
      href="/namespace/253fc304-dfa4-4c06-be78-7c244070b8f9"
      class="btn btn-outline-info btn-lg btn-block my-2"
      role="button"
      data-pathname="/sport"
      data-uuid="253fc304-dfa4-4c06-be78-7c244070b8f9"
    >Mara Star</a>
    <a
      href="/namespace/08afed83-73ae-4e72-938d-db3eb68ec43a"
      class="btn btn-outline-info btn-lg btn-block my-2"
      role="button"
      data-pathname="/music"
      data-uuid="08afed83-73ae-4e72-938d-db3eb68ec43a"
    >My workspace</a>
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