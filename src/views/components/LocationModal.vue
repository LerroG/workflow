<template>
  <div>
    <BModal
    id="modal-location"
    @shown="reloadMap()"
    no-close-on-backdrop
    size="lg"
    >
     <div style="height: 60vh; width: 10wh"> 
    <l-map
      ref="map" v-resize="onResize"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
    </l-map>
     </div>
     
      </BModal>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';




import {
  BModal,
  BContainer,
} from 'bootstrap-vue';

export default {
components: {
  BModal,
  LMap,
    LTileLayer,
    LMarker,
    BContainer,
},
name: 'MapComponent',
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    
      zoom: 11,
      center: [41.2646500, 69.2162700],
      bounds: null
    };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    reloadMap: function () {
      this.$refs.map.mapObject.invalidateSize()
    }
  },
  // mounted() {
  //       this.$refs.map.mapObject._onResize();
  //   }
  
}

</script>

<style>

</style>