<template>
  <div>
    <v-text-field
      label="Add New Todo"
      v-model="newTodo"
      solo
      @keypress.enter="add"
    />
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
              <td>
                <template v-if="menu === todo.id">
                  <v-text-field
                    v-model="editTodo"
                    @keypress.enter="update(todo)"
                  />
                </template>
                <template v-else>
                  {{ todo.text }}
                </template>
              </td>
              <td>
                <v-btn
                  depressed
                  color="primary"
                  @click="edit(todo)"
                >
                  編集
                </v-btn>
                <v-btn
                  depressed
                  color="error"
                  @click="remove(todo)"
                >
                  削除
                </v-btn>
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
  tab: string|null = null
  menu: string|null = null
  newTodo: string = ''
  editTodo: string = ''

  get todos() {
    return [
      {
        name: "全て",
        list: this.$store.getters['todos/getAllList']
      },
      {
        name: "完了済み",
        list: this.$store.getters['todos/getDoneList']
      },
      {
        name: "未完了",
        list: this.$store.getters['todos/getNotDoneList']
      }
    ];
  }

  changeDoneState(target: Todo, e: boolean) {
    this.$store.dispatch('todos/changeDoneState', {
      id: target.id,
      done: e
    })
  }

  add() {
    if (this.newTodo === '') return
    this.$store.dispatch('todos/add', {
      text: this.newTodo
    })
    this.newTodo = ''
  }

  remove(target: Todo) {
    this.$store.dispatch('todos/remove', { id: target.id })
  }

  edit(target: Todo) {
    this.menu = target.id
    this.editTodo = target.text
  }

  update(target: Todo) {
    this.$store.dispatch('todos/update', {
      id: target.id,
      text: this.editTodo,
      done: target.done
    })
    this.editTodo = ''
    this.menu = null
  }
}
</script>

<style scoped>
th {
  text-align: center !important;
}
</style>
