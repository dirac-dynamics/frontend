<template>
  <div>
    <CRow>
    <CCol lg="12">
    <CCard>
      <CCardheader>
          <CCol>
            <CRow lg="12">
              <img src="@/assets/truck.png" width="30" height="30" style="margin-left: 10px"/>
              <h2 style="margin-left: 10px">Trucks</h2>
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
      </CCardheader>
        <CCardBody>
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
        </CCardBody>
    </CCard>
    </CCol>
    </CRow>
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
