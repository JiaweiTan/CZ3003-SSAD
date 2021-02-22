<template>
  <!-- give the sidebar z-50 class so its higher than the navbar if you want to see the logo -->
  <!-- you will need to add a little "X" button next to the logo in order to close it though -->
  <div
    class="w-1/2 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-gray-100 border-r z-30"
    :class="sideBarOpen ? '' : 'hidden'"
    id="main-nav"
  >
    <div class="w-full h-20 border-b flex px-4 items-center mb-4">
      <p class="font-semibold text-3xl text-blue-400 pl-4">SSAD-Admin</p>
    </div>

    <div class="mb-4 px-4">
      <p class="pl-4 text-l text-blue-600 font-semibold lg:mb-0">
        Good afternoon, Joe!
      </p>
      <p class="mt-4 pl-4 text-sm font-semibold mb-1">Main</p>

      <!-- Start of Home Tab -->
      <router-link to="/dashboard/home">
        <div
          class="w-full flex items-center text-blue-400 h-10 pl-4 m-2 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <svg class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
            />
          </svg>
          <span class="text-gray-700"> Dashboard</span>
        </div>
      </router-link>
      <!-- End of Home Tab -->

      <!-- Start of Course Tab -->
      <router-link to="/dashboard/course">
        <div
          class="w-full flex items-center text-blue-400 h-10 pl-4 m-2 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <svg class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            />
          </svg>
          <span class="text-gray-700">Course</span>
        </div>
      </router-link>
      <!-- End of Course Tab -->

      <!-- Start of Topic Tab -->
      <router-link to="/dashboard/topic">
        <div
          class="w-full flex items-center text-blue-400 h-10 pl-4 m-2 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <svg class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
            />
            <path
              d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
            />
          </svg>
          <span class="text-gray-700">Topic</span>
        </div>
      </router-link>
      <!-- End of Topic Tab -->

      <!-- Start of Question Tab -->
      <router-link to="/dashboard/question">
        <div
          class="w-full flex items-center text-blue-400 h-10 pl-4 m-2 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <svg class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-gray-700">Question</span>
        </div>
      </router-link>
      <!-- End of Question Tab -->

      <!-- Start of Quiz Tab -->
      <router-link to="/dashboard/quiz">
        <div
          class="w-full flex items-center text-blue-400 h-10 pl-4 m-2 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <svg class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-gray-700">Quiz</span>
        </div>
      </router-link>
      <!-- End of Quiz Tab -->

      <!-- Start of Attempt Tab -->
      <router-link to="/dashboard/attempt">
        <div
          class="w-full flex items-center text-blue-400 h-10 pl-4 m-2 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <svg class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-gray-700">Attempt</span>
        </div>
      </router-link>
      <!-- End of Attempt Tab -->

      <!-- Start of User Tab -->
      <router-link to="/dashboard/user">
        <div
          class="w-full flex items-center text-blue-400 h-10 pl-4 m-2 hover:bg-gray-200 rounded-lg cursor-pointer"
        >
          <svg class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
            />
          </svg>
          <span class="text-gray-700">User</span>
        </div>
      </router-link>
      <!-- End of User Tab -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapState(["sideBarOpen"]),
  },
};
</script>