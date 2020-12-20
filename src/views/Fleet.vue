
<template>

    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="5">
            <h4 id="title" class="card-title mb-0">Overview</h4>
          </CCol>
        </CRow>
<div style="height: 45vh; width: 100%; margin-top:20px;">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker :key="'t' + index" v-for="(transportable,index) in transportables"
                      :lat-lng="transportable.position.coordinates">
                <l-icon
                        :icon-size="[25,25]"
                        :icon-url="parcel_icon" />
        </l-marker>
      <l-marker :key="'c' + index" v-for="(carrier,index) in carriers"
                      :lat-lng="carrier.position.coordinates">
                <l-icon
                        :icon-size="[25,25]"
                        :icon-url="truck_icon" />
        </l-marker>
    </l-map>
  </div>
      </CCardBody>
    </CCard>

</template>

<script>
import axios from 'axios';
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
import truck from '../assets/truck.png';
import parcel from '../assets/parcel.png';

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  data() {
    return {
      zoom: 11,
      center: latLng(48.143743, 11.575942),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      currentZoom: 11,
      currentCenter: latLng(48.143743, 11.575942),
      mapOptions: {
        zoomSnap: 0.5
      },
      truck_icon: truck,
      parcel_icon: parcel,
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
