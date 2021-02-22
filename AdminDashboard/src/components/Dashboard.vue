<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-col h-screen justify-between">
      <Sidebar />
      <div
        class="w-full bg-gray-100 pl-0 lg:pl-64 h-screen"
        :class="sideBarOpen ? 'overlay' : ''"
      >
        <Navbar />
        <div class="p-6 bg-gray-100 flex-grow">
          <router-view />
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default {
  name: "Dashboard",
  computed: {
    ...mapState(["sideBarOpen"]),
  },
  components: {
    Sidebar,
    Navbar,
    Footer,
  },
};
</script>
