<template>
  <div>
    <v-tabs v-model="tab" color="blue" grow>
      <v-tab v-for="component in todos" :key="component.name" style="margin-left:0px">
        {{ component.name }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="component in todos" :key="component.name">
        <v-simple-table>
          <thead>
            <tr>
              <th width="15%">DONE</th>
              <th width="55%">TODO</th>
              <th width="30%">EDIT</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in component.list" :key="todo.id">
              <td>
                <v-checkbox
                  color="primary"
                  @change="changeDoneState(todo, $event)"
                  :input-value="todo.done"
                  class="align-center justify-center"
                />
              </td>
              <td>{{ todo.text }}</td>
              <td>
                <v-btn depressed color="primary">編集</v-btn>
                <v-btn depressed color="error">削除</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

@Component
export default class TodoList extends Vue {
  tab: string|null = null;
  list: Todo[] = [
    { id: "1", text: "Renge", done: true },
    { id: "2", text: "Hotaru", done: false },
    { id: "3", text: "Natsumi", done: false },
    { id: "4", text: "Komari", done: true }
  ];
  get todos() {
    return [
      {
        name: "全て",
        list: this.list
      },
      {
        name: "完了済み",
        list: this.list.filter(todo => todo.done)
      },
      {
        name: "未完了",
        list: this.list.filter(todo => !todo.done)
      }
    ];
  }

  changeDoneState(target: Todo, e: boolean) {
    const box = this.list.find(todo => todo.id === target.id);
    if (box) {
      box.done = e;
    }
  }
}
</script>

<style scoped>
th {
  text-align: center !important;
}
</style>
