<template>
  <div>
    <BCard>
      <BForm @submit.prevent>
        <BRow class="d-flex justify-content-between mt-3" cols="12" xl="12">
          <BCol cols="12" md="12" xl="6">
            <div>
              <MainPhotoUpload />
            </div>
          </BCol>

          <BCol xl="6">
            <BRow>
              <BCol>
                <BFormGroup label="Тип:">
                  <v-select
                    v-model="selected"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                    :options="option"
                  />
                </BFormGroup>
              </BCol>
              <BCol class="d-flex justify-content-center" cols="4">
                <BFormGroup>
                  <label  style="font-size: 14px">Локация:</label><br/>
                  <!-- <ValidationProvider

                    #default="{ errors }"
                    name='"Локация"'
                    rules="required"
                  >
                    <BFormInput
                      v-model="formData.location"
                      placeholder="Локация"
                      
                    />

                    <small class="text-danger">{{ errors[0] }}</small>
                  </ValidationProvider> -->

                  <BButton
                  style="width: 70px"
            v-b-modal.modal-location
            variant="success"
            
            ><feather-icon icon="MapPinIcon" size="16" />
          </BButton>
                </BFormGroup>
              </BCol>
            </BRow>
            <BRow>
              <BCol>
                <BFormGroup label="Название:">
                  <ValidationProvider
                    #default="{ errors }"
                    name='"Название"'
                    rules="required"
                  >
                    <BFormInput
                      size="lg"
                      placeholder="Название"
                      v-model="formData.title"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </BFormGroup>
              </BCol>
            </BRow>
            <BRow>
              <BCol>
                <BFormGroup label="Район:">
                  <v-select
                    v-model="selected1"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="title"
                    :options="option1"
                  />
                </BFormGroup>
              </BCol>
            </BRow>
            <BRow>
            <BCol>
              <BFormGroup label="Адрес:">
                <ValidationProvider
                    #default="{ errors }"
                    name='"Адрес"'
                    rules="required"
                  >
                <BFormTextarea
                v-model="formData.adress"
                  id="textarea-default"
                  placeholder="Адрес"
                  rows="3"
                />
<small class="text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
              </BFormGroup>
            </BCol>
            </BRow>

            <BRow>
              <BCol>
                <BFormGroup label="График работы:">
                  <ValidationProvider
                    #default="{ errors }"
                    name='"График работы"'
                    rules="required"
                  >
                    <BFormInput
                      placeholder="График работы"
                      v-model="formData.firstName"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </BFormGroup>
              </BCol>
            </BRow>
            <BRow>
              <BCol>
                <BFormGroup
                  label="Номер телефона:"
                  v-for="(item, index) in phoneNumbers"
                  :key="index"
                >
                  <ValidationProvider
                    #default="{ errors }"
                    name='"Номер телефона"'
                    rules="required"
                  >
                    <BFormInput
                      v-model="item.phoneNumber"
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

        <!-- </BRow>
          </BCol> -->
        <!-- </BRow> -->
        <BRow class="mt-3">
          <BCol class="d-flex justify-content-start">
            <SecondaryPhoto />
          </BCol>
        </BRow>
      </BForm>
      <BRow class="mt-4">
        <BCol class="d-flex justify-content-end" col>
          <BButton variant="outline-danger" class="btn_hover_delete"
            >Отменить
          </BButton>

          <BButton
            type="submit"
            variant="outline-primary"
            class="ml-1 btn_hover"
            >Отправить
          </BButton>
        </BCol>
      </BRow>
      <LocationModal />
    </BCard>
  </div>
</template>

<script>
import { required, email } from '@validations';
import MainPhotoUpload from './components/MainPhotoUpload.vue';
import SecondaryPhoto from './components/SecondaryPhoto.vue';
import LocationModal from './components/LocationModal.vue';
import vSelect from 'vue-select';

import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BButton,
  BForm,
  BFormTextarea,
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
    BForm,
    BFormTextarea,
    vSelect,
    MainPhotoUpload,
    SecondaryPhoto,
    LocationModal,
  },
  data() {
    return {
      required,
      email,
      selected: null,
      option: [{ title: 'С кешбэком' }, { title: 'Без кешбэка' }],
      selected1: null,
      option1: [
      { title: 'Алмазарский район' }, 
      { title: 'Бектемирский район' },
      { title: 'Мирабадский район' }, 
      { title: 'Мирзо-Улугбекский район' },
      { title: 'Сергелийский район' }, 
      { title: 'Учтепинский район' },
      { title: 'Чиланзарский район' }, 
      { title: 'Шайхантахурский район' },
      { title: 'Юнусабадский район' }, 
      { title: 'Яккасарайский район' },
      { title: 'Янгихаётский район' }, 
      { title: 'Яшнабадский район' },
      ],
      
      formData: {
        title: '',
        firstName: '',
        location: '',
        adress: '',
        addressPass: '',
        nationality: '',

        email: '',
      },
      phoneNumbers: [{ phoneNumber: '' }],
    };
  },
  methods: {
    addRow() {
      let item = {
        phoneNumber: '',
      };
      this.phoneNumbers.push(item);
    },

    deleteRow(item) {
      //  нужно исправить потом
      this.phoneNumbers.splice(this.phoneNumbers.indexOf(item), 1);
    },
   
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.btn_hover {
  transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
}
.btn_hover:hover {
  background: #93a7e8 !important;
  /*#93a7e8 фиолетовый */
  color: white !important;
}
.btn_hover_delete {
  transition: all 0.3s linear;
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
}
.btn_hover_delete:hover {
  background: rgb(255, 85, 85) !important;
  color: white !important;
}
</style>
