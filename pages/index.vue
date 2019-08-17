<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 md8 lg4 class="text-center">
        <span class="display-4">Todo</span>      
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Index extends Vue {}
</script>
