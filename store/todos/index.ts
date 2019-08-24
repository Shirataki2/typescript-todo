import uuid from 'uuid/v4'
import { LocalContext } from 'vuex'

type Context = LocalContext['todos']
type State = { list: Todo[] }
export type Todo = { id: string; done: boolean; text: string }

export const state = (): State => ({ list: [] })

export const getters = {
  getAllList(state: State) {
    return state.list
  },
  getDoneList(state: State) {
    return state.list.filter((todo) => todo.done)
  },
  getNotDoneList(state: State) {
    return state.list.filter((todo) => !todo.done)
  }
}

export const mutations = {
  changeDoneState(
    state: State,
    payload: { id: string, done: boolean }
  ) {
    state.list.find((todo) => todo.id === payload.id)!.done = payload.done
  },
  add(
    state: State,
    payload: { text: string }
  ) {
    state.list.push({
      id: uuid(),
      text: payload.text,
      done: false
    })
  },
  remove(
    state: State,
    payload: { id: string }
  ) {
    state.list = state.list.filter((todo) => todo.id !== payload.id)
  },
  update(
    state: State,
    payload: Todo
  ) {
    const index = state.list.findIndex((todo) => todo.id === payload.id)
    state.list[index].text = payload.text
    state.list[index].done = payload.done
  }
}

export const actions = {
  changeDoneState(ctx: Context, payload: { id: string, done: boolean }) {
    ctx.commit('changeDoneState', payload)
  },
  add(ctx: Context, payload: { text: string }) {
    ctx.commit('add', payload)
  },
  remove(ctx: Context, payload: { id: string }) {
    ctx.commit('remove', payload)
  },
  update(ctx: Context, payload: Todo) {
    ctx.commit('update', payload)
  }
}
