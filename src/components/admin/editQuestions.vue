<template>
  <div>
    <v-form ref="form" v-if="type === 'Short Question'">
      <v-text-field label="Question Title" v-model="questionTitle" outlined />
      <!-- <v-textarea label="Questiion Description" v-model="questionDescription" outlined="" /> -->
      <quill-editor
        v-model="questionDescription"
        :options="editorOption"
        class="my-3 mb-7 QuillEditor"
        ref="editor"
      />
      <v-text-field
        shaped
        outlined
        v-model="psans"
        label="Enter Possible Short Answers"
        :counter="20"
        append-icon="mdi-plus"
        @keydown.tab.prevent="addpsans"
        required
      ></v-text-field>

      <div class="d-inline" v-for="(pans,i) in psanss" :key="i">
        <v-chip class="ml-1 mb-4">
          {{pans}}
          <span @click="DeleteOption(i)" class="red--text ml-1">&times;</span>
        </v-chip>
      </div>
      <v-text-field type="number" label="Points (min: 1- max: 5)" v-model="Points" outlined />
      <v-btn @click="submit" class="mt-2" color="success" large tile>Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>