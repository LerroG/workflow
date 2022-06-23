<template>
  
  <BContainer>
    
    <BImg  rounded fluid :src="dataAvatar" thumbnail/>
<BRow class="d-flex justify-content-between">
    <BCol>
    <div class=" mt-1 flex-wrap mb-1">
      <BFormFile
        style="width: 70%"
        v-model="profile_picture"
        placeholder="Имя файла"
        browseText="Выбрать"
        @input="fileInput"
      />
    </div>
    </BCol>
       <BCol cols="4"><b-button variant="danger" class="mt-1" @click="clearImage"><feather-icon icon="Trash2Icon" size="16" /></b-button></BCol>
  </BRow>
<!-- <BFormFile
        multiple
        v-model="files"
        placeholder="Имя файла"
        browseText="Выбрать"
        
      />

      <b-button variant="danger" class="mt-1" @click="upload">upload</b-button></BCol> -->
  </BContainer>
</template>

<script>
import {
  BFormGroup,
  BImg,
  BAvatar,
  BFormFile,
  BCol,
  BRow,
  BContainer,
  BButton

} from 'bootstrap-vue';

export default {
  components: {
    BFormGroup,
    BImg,
    BAvatar,
    BFormFile,
    BCol,
    BRow,
    BContainer,
    BButton
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
    clearImage() {
      this.dataAvatar = null;
      this.profile_picture = null;
    },
  },
};
</script>

<style>
thumbnail {
  height: 100;
  width: 100;
}</style>
