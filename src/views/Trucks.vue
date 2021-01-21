<template>
  <div>
    <CCard>
      <CCardheader>
          <CCol lg="12">
            <CRow  style="margin-left: 32px; margin-top: 16px;">
              <img src="@/assets/truck.png" width="30" height="30"/>
              <h2 style="margin-left: 8px">Trucks</h2>
            </CRow>
            <CRow style="margin-left: 32px; margin-bottom: -8px;">
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
      </CCardheader>
        <CCardBody>
            <CListGroup style="height: 65vh; overflow:scroll">
                  <CListGroupItem tag="button" :key="'cl' + index" v-for="(carrier,index) in carriers">
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
  </div>
</template>

<script>
import axios from 'axios';
import truck from '../assets/truck.png';

export default {
  name: 'Trucks',
  components: {
  },
  data () {
    return {
      truck_icon: truck,
      carriers: []
      }
  },
  methods: {
  },
  mounted: function () {
    axios.get('http://localhost:8000/carriers').then(c => {
      this.carriers = c.data.results
    })
  }
}
</script>
