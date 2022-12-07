<template>
  <div class="side-bar">
    <nav class="lnb">
      <ul>
          <li v-for="(item, index) in subList" :key="index" :class="{ 'init-depths': item.submenuCount > 0 }">
          <router-link :to="item.sysCodeVal1" :class="{ depths1: item.submenuCount > 0 }"
            ><span class="icon"
              ><v-icon>{{ item.sysCodeVal2 }}</v-icon></span
            >{{ item.sysCodeName }}
          <span class="arrow" v-if="item.submenuCount > 0"><v-icon>mdi-chevron-down</v-icon></span>
          </router-link>
          <ul class="depths2">
            <li v-for="(item2, index) in item.children" :key="index">
              <router-link :to="item2.sysCodeVal1">{{ item2.sysCodeName }}</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUiCodeCookie } from "@/utils/cookie.js";
import bus from "@/utils/bus";
export default {
  data() {
    return {
      sid: "",
      subList: [],
      depths3List: [],
      depthsShow: false,
      id: "",
      subId: "",
    };
  },
  computed: {
    ...mapGetters("common", ["getMenuList"]),
  },
  created() {
    bus.$on("uiSet", this.reload);
  },
  mounted() {
    this.reload();
  },
  beforeDestroy() {
    bus.$off("uiSet", this.reload);
  },
  methods: {
    async reload() {
      this.subList = [];
      this.id = getUiCodeCookie();
      console.log(this.id);
      try {
        await this.$store.dispatch("common/MENU_LIST", this.id);
        const list = this.getMenuList.nextmApiResult;
        if (this.subList.length === 0) {
          for (const ele of list.menu) {
            if (ele.submenuCount > 0) {
              await this.$store.dispatch("common/MENU_LIST", ele.sysCodeSid);
              ele.children = this.getMenuList.nextmApiResult.menu;
              this.subList.push(ele);
            } else {
              this.subList.push(ele);
            }
          }
        }
      } catch (error) {
        this.alim(error, this.errorColor);
      }
    },
  },
};
</script>
<style scoped>
.depths2 {
  height: auto !important;
}
</style>
