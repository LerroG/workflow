<template>
<div>
  <VueFileAgent
    ref="vueFileAgent"
    :theme="'grid'"
    :multiple="true"
    :deletable="true"
    :meta="false"
    :accept="'image/*,'"
    :maxSize="'10MB'"
    :maxFiles="14"
    :helpText="'Выбрать файл'"
    :errorText="{
      type: 'Неверный тип файла. Разрешены только изображения',
      size: 'Размер файлов не должен превышать 10 МБ.',
    }"
    @select="filesSelected($event)"
    @beforedelete="onBeforeDelete($event)"
    @delete="fileDeleted($event)"
    v-model="fileRecords"
  ></VueFileAgent>
  <!-- <button :disabled="!fileRecordsForUpload.length" @click="uploadFiles()">
    Upload {{ fileRecordsForUpload.length }} files
  </button> -->
</div>
</template>

<script>
import VueFileAgentStyles from 'vue-file-agent/dist/vue-file-agent.css'
export default {
data: function () {
      return {
        fileRecords: [],
        uploadUrl: 'https://www.mocky.io/v2/5d4fb20b3000005c111099e3',
        uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
        fileRecordsForUpload: [], // maintain an upload queue
      };
    },
    methods: {
      // uploadFiles: function () {
      //   // Using the default uploader. You may use another uploader instead.
      //   this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload);
      //   this.fileRecordsForUpload = [];
      // },
      deleteUploadedFile: function (fileRecord) {
        // Using the default uploader. You may use another uploader instead.
        this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
      },
      filesSelected: function (fileRecordsNewlySelected) {
        var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
        this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
      },
      onBeforeDelete: function (fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
          this.fileRecordsForUpload.splice(i, 1);
          var k = this.fileRecords.indexOf(fileRecord);
          if (k !== -1) this.fileRecords.splice(k, 1);
        } else {
          if (confirm('Are you sure you want to delete?')) {
            this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
          }
        }
      },
      fileDeleted: function (fileRecord) {
        var i = this.fileRecordsForUpload.indexOf(fileRecord);
        if (i !== -1) {
          this.fileRecordsForUpload.splice(i, 1);
        } else {
          this.deleteUploadedFile(fileRecord);
        }
      },
    },
}
</script>

<style>

</style>