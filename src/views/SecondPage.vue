<template>
  <div>
    <BCard>
      <BRow class="d-flex justify-content-between mt-3" cols="12" xl="12">
        <BCol
          cols="12"
          md="12"
          xl="6"
          class="d-flex justify-content-center mt-2"
        >
          <BRow>
          <BCol>
            <MainPhotoUpload />
            </BCol>
          </BRow>
        </BCol>

        <BCol xl="6">
          <BRow>
            <BCol md>
              <BFormGroup label="Название:">
                <ValidationProvider
                  #default="{ errors }"
                  name='"Название"'
                  rules="required"
                >
                  <BFormInput
                    placeholder="Название"
                    v-model="formData.title"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </BFormGroup>
            </BCol>

            <BCol md>
              <BFormGroup label="Адрес проживания:">
                <ValidationProvider
                  #default="{ errors }"
                  name='"Адрес проживания"'
                  rules="required"
                >
                  <BFormInput
                    placeholder="Адрес проживания"
                    v-model="formData.addressLive"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </BFormGroup>
            </BCol>
            
          </BRow>
          <BRow>
            <BCol md>
              <BFormGroup label="Имя:">
                <ValidationProvider
                  #default="{ errors }"
                  name='"Имя"'
                  rules="required"
                >
                  <BFormInput placeholder="Имя" v-model="formData.firstName" />
                  <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </BFormGroup>
            </BCol>

            
            <BCol md>
              <BFormGroup label="Локация:">
                <ValidationProvider
                  #default="{ errors }"
                  name='"Локация"'
                  rules="required"
                >
                  <BFormInput
                    v-model="formData.location"
                    placeholder="Локация"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </BFormGroup>
            </BCol>
          </BRow>
          <BRow>
          <BCol md="4">
              <BFormGroup label="Тип:">
                <BFormSelect v-model="selected" :options="options" />
              </BFormGroup>
            </BCol>
            <BCol md="6">
              <BFormGroup label="Номер телефона:">
                <ValidationProvider
                  #default="{ errors }"
                  name='"Номер телефона"'
                  rules="required"
                >
                  <BFormInput
                    v-model="formData.phoneNumber"
                    placeholder="Телефон"
                    oninput="this.value =
            this.value.replace(/[^0-9+]/g, '')"
                  />

                  <small class="text-danger">{{ errors[0] }}</small>
                </ValidationProvider>
              </BFormGroup>
            </BCol>
          </BRow>
        </BCol>
      </BRow>
    </BCard>
  </div>
</template>

<script>
import { required, email } from '@validations';
import MainPhotoUpload from './components/MainPhotoUpload.vue';

import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BButton,
} from 'bootstrap-vue';

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BButton,
    MainPhotoUpload
  },
  data() {
    return {
      required,
      email,
      selected: null,
      options: [
        { value: null, text: 'С кешбэком' },
        { value: 'a', text: 'Без кешбэка' },
        // { value: null, text: 'Другое' },
      ],
      formData: {
        title: '',
        firstName: '',
        location: '',
        addressLive: '',
        addressPass: '',
        nationality: '',
        phoneNumber: '',
        email: '',
      },
    };
  },
  methods: {
    addRow() {
      let item = {
        start_date: '',
        end_date: '',
        institution: '',
        specialty: '',
      };
      this.items.push(item);
    },

    deleteRow(item) {
      //  нужно исправить потом
      this.items.splice(this.items.indexOf(item), 1);
    },
  },
};
</script>

<style></style>
