<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="my-5" flat :loading="loading">
          <template slot="progress">
            <v-progress-linear color="success" />
          </template>
          <v-list two-line>
            <v-list-item v-for="item in tasks" :key="item.id">
              <v-list-item-content class="pointer" @click="editTask(item.id, item.title.rendered, item.content.rendered)">
                <v-list-item-title v-text="item.title.rendered" />
                <v-list-item-subtitle class="font-italic" v-html="item.content.rendered" />
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="remove(item.id)">
                  <v-icon color="error">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
        <v-sheet color="transparent" class="text-center">
          <v-btn color="success" fab elevation="0" @click="isDialog = true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
    <v-dialog v-model="isDialog" max-width="400">
      <v-card>
        <v-card-title class="justify-center">
          Create task
        </v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="editMode ?
            update({
              title: currentTask.title,
              content: currentTask.content,
              status: 'publish'
            }) :
            create({
              title: currentTask.title,
              content: currentTask.content,
              status: 'publish'
            })"
          >
            <v-text-field color="success" v-model="currentTask.title" label="Add title" outlined dense />
            <v-textarea color="success" v-model="currentTask.content" label="Add description" outlined dense />
            <v-btn
              color="grey lighten-3"
              class="mr-2"
              elevation="0"
              @click="closeDialog"
            >
              Cancel
            </v-btn>
            <v-btn
              type="submit"
              color="success"
              elevation="0"
              :disabled="!currentTask.title"
            >
              {{ editMode ? 'Update' : 'Add' }}
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SiteHome',
  data: () => ({
    isDialog: false,
    editMode: false,
    currentTask: {
      id: null,
      title: '',
      content: ''
    }
  }),
  computed: {
    ...mapState(['loading', 'tasks'])
  },
  methods: {
    ...mapActions(['getTasks', 'createTask', 'updateTask', 'deleteTask']),
    async create (payload) {
      await this.createTask(payload)
      this.closeDialog()
    },
    async update (payload) {
      await this.updateTask({ id: this.currentTask.id, payload })
      this.closeDialog()
    },
    async remove (id) {
      await this.deleteTask(id)
      this.closeDialog()
    },
    editTask (id, title, content) {
      this.isDialog = true
      this.editMode = true
      this.currentTask.id = id
      this.currentTask.title = title
      this.currentTask.content = content
    },
    closeDialog () {
      this.isDialog = false
      this.editMode = false
      this.currentTask.id = null
      this.currentTask.title = ''
      this.currentTask.content = ''
    }
  },
  async mounted () {
    await this.getTasks()
  }
}
</script>
<style lang="scss">
.v-application p { margin-bottom: 0; }
.pointer { cursor: pointer; }
</style>
