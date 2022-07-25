<template>
  <div>
    <BCard>
      <ValidationObserver v-slot="{ handleSubmit }">
        <BForm @submit.prevent="handleSubmit()">
          <BRow class="d-flex justify-content-between mt-3" cols="12" xl="12">
            <BCol cols="12" md="12" xl="6">
              <div>
                <MainPhotoUpload @changeMain="formData.main_photo" />
              </div>
              <BRow class="mt-3 mb-3">
                <BCol class="d-flex justify-content-start">
                  <SecondaryPhoto @changeSecond="formData.second_photo" />
                </BCol>
              </BRow>
            </BCol>

            <BCol xl="6">
              <BRow>
                <BCol>
                  <BFormGroup label="Тип:">
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Тип"'
                      rules="required"
                    >
                      <v-select
                        v-model="formData.type"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        label="title"
                        :options="option"
                      />

                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </BFormGroup>
                </BCol>
                <BCol class="d-flex justify-content-end" cols="2">
                  <BFormGroup>
                    <label style="font-size: 14px">Локация:</label><br />

                    <BButton
                      style="width: 70px"
                      v-b-modal.modal-addlocation
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
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Район"'
                      rules="required"
                    >
                      <v-select
                        v-model="formData.district"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        label="title"
                        :options="option1"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
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
                    <!-- <ValidationProvider
                      #default="{ errors }"
                      name='"График работы"'
                      rules="required"
                    > -->
                    <!-- <BFormInput
                        placeholder="График работы"
                        v-model="formData.working_hours"
                        v-b-modal.modal-workHours
                      /> -->
                    <!-- <BFormTags
                        placeholder=""
                        v-model="formData.working_hours"
                        remove-on-delete
                        
                        
                      >
                      <template v-slot="{ tags, inputAttrs, inputHandlers, tagVariant, removeTag }">
        <b-input-group class="mb-2">
          <b-form-input
            v-bind="inputAttrs"
            v-on="inputHandlers"
            placeholder="New tag - Press enter to add"
            class="form-control"
          ></b-form-input>
          
        </b-input-group>
        <div class="d-inline-block" style="font-size: 1.5rem;">
          <b-form-tag
            v-for="tag in tags"
            @remove="removeTag(tag)"
            :key="tag"
            :title="tag"
            :variant="tagVariant"
            class="mr-1"
          >{{ tag }}</b-form-tag>
        </div>
      </template>
      </BFormTags> -->
                    <b-form-group>
                      {{ formData.working_hours }}
                      <b-form-input
                        v-model="formData.working_hours"
                        id="readOnlyInput"
                        value=""
                        readonly
                      />
                    </b-form-group>
                    <BButton v-b-modal.modal-workHours> Изменить </BButton>
                    <!-- <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider> -->
                  </BFormGroup>
                </BCol>
              </BRow>
              <BRow>
                <BCol>
                  <BFormGroup label="Номер телефона:">
                    <ValidationProvider
                      #default="{ errors }"
                      name='"Номер телефона"'
                      rules="required"
                    >
                      <BFormTags
                        placeholder="Номер телефона"
                        v-model="formData.phoneNumbers"
                        remove-on-delete
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
          <BRow class="mt-4">
            <BCol class="d-flex justify-content-end" col>
              <BButton
                variant="outline-danger"
                class="btn_hover_delete"
                href="/"
                >Отменить
              </BButton>

              <BButton
                type="submit"
                variant="outline-primary"
                class="ml-1 btn_hover"
                @click="submitEdit"
                >Отправить
              </BButton>
            </BCol>
          </BRow>
        </BForm>
        {{ formData.working_hours }}
        <AddLocationModal @submit="(latlng) => (formData.location = latlng)" />
        <WorkingHours
          @workDays="(workDays) => (formData.working_hours = workDays)"
        />
      </ValidationObserver>
    </BCard>
  </div>
</template>

<script>
import { required, email } from '@validations';
import MainPhotoUpload from './components/MainPhotoUpload.vue';
import SecondaryPhoto from './components/SecondaryPhoto.vue';
import AddLocationModal from './components/AddLocationModal.vue';
import WorkingHours from './components/WorkingHours.vue';
import vSelect from 'vue-select';
import { mapActions } from 'vuex';

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
  BFormTags,
  BInputGroup,
  BFormTag,
} from 'bootstrap-vue';
import { formatDate, title } from '@/@core/utils/filter';
import { computed } from 'vue-demi';

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
    BFormTags,
    BInputGroup,
    BFormTag,
    WorkingHours,
    vSelect,
    MainPhotoUpload,
    SecondaryPhoto,
    AddLocationModal,
  },
  data() {
    return {
      required,
      email,
      selected: { title: 'С кешбэком' },
      option: [{ title: 'С кешбэком' }, { title: 'Без кешбэка' }],
      selected1: { title: 'Алмазарский район' },
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
        working_hours: [],
        location: {},
        adress: '',
        phoneNumbers: [],
        district: '',
        type: '',
        main_photo: {},
        second_photo: [],
      },
      
      // phoneNumbers: [{ phoneNumber: '' }],
    };
    
  },
  
  methods: {
    ...mapActions('shopList', ['EDIT_SHOP_LIST']),

    async submitEdit() {
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
      // this.EDIT_SHOP_LIST(req)
      // .then(() => {
      // console.log("OK")
      // })
      // .catch((err) => {
      // console.log("NO")
      // })
    },

    // log(v) {
    //   console.log(v);
    // },
    // addRow() {
    //   let item = {
    //     phoneNumber: '',
    //   };
    //   this.phoneNumbers.push(item);
    // },
    // deleteRow(item) {
    //   //  нужно исправить потом
    //   this.phoneNumbers.splice(this.phoneNumbers.indexOf(item), 1);
    // },
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
#main_img {
  display: flex;
  height: 40vh;
}
</style>
