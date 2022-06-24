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
          <BCol cols="2">
            <BButton
              variant="secondary"
              class="btn-sm form-control mt-25 p-50"
              @click="handleEmpty"
              style="width: 40px"
            >
              <FeatherIcon icon="XIcon" size="22" />
            </BButton>
          </BCol>
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
        :items="items"
        class="text-center"
      >
        <template #cell(photo)>
          <b-avatar
            v-if="items.photo"
            :src="items.photo"
            rounded
            class="main_image"
          />
          <b-avatar v-else rounded class="main_image" />
        </template>
        <template #cell(actions)>
          <div>
            <BButton class="p-50 mr-1" variant="warning">
              <feather-icon icon="EditIcon"></feather-icon>
            </BButton>
            <BButton class="p-50" variant="danger">
              <feather-icon icon="XIcon"></feather-icon>
            </BButton>
          </div>
        </template>
      </BTable>
      <div class="d-flex justify-content-between flex-wrap">
        <div class="d-flex align-items-center mb-0 mt-1">
          <span class="text-nowrap">Показать от 1 до</span>
          <BFormSelect
          
            v-model="filterData.page_size"
            @input="fetchData"
            :options="['1', '10', '20', '30']"
            class="mx-1"
          />
          <span class="text-nowrap"> строк </span>
          <!-- из {{ props.total }} -->
        </div>
        <div>
          <BPagination
            v-model="filterData.page"
            :total-rows="items.length"
            :per-page="filterData.page_size"
            first-number
            last-number
            align="right"
            prev-class="prev-item"
            next-class="next-item"
            class="mt-1 mb-0"
            @input="fetchData"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </BPagination>
        </div>
      </div>
    </BCard>

    <AddShopName />
  </div>
</template>

<script>
import AddShopName from './components/AddShopName.vue';
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
          key: 'photo',
          label: 'Фото',
        },
        {
          key: 'type',
          label: 'Тип',
          sortable: true,
        },
        {
          key: 'title',
          label: 'Название',
          sortable: true,
        },
        {
          key: 'district',
          label: 'Район',
        },
        {
          key: 'adress',
          label: 'Адрес',
        },
        
        {
          key: 'phone',
          label: 'Телефоны',
          sortable: true,
        },
        {
          key: 'working_hours',
          label: 'Время работы',
          sortable: true,
        },

        {
          key: 'actions',
          label: 'Действия',
        },
      ],
      items: [
        {
          photo: 'Фото 1',
          title: 'Название 1',
          district: 'Алмазарский район',
          adress: 'фывфывфывфв123',
          type: 'С кешбэком',
          phone: '+998973444444',
          working_hours: '24/7',

          actions: '',
        },
        {
          photo: 'Фото 2',
          title: 'Название 2',
          district: 'Бектемирский район',
          adress: 'фывфывфывфв123',
          type: 'Без кешбэка',
          phone: '+998973444444',
          working_hours: '24/5',

          actions: '',
        },
        {
          photo: 'Фото 3',
          title: 'Название 3',
          district: 'Мирабадский район',
          adress: 'фывфывфывфв123',
          type: 'С кешбэком',
          phone: '+998973444444',
          working_hours: '24/7',

          actions: '',
        },
        {
          photo: 'Фото 4',
          title: 'Название 4',
          district: 'Сергелийский район',
          adress: 'фывфывфывфв123',
          type: 'Без кешбэка',
          phone: '+998973444444',
          working_hours: '24/6',

          actions: '',
        },
      ],
    };
  },
  methods: {
    handleEmpty() {
      (this.filterData.search = ''), (this.selected = null), true;
    },
    fetchData() {
      let { search, page, page_size } = this.filterData;
      let req = { search, page, page_size };
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
