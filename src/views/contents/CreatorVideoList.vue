<template>
  <section class="container">
    <div class="title-wrap">
      <h1>콘텐츠 현황</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <div class="header">
            <h2>콘텐츠 리스트</h2>
            <div class="search">
              <pull-down :data="searchCategory" :code="searchCategoryCode" @selected="searchCategoryProp" :includeTotalElem="true" class="pull-down searchSelect"></pull-down>              
              <pull-down :data="searchStatus" :code="searchStatusCode" @selected="searchStatusProp" :includeTotalElem="true" class="pull-down searchSelect"></pull-down>                            
              <input type="text" placeholder="콘텐츠 제목을 입력하세요" v-model="searchText" class="search-input" @keyup.enter="reload(1)" />
              <v-btn small color="primary" dark @click="reload(1)" class="btn-search">조회</v-btn>
              <v-btn small color="warning" dark @click="reload(1)" class="btn-search">크리에이터 영상 등록</v-btn>              
            </div>
          </div>
          <table class="tbl mt20 user-list-tbl select-tbl">
            <colgroup>
              <col width="150" />
              <col width="150" />              
              <col width="*" />
              <col width="100" />
              <col width="160" />
              <col width="80" />
              <col width="80" />
              <col width="80" />                            
              <col width="100" />
            </colgroup>
            <thead>
              <tr>
                <th>고유코드</th>
                <th>가로이미지</th>
                <th  class="left">콘탠츠 제목</th>                
                <th>크리에이터 코드</th>
                <th>크리에이터 채널명</th>
                <th>찜수</th>
                <th>댓글수</th>
                <th>상태</th>
                <th>등록일시</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index" @click="creatorVideoDetail(item.creatorVideoSid)">
                <td>{{ item.creatorVideoSid }}</td>
                
                <td><img :src='`https://api.next-m.kr/api/h1/file/fileView/${item.video_horizontal_image.fileSid}?size=100`' /></td>
                <td class="left">{{ item.creatorVideoTitle }}</td>
                <td>{{ item.homepageUserSid }}</td>
                <td>{{ item.homepage_user_creator.homepageUserCreatorChannelName }}</td>
                <td>{{ item.homepage_user_creator.creatorJjimCount }}</td>
                <td>{{ item.homepage_user_creator.creatorVideoCount }}</td>
                <td>{{ item.creatorVideoStatusName }}</td>                                
                <td>{{ item.creatorVideoDate | formatDate }}</td>
              </tr>
            </tbody>
            <tfoot v-if="list.length < 1">
              <tr>
                <td colspan="6">리스트가 없습니다.</td>
              </tr>
            </tfoot>
          </table>
          <div class="text-center mt30">
            <v-pagination v-model="page" :length="len" :total-visible="7"></v-pagination>
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import PullDown from "@/components/form/PullDown.vue";
import alimMixin from "@/mixins/alim.js";
import resMixin from "@/mixins/response.js";
import deleteMixin from "@/mixins/delete.js";
import FileUpload from "@/components/form/FileUpload.vue";
import fileUploadMixin from "@/mixins/fileUpload";
export default {
  components: { alim, confirm,PullDown,FileUpload },
  mixins: [loading, alimMixin, deleteMixin,fileUploadMixin, resMixin],
  props: ["size"],
  data() {
    return {
      //게시물 설정
      page: 1,
      searchText: "",
      len: null,
      list: [],
      message: true,
      searchCategory:'',
      searchCategoryCode: "SYS22A17B017",      
      searchStatus:'',
      searchStatusCode: "SYS22B01B002",            
    };
  },
  computed: {
    ...mapGetters("creatorVideo", ["getCreatorVideoList"]),
    ...mapGetters("common", ["fileDeleteResult"]),
  },
  watch: {
    page() {
      this.reload(0);
    },
    size() {
      this.reload(0);
    },
  },
  mounted() {
    this.reload(0);
  },
  methods: {
    searchCategoryProp(data) {
        this.searchCategory = data.sysCodeSid;
        this.searchCategoryName = data.sysCodeName;
    },
    searchStatusProp(data) {
        this.searchStatus = data.sysCodeSid;
        this.searchStatusName = data.sysCodeName;
    },    
    //데이터 불러오기 num:0 => 설정 초기화, num: 1 => 페이징 초기화
    async reload(num) {
      if (num === 0) {
        this.clear();
      }
      //검색할경우 페이징 초기화
      if (num === 1) {
        this.page = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("creatorVideo/GET_CREATORVIDEO_LIST", {
          size: this.size,
          page: this.page,
          searchCategory:this.searchCategory,
          searchStatus: this.searchStatus,
          searchText: this.searchText,
        });

        if (this.getCreatorVideoList.nextmApiResult.errorCode === 200) {
          const dataList = this.getCreatorVideoList.nextmApiResult.creatorVideo;
          this.list = dataList.data;
          this.len = dataList.last_page;
        } else {
          this.alim(this.getCreatorVideoList.nextmApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        console.log(error);
        this.alim(error, this.errorColor);
      } finally {

        bus.$emit("end:spinner");
      }
    },
    //항목 clear
    clear() {
      const select = document.querySelectorAll(".select-tbl tr");
      select.forEach(ele => ele.classList.remove("active"));
    },
    creatorVideoDetail(creatorVideoSid){
      console.log(creatorVideoSid);
      this.$router.push(`/contents/CreatorVideo/${creatorVideoSid}`);
    }
  },
};
</script>

<style lang="scss" scoped>
.user-list-tbl {
  & td {
    cursor: pointer;
  }
}
.member-manage {
  display: flex;
  justify-content: space-between;
  & .member-list {
    width: 1000% !important;
    border: 1px solid #ccc;
    & .border {
      padding: 20px;
      border: 0 !important;
    }
  }
}
.searchSelect{
    width: 200px !important;
    vertical-align: middle;
    margin-right: 5px;
  }  

</style>
