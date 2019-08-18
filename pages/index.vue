<template>
  <v-container fill-height>
    <v-layout align-center justify-center wrap row>
      <v-flex xs10 md8 lg6 class="text-center">
        <p class="display-4">Todo</p>
        <TodoList />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TodoList from '~/components/TodoList.vue'
@Component({
  components: {
    TodoList
  }
})
export default class Index extends Vue {}
</script>
