
<template>
<div>
    <CCard>
      <CCardBody>
<div style="height: 45vh; width: 100%;">

    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      ref="map"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />
      <l-marker ref="t" :key="'t' + index" v-for="(transportable,index) in transportables"
                      :lat-lng="transportable.position.coordinates">
      <l-popup>
          <div @click="innerClick">
            Parcel {{transportable.id}}
          </div>
        </l-popup>
                <l-icon
                        :icon-size="transportable.iconSize"
                        :icon-url="parcel_icon" />
        </l-marker>
      <l-marker ref="c" :key="'c' + index" v-for="(carrier,index) in carriers"
                      :lat-lng="carrier.position.coordinates">
      <l-popup>
          <div @click="innerClick">
            Truck {{carrier.id}}
          </div>
        </l-popup>
                  <l-icon
                          :icon-size="carrier.iconSize"
                          :icon-url="truck_icon" />
        </l-marker>
    </l-map>
  </div>
      </CCardBody>
    </CCard>

    <CRow>

    <CCol lg="6">
    <CCard>
        <CCardHeader>
          <CCol>
          <CRow>
            <CCol lg="7">
              <CRow>
              <img src="@/assets/truck.png" width="30" height="30" style="margin-left: 10px"/>
              <h2 style="margin-left: 10px">Trucks</h2>
              </CRow>
            </CCol>
            <CCol lg="2">
              <CDropdown 
                toggler-text="Matching" 
                color="secondary"
                placement="top-start"
              >
                <CDropdownItem>Greedy</CDropdownItem>
                <CDropdownItem>Optimized</CDropdownItem>
              </CDropdown>
            </CCol>
            <CCol lg="3">
              <CButton color="danger">Optimize Routes</CButton>
            </CCol>
          </CRow>
          <CRow>
            <CCol lg="2">
              #
            </CCol>
            <CCol lg="5">
              Driver
            </CCol>
            <CCol lg="4">
              Plate Number
            </CCol>
          </CRow>
          </CCol>
        </CCardHeader>
      <CCardBody>
        <CListGroup style="height: 23vh; overflow:scroll">
              <CListGroupItem tag="button" @click="mouseClickCarrier(index)" @mouseover="mouseOverCarrier(index)" @mouseleave="mouseLeaveCarrier(index)" :key="'cl' + index" v-for="(carrier,index) in carriers">
                <CRow>
                  <CCol lg="2">
                  {{carrier.id}}
                  </CCol>
                  <CCol lg="5">
                  {{carrier.driver}}
                  </CCol>
                  <CCol lg="4">
                  {{carrier.plate_number}}
                  </CCol>
                  <CCol lg="1">
                  <CIcon 
                    name="cil-phone" 
                  />
                  </CCol>
                </CRow>
              </CListGroupItem>
        </CListGroup>
      </CCardBody>
    </CCard>
    </CCol>

    <CCol lg="6">
    <CCard>
        <CCardHeader>
          <CCol>
          <CRow lg="6">
            <img src="@/assets/parcel.png" width="30" height="30" style="margin-left: 10px"/>
            <h2 style="margin-left: 10px">Parcels</h2>
          </CRow>
          <CRow>
            <CCol lg="2">
              #
            </CCol>
            <CCol lg="5">
              Sender
            </CCol>
            <CCol lg="5">
              Receiver
            </CCol>
          </CRow>
          </CCol>
        </CCardHeader>
      <CCardBody>
        <CListGroup style="height: 23vh; overflow:scroll">
              <CListGroupItem tag="button" @click="mouseClickTransportable(index)" @mouseover="mouseOverTransportable(index)" @mouseleave="mouseLeaveTransportable(index)" :key="'cl' + index" v-for="(transportable,index) in transportables">
                <CRow>
                  <CCol lg="2">
                  {{transportable.id}}
                  </CCol>
                  <CCol lg="5">
                  {{transportable.sender}}
                  </CCol>
                  <CCol lg="5">
                  {{transportable.reiceiver}}
                  </CCol>
                </CRow>
              </CListGroupItem>
        </CListGroup>
      </CCardBody>
    </CCard>
    </CCol>

    </CRow>
</div>
</template>

<script>
import axios from 'axios';
import { latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon, LPopup } from "vue2-leaflet";
import truck from '../assets/truck.png';
import parcel from '../assets/parcel.png';

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LPopup
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
      normalIcon: [25,25],
      largeIcon: [50,50],
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
    },
    mouseOverTransportable: function (index) {
      this.transportables[index].iconSize = this.largeIcon;
    },
    mouseLeaveTransportable: function (index) {
      if (!this.transportables[index].selected) {
        this.transportables[index].iconSize = this.normalIcon;
      }
    },
    mouseClickTransportable: function (index) {
      this.$refs.t[index].mapObject.openPopup();
      this.transportables.forEach(t => {
        t.selected = false; 
        t.iconSize = this.normalIcon;
      });
      this.transportables[index].selected = true;
      this.transportables[index].iconSize = this.largeIcon;
   },
    mouseOverCarrier: function (index) {
      this.carriers[index].iconSize = this.largeIcon;
    },
    mouseLeaveCarrier: function (index) {
      if (!this.carriers[index].selected) {
        this.carriers[index].iconSize = this.normalIcon;
      }
    },
    mouseClickCarrier: function (index) {
      this.$refs.c[index].mapObject.openPopup();
      this.carriers.forEach(c => {
        c.selected = false; 
        c.iconSize = this.normalIcon;
      });
      this.carriers[index].selected = true;
      this.carriers[index].iconSize = this.largeIcon;
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
                    c.iconSize = this.normalIcon;
                    c.selected = false;
                    return c;
                  });
            })
        },
};
</script>

<style>

</style>
