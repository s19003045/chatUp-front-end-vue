<template>
  <div class="row">
    <PublicNamespaces :public-namespaces="publicNamespaces" />
    <PrivateNamespaces :private-namespaces="privateNamespaces" />
  </div>
</template>

<script>
// 測試假資料
const publicNamespaces = [
  {
    uuid: 11111111111111,
    name: "Sport",
    pathname: "/sport",
    rooms: [11111, 22222, 33333],
    publicForSearch: true,
    created_date: Date.now()
  },
  {
    uuid: 22222222222222,
    name: "Music",
    pathname: "/music",
    rooms: [11111, 22222, 33333],
    publicForSearch: true,
    created_date: Date.now()
  },
  {
    uuid: 3333333333333333,
    name: "Alpha Camp",
    pathname: "/alpha-camp",
    rooms: [11111, 22222, 33333],
    publicForSearch: true,
    created_date: Date.now()
  }
];
const privateNamespaces = [];

// 載入 components
import PublicNamespaces from "../components/PublicNamespaces";
import PrivateNamespaces from "../components/PrivateNamespaces";
// 載入 apis

// 載入 utils

export default {
  components: {
    PublicNamespaces,
    PrivateNamespaces
  },
  data() {
    return {
      publicNamespaces: [],
      privateNamespaces: []
    };
  },
  created() {
    this.fetchNamespaces();
  },
  methods: {
    fetchNamespaces() {
      this.publicNamespaces = publicNamespaces;
      this.privateNamespaces = privateNamespaces;
    }
  }
};
</script>