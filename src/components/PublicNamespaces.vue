<template>
  <div class="col col-12 col-lg-8 mx-auto mb-3">
    <h3 class="my-2">Public Namespace</h3>
    <a
      href="/namespace/253fc304-dfa4-4c06-be78-7c244070b8f9"
      class="btn btn-outline-info btn-lg btn-block my-2"
      role="button"
      data-pathname="/sport"
      data-uuid="253fc304-dfa4-4c06-be78-7c244070b8f9"
    >Sport</a>
    <a
      href="/namespace/08afed83-73ae-4e72-938d-db3eb68ec43a"
      class="btn btn-outline-info btn-lg btn-block my-2"
      role="button"
      data-pathname="/music"
      data-uuid="08afed83-73ae-4e72-938d-db3eb68ec43a"
    >Music</a>
    <a
      href="/namespace/7ebf1942-8bfe-4bf7-9f13-8b1b7b2aec81"
      class="btn btn-outline-info btn-lg btn-block my-2"
      role="button"
      data-pathname="/alphacamp"
      data-uuid="7ebf1942-8bfe-4bf7-9f13-8b1b7b2aec81"
    >Alpha Camp</a>
    <a
      href="/namespace/3c7583c8-1bd1-4a57-9f3e-d43a561fc41e"
      class="btn btn-outline-info btn-lg btn-block my-2"
      role="button"
      data-pathname="/javascriptgroup"
      data-uuid="3c7583c8-1bd1-4a57-9f3e-d43a561fc41e"
    >Javascript group</a>
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