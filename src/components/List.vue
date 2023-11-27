<script>
import FlatFilter from './FlatFilter.vue'
import FlatList from './FlatList.vue'
import FlatCard from './FlatCard.vue'
import db from '../assets/data/list.json'

export default {
  components: {
    FlatFilter, FlatList, FlatCard,
  },
  data: function () {
    return {
      filter: {
        corpus: [1,2],
        rooms: [1,2,3],
        price: {
            startMin: 5000000,
            startMax: 15000000,
            step: 100000,
            min: 5000000,
            max: 15000000,
        },
        area: {
            startMin: 34.5,
            startMax: 68,
            step: 0.1,
            min: 34.5,
            max: 68,
        },
        params: ['Две лоджии', 'Окно в санузле', 'Мастер-спальня', 'Планировка евро-формата', 'Гардеробная'],
        isScheme: false,
      },
      listLoading: false,
      listLoadingFailed: false,


      listDB: [],
      flatsPerPage: 6,
      flatsData: [],
      popup: {
        isActive: false,
        flat: {},
      }
    }
  },
  methods: {
    loadList(){
      this.listLoading = true;
      this.listLoadingFailed = false;
      this.listDB = JSON.parse(db);
      this.flatsData = this.listDB.slice(0, 6);
    },
    openPopup(flat){
      this.popup.flat = flat;
      this.popup.isActive = true;
    }
  },
  created(){
    this.loadList();
  }
}
</script>

<template>
  <div class="flats-list">
    <div class="container">
        <FlatFilter :params="filter"></FlatFilter>
        <FlatList :list="flatsData" @open-popup="openPopup"></FlatList>
    </div>
    <FlatCard ref="popup" :popup.sync="popup" v-if="popup.isActive"></FlatCard>
  </div>
</template>

