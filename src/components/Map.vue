
<template>

<div style="height: 500px; width: 100%">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 80%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      ref="myMap"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :key="index" v-for="(carrier,index) in carriers"
                      :lat-lng="carrier.position.coordinates"
            >

<!--
                <l-icon
                        :icon-size="[10,10]"
                        :icon-url="icon" /> -->
            </l-marker>
    </l-map>
  </div>

</template>

<script>
import axios from 'axios';
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,

  },
  data() {
    return {
      zoom: 11,
      center: latLng(48.143743, 11.575942),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11,
      currentCenter: latLng(48.143743, 11.575942),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true,
      transportables: [],
      carriers: []
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    }
  },
  mounted: function () {
            axios.get('http://localhost:8000/transportables').then(t => {
                this.transportables = t.data.results
                    .map(r => {
                        r.iconSize = this.normalIcon;
                        return r;
                    });
            }),
            axios.get('http://localhost:8000/carriers').then(c => {
              this.carriers = c.data.results
                  .map(c => {
                    return c;
                  });
            })
        },
};
</script>

<style>

</style>
