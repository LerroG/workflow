<template>
  <div>
    <BAvatar :src="dataAvatar" rounded style="width: 100%" />

    <div class="d-flex mt-1 flex-wrap mb-1">
      <BFormFile
        style="width: 100%"
        v-model="profile_picture"
        placeholder="Имя файла"
        browseText="Выбрать"
        @input="fileInput"
      />
    </div>
  </div>
</template>

<script>
import {
  BFormGroup,
  BImg,
  BAvatar,
  BFormFile,
  BCol,
  BRow,
} from 'bootstrap-vue';

export default {
  components: {
    BFormGroup,
    BImg,
    BAvatar,
    BFormFile,
    BCol,
    BRow,
  },
  data() {
    return {
      dataAvatar: '',
      profile_picture: null,
    };
  },
  methods: {
    fileInput(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => (this.dataAvatar = reader.result);
    },
  },
};
</script>

<style></style>
