
<template>
  <div>
    <CRow>
    <CCol lg="12">
    <CCard>
      <CCardheader>
          <CCol>
            <CRow lg="12">
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
      </CCardheader>
        <CCardBody>
          <CListGroup style="height: 65vh; overflow:scroll">
                <CListGroupItem tag="button" :key="'cl' + index" v-for="(transportable,index) in transportables">
                  <CRow>
                    <CCol lg="2">
                    {{transportable.id}}
                    </CCol>
                    <CCol lg="5">
                    {{transportable.sender}}
                    </CCol>
                    <CCol lg="5">
                    {{transportable.receiver}}
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
import parcel from '../assets/parcel.png';

export default {
  name: 'Parcels',
  components: {
  },
  data () {
    return {
      parcel_icon: parcel,
      transportables: []
      }
  },
  methods: {
  },
  mounted: function () {
    axios.get('http://localhost:8000/transportables').then(t => {
      this.transportables = t.data.results
    })
  }
}
</script>
