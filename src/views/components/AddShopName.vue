<template>
  <div>
    <BModal
      id="modal-center"
      centered
      title="Добавить магазин"
      cancel-title="Отмена"
      ok-title="Сохранить"
      @ok.prevent="saveEdit"
    >
    <BFormGroup
        label="Введите название"
        label-for="basicInput"
      >
        <BFormInput
          id="basicInput"
          placeholder="Название"
          v-model="formData.title"
        />
      </BFormGroup>
      
    </BModal>
  </div>
</template>

<script>
import {BModal, BFormGroup,BFormInput} from 'bootstrap-vue'
import {mapActions} from 'vuex'
export default {
  components: {
    BModal,
    BFormGroup,
    BFormInput,
  },
  data() {
    return {
      formData: {
title: '',
      }
    }
  },
  methods: {
    // ...MapActions("shopList", [
    // "ADD_SHOP_LIST", 
    // "EDIT_SHOP_LIST"
    // ])
    async saveEdit() {
      
      // let {
      //   title,
      //   main_image,
      //   second_image,
      //   location,
      //   type,
      //   district,
      //   adress,
      //   working_hours,
      //   phoneNumbers,
      // } = this.formData
      // 
      // let req = {
      //   title,
      //   main_image,
      //   second_image,
      //   location,
      //   type,
      //   district,
      //   adress,
      //   working_hours,
      //   phoneNumbers,
      // }
      // this.ADD_SHOP_LIST(req)
      // .then((id) => {
      // this.$router.push(`/second-page/${id}`); 
      // console.log("OK") 
      // })
      // .catch((err) => {
// console.log("NO")
      // })
    }
  }

}
</script>

<style>

</style>