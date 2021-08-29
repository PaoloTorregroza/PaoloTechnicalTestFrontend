<template>
<div>
  <div>
    <b-table
      hover
      :fields="fields"
      :items="items"
      sticky-header
    >
      <template #cell(select)="row">
        <b-button size="sm" @click="updateUser(row.item, row.index, $event.target)" class="mr-1">
          Select
        </b-button>
      </template>
    </b-table>
  </div>
  <b-button v-b-modal.modal-center variant="outline-info" style="width: 100%">
    <b-icon icon="plus" aria-hidden="true"></b-icon>
  </b-button>

  <b-modal hide-footer hide-header-close id="modal-center" centered title="Register a new company.">
    <RegisterCompany  @companyRegistered="loadCompanies" />
  </b-modal>
</div>
</template>

<script>
import RegisterCompany from "./RegisterCompany";
import axios from "axios";

export default {
  name: 'CompanySelector',
  components: {RegisterCompany},
  data() {
    return {
      fields: [
        'name',
        {
          key: 'id',
          label: 'Nit'
        },
        'mail',
        'phone',
        {
          key: 'select',
          label: 'Select'
        }
      ],

      items: []
    }
  },

  async created() {
    await this.loadCompanies()
  },

  methods: {
    async loadCompanies() {
      try {
        const result = await axios.get(`${this.$apiUrl}/company`)
        this.items = result.data.data
      } catch (e) {
        alert('Error getting companies, try again later.')
      }
    },

    async updateUser(item) {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
      }

      try {
        await axios.put(`${this.$apiUrl}/user/`+this.$store.state.userData.id, {company: {id: item.id}}, config)
        await this.$router.push('/projects/'+item.id)
      } catch (e) {
        alert('Error selecting company')
      }
    }
  }
}
</script>

<style scoped>
</style>