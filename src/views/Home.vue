<template>
  <div>
    <BCard>
      <BRow class="d-flex justify-content-between align-items-center">
        <BCol class="d-flex justify-content-left align-items-center" cols="6">
          <BCol>
            <BFormGroup label="Название:" label-for="basicInput">
              <BFormInput
                id="basicInput"
                v-model="filterData.search"
                placeholder="Введите название"
              />
            </BFormGroup>
          </BCol>
          <BCol>
            <BFormGroup label="Тип:" label-for="basicInput">
              <v-select
                v-model="selected"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="option"
              />
            </BFormGroup>
          </BCol>
          <!-- <BCol cols="2">
            <BButton
              variant="secondary"
              class="btn-sm form-control mt-25 p-50"
              @click="handleEmpty"
              style="width: 40px"
            >
              <FeatherIcon icon="XIcon" size="22" />
            </BButton>
          </BCol> -->
        </BCol>

        <BCol :cols="3" class="d-flex justify-content-end mt-25">
          <BButton variant="success" v-b-modal.modal-center> Добавить </BButton>
        </BCol>
      </BRow>
    </BCard>

    <BCard>
      <BTable
        bordered
        responsive
        :fields="fields"
        :items="shoplist_two"
        class="text-center"
      >
        <template #cell(main_image)>
          <b-avatar
            v-if="shoplist_two.main_image"
            :src="shoplist_two.main_image"
            rounded
            class="main_image"
          />
          <b-avatar v-else rounded class="main_image" />
        </template>
        <template #cell(actions)="props">
          <div>
            <BButton
              class="p-50 mr-1"
              variant="warning"
              @click="editData(props.item)"
            >
              <feather-icon icon="EditIcon"></feather-icon>
            </BButton>
            <BButton
              class="p-50"
              variant="danger"
              @click="deleteData(props.item)"
            >
              <feather-icon icon="XIcon"></feather-icon>
            </BButton>
          </div>
        </template>
        <!-- <template #cell(location)>
          <div>
            <BButton class="p-50 mr-1" variant="success" v-b-modal.modal-location>
              <feather-icon icon="MapPinIcon"></feather-icon>
            </BButton>
            
          </div>
        </template> -->
      </BTable>
    </BCard>

    <AddShopName />
    <LocationModal />
    <!-- :marker = "location" -->
  </div>
</template>

<script>
import AddShopName from './components/AddShopName.vue';
import LocationModal from './components/LocationModal.vue';
import { mapActions, mapState } from 'vuex';

import vSelect from 'vue-select';

import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BButton,
  BTable,
  BPagination,
  BAvatar,
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
    BTable,
    BPagination,
    BAvatar,
    vSelect,
    AddShopName,
    LocationModal,
  },
  data() {
    return {
      selected: null,
      option: [{ title: 'С кешбэком' }, { title: 'Без кешбэка' }],
      filterData: {
        search: '',
        page: 1,
        page_size: 10,
      },
      fields: [
        {
          // key: 'main_photo',
          key: 'main_image',
          label: 'Фото',
        },
        {
          // key: 'type',
          key: 'shop_type',
          label: 'Тип',
          sortable: true,
        },
        {
          // key: 'title',
          key: 'shop_name',
          label: 'Название',
          sortable: true,
        },
        {
          key: 'district',
          label: 'Район',
        },
        // {
        // key: 'adress',
        // label: 'Адрес',
        // },
        // {
        //   key: 'location',
        //   label: 'Локация',
        // },

        {
          // key: 'phoneNumbers',
          key: 'phone_number',
          label: 'Телефоны',
          sortable: true,
        },
        {
          // key: 'working_hours',
          key: 'work_schedule',
          label: 'Время работы',
          sortable: true,
        },

        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      // items: [
      //   {
      //     main_photo: 'Фото 1',
      //     title: 'Название 1',
      //     district: 'Алмазарский район',
      //     adress: 'фывфывфывфв123',
      //     location: '',
      //     type: 'С кешбэком',
      //     phoneNumbers: '+998973444444',
      //     working_hours: '24/7',

      //     actions: '',
      //   },
      //   {
      //     main_photo: 'Фото 2',
      //     title: 'Название 2',
      //     district: 'Бектемирский район',
      //     adress: 'фывфывфывфв123',
      //     location: '',
      //     type: 'Без кешбэка',
      //     phoneNumbers: '+998973444444',
      //     working_hours: '24/5',

      //     actions: '',
      //   },
      //   {
      //     main_photo: 'Фото 3',
      //     title: 'Название 3',
      //     district: 'Мирабадский район',
      //     adress: 'фывфывфывфв123',
      //     location: '',
      //     type: 'С кешбэком',
      //     phoneNumbers: '+998973444444',
      //     working_hours: '24/7',

      //     actions: '',
      //   },
      //   {
      //     main_photo: 'Фото 4',
      //     title: 'Название 4',
      //     district: 'Сергелийский район',
      //     adress: 'фывфывфывфв123',
      //     location: '',
      //     type: 'Без кешбэка',
      //     phoneNumbers: '+998973444444',
      //     working_hours: '24/6',

      //     actions: '',
      //   },
      // ],
    };
  },
  computed: {
    ...mapState('shopList', ['shoplist_two']),
  },
  mounted() {
    this.FETCH_SHOP_LIST_TWO();
  },
  methods: {
    ...mapActions('shopList', ['FETCH_SHOP_LIST_TWO']),
    // ...mapActions ("shopList", [
    //    "EDIT_SHOP_LIST",
    //    "DELETE_SHOP_LIST",
    // ])
    // handleEmpty() {
    //   (this.filterData.search = ''), (this.selected = null), true;
    // },
    // fetchData() {
    //   let { search, page, page_size } = this.filterData;
    //   let req = { search, page, page_size };
    // },
    editData(id) {
      this.$router.push(`/second-page/${id}`);
    },
    deleteData(item) {
      this.$bvModal
        .msgBoxConfirm('Вы действительно хотите удалить эту запись?', {
          title: 'Удалить',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'Подтвердить',
          cancelTitle: 'Отменить',
          hideHeaderClose: false,
          centered: true,
        })
        .then((accept) => {
          if (accept) {
            let req = { id: item.id };
            return this.DELETE_DEPARTMENT_LIST(req);
          }
        })
        .then(() => {
          // this.$_okToast();
          // this.fetchData();
          console.log('Удалено');
        })
        .catch(() => {
          // this.$_errorToast();
          console.log('Неудача');
        });
    },
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
.main_image {
  height: 65px;
  width: 100px;
}
</style>
