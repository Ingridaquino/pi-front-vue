<template>
  <div class="feeds__container">
    <v-card>
      <v-data-iterator
        :items="profiles"
        :items-per-page="6"
        :search="search"
      >
        <template v-slot:header>
          <v-toolbar class="pa-10" dense>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              density="comfortable"
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
              style="max-width: 400px;"
              variant="solo"
              clearable
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>
        <template v-slot:default="{ items }">
          <v-container class="pa-2" fluid>
            <v-row dense>
              <v-col
              v-for="(item, index) in filteredProfiles"
              :key="index"
              cols="4"             
              >
                <v-card class="pb-3" border flat>
                  <div class="feeds--bg"></div>

                  <div class="feeds__avatar">
                    <v-avatar 
                    size="50px">
                      <v-img :src="item.img"></v-img>
                    </v-avatar>

                  </div>
  
                  <v-list-item class="mt-4">
                    <template v-slot:title>
                      <strong class="text-h6 mb-2">{{ item.name }}</strong>
                    </template>
                    <template v-slot:subtitle>
                      {{ item.area }}
                    </template>
                    <div class="mb-2 text-body-2">{{ item.bio }}</div>
                  </v-list-item>
  
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </template>
  
        <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
          <div class="d-flex align-center justify-center pa-4">
            <v-btn
              :disabled="page === 1"
              density="comfortable"
              icon="mdi-arrow-left"
              variant="tonal"
              rounded
              @click="prevPage"
            ></v-btn>
  
            <div class="mx-2 text-caption">
              Page {{ page }} of {{ pageCount }}
            </div>
  
            <v-btn
              :disabled="page >= pageCount"
              density="comfortable"
              icon="mdi-arrow-right"
              variant="tonal"
              rounded
              @click="nextPage"
            ></v-btn>
          </div>
        </template>
      </v-data-iterator>
    </v-card>
  </div>
</template>

<script>
import professionals from '../../../services/api/professionals'

export default {
  data() {
    return {
      search: '',
      profiles: professionals
    }
  },


  computed: {
    filteredProfiles() {
      return this.profiles.filter(profile => {
        return profile.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }

    
  }
}
</script>

<style scoped>
.feeds__container {
  padding: 40px;
}

.feeds--bg {
  display: flex;
  justify-content:flex-start;
  height: 50px;
  background-color: var(--color-secondary);
}

.feeds__avatar {
 position: absolute;
 top: 20px;
 left: 10px;
}
</style>



