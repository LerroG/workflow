<template>
  <div>
    <BModal
      id="modal-center"
      centered
      title="Добавить магазин"
      cancel-title="Отмена"
      ok-title="Сохранить"
    >
    <BFormGroup
        label="Введите название"
        label-for="basicInput"
      >
        <BFormInput
          id="basicInput"
          placeholder="Название"
        />
      </BFormGroup>
      
    </BModal>
  </div>
</template>

<script>
import {BModal, BFormGroup,BFormInput} from 'bootstrap-vue'
export default {
  components: {
    BModal,
    BFormGroup,
    BFormInput,
  }

}
</script>

<style>

</style>