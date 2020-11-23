<template>
  <div>
    <!-- Two-way Data-Binding -->
    <codemirror v-model="code" :options="cmOptions" />

    <!-- Or manually control the data synchronization -->
    <v-btn @click="runCode" color="success">Run</v-btn>
    <div>{{code}}</div>
  </div>
</template>

<script>
// import language js

require("hackerearth-node");
import "codemirror/mode/javascript/javascript.js";
// import theme style
import "codemirror/theme/base16-dark.css";

// import more 'codemirror/some-resource...'

export default {
  data() {
    return {
      output: "",
      code: "const a = 10",
      cmOptions: {
        tabSize: 4,
        mode: "text/python",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,
        // more CodeMirror options...
      },
    };
  },
  methods: {
    onCmReady(cm) {
      console.log("the editor is readied!", cm);
    },
    onCmFocus(cm) {
      console.log("the editor is focused!", cm);
    },
    onCmCodeChange(newCode) {
      console.log("this is new code", newCode);
      this.code = newCode;
    },
    runCode() {
      var hackerEarth = new hackerEarth(
        "008760e397eca3fef6c1cfec19b851fd85244d1e"
      );
      var config = {};
      config.time_limit = 1;
      config.memory_limit = 323244;
      config.source = this.code;
      config.input = "";
      config.language = "Py";
      hackerEarth.compile(config, function (err, response) {
        if (err) {
          console.log(err);
        } else {
          console.log(response);
        }
      });
    },
  },
  computed: {
    // codemirror() {
    //   return this.$refs.cmEditor.codemirror
    // }
  },
  mounted() {
    console.log("the current CodeMirror instance object:", this.codemirror);
    // you can use this.codemirror to do something...
  },
};
</script>