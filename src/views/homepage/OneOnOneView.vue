<template>
  <section class="container">
    <div class="title-wrap">
      <h1>1:1 문의</h1>
    </div>
    <section class="member-manage">
      <section class="member-list section-box border-outside">
        <div class="border">
          <table class="read-tbl">
            <caption>
              1:1문의 
            </caption>
            <colgroup>
              <col width="150" />
              <col width="*" />
              <col width="150" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>작성일</td>
                <td>{{ __getLocalTime(createdAt) }}</td>
                <td>수정일</td>
                <td>{{ __getLocalTime(updatedAt) }}</td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>{{ boardOneononeCreateName }}</td>
                <td>상단공지</td>
                <td v-if="modify === false">{{ boardOneononeTopFlag }}</td>
                <td v-else>
                  <div class="radio">
                    <v-radio-group v-model="boardOneononeTopFlag" :mandatory="false">
                      <v-radio label="사용함" value="Y"></v-radio>
                      <v-radio label="사용안함" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
              <tr>
                <td>제목</td>
                <td colspan="3" v-if="modify === false">{{ boardOneononeTitle }}</td>
                <td colspan="3" v-else><input type="text" v-model="boardOneononeTitle" /></td>
              </tr>
              <tr class="ql-snow">
                <td>문의글</td>
                <td colspan="3" v-if="modify === false" v-html="boardOneononeContent"></td>
                <td colspan="3" v-else><textarea  v-model="boardOneononeContent"> </textarea></td>
              </tr>
              <tr class="ql-snow">
                <td rowspan="2">답변글</td>
                <td colspan="3" v-if="modify === false" v-html="boardOneononeAnswer"></td>
                <td colspan="3" v-else><textarea  v-model="boardOneononeAnswer"> </textarea></td>
              </tr>
              <tr>
                <td colspan="3"  v-if="modify === false">                  
                  &nbsp;
                </td>
                <td colspan="3"  v-else>
                  <div class="radio">
                    <v-radio-group v-model="mailSendFlag" :mandatory="false">
                      <v-radio label="답변을 메일로 보내기" value="Y"></v-radio>
                      <v-radio label="답변을 메일로 보내지 않음" value="N"></v-radio>
                    </v-radio-group>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="btn-group mt20" v-if="modify === false">
        <v-btn small color="warning" @click="modifyset" class="btn-search">수정</v-btn>
        <v-btn small color="error" @click="confirm" class="btn-search">삭제</v-btn>
        <v-btn small @click="linkList" class="btn-search">목록</v-btn>
      </section>

      <section class="btn-group mt20" v-else>
        <v-btn small color="primary" @click="save" class="btn-search">저장</v-btn>
        <v-btn small @click="cancel" class="btn-search">취소</v-btn>
      </section>
    </section>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
    <!-- 삭제 컨펌 -->
    <confirm :type="type" :open="dialog" :txt="dialogText" :h1="dialogTitle" @resetConfirm="emitResetConfirm"></confirm>
  </section>
</template>

<script>
import loading from "@/mixins/loading";
import FileUpload from "@/components/form/FileUpload.vue";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import confirm from "@/components/dialog/Confirm.vue";
import { getAdminUserNameCookie } from "@/utils/cookie";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
import deleteMixin from "@/mixins/delete.js";
import utcMixin from "@/mixins/utcTime.js";
export default {
  components: { alim, confirm, FileUpload },
  mixins: [loading, fileUploadMixin, alimMixin, deleteMixin,utcMixin],
  data() {
    return {
      createdAt: "",
      updatedAt: "",
      boardOneononeCreateName: "",
      boardOneononeTopFlag: "",
      boardOneononeTitle: "",
      boardOneononeContent: "",
      boardOneononeAnswer: "",      
      boardOneononeSid: "",
      mailSendFlag:"N",
      modify: false,
      boardOneononeGroupNo: "",
      boardOneononeGroupSort: "",
      boardOneononeGroupDepth: "",
      file: [],
      channeltuneFiles: [],
      options: {
        theme: "snow",
        placeholder: "내용을 입력해 주세요.",
        imageResize: {
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
        imageDrop: true,
        modules: {
          toolbar: [
            // [{ size: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }],
            ["bold", "italic", "underline", "strike"],
            //['blockquote', 'code-block'],
            [{ direction: "rtl" }, { align: [] }],
            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
            ["link", "image"],
            //['clean'],
          ],
          imageResize: {
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
          imageDrop: true,
        },
      },
    };
  },
  computed: {
    ...mapGetters("common", ["getOneononeDetail", "oneononeModifyResult", "oneononeDelResult"]),
    ...mapGetters("common", ["fileDeleteResult"]),
  },
  async mounted() {
    this.reload();
  },
  //데이터 불러오기
  methods: {
    linkList() {
      this.$router.push("/homepage/board/oneonone/list");
    },
    modifyset() {
      this.modify = true;
    },
    async reload() {
      const id = this.$route.params.id;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/ONEONONE_DETAIL", id);
        const res = this.getOneononeDetail.nextmApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        const detail = res.boardOneonone;
        this.createdAt = detail.created_at;
        this.updatedAt = detail.updated_at;
        this.boardOneononeCreateName = detail.boardOneononeCreateName;
        this.boardOneononeTopFlag = detail.boardOneononeTopFlag;
        this.boardOneononeTitle = detail.boardOneononeTitle;
        this.boardOneononeContent = detail.boardOneononeContent;
        this.boardOneononeAnswer = detail.boardOneononeAnswer;        
        this.boardOneononeSid = detail.boardOneononeSid;
        this.boardOneononeGroupNo = detail.boardOneononeGroupNo;
        this.boardOneononeGroupSort = detail.boardOneononeGroupSort;
        this.boardOneononeGroupDepth = detail.boardOneononeGroupDepth;

      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async save() {
      if (this.boardOneononeTitle == "") {
        this.alim("제목을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.boardOneononeContent == "") {
        this.alim("내용을 입력해주세요.", this.errorColor);
        return false;
      }

      try {
        bus.$emit("start:spinner");
        const name = getAdminUserNameCookie();
        await this.$store.dispatch("common/ONEONONE_MODIFY", {
          boardOneononeSid: this.boardOneononeSid,
          boardOneononeTopFlag: this.boardOneononeTopFlag,
          boardOneononeTitle: this.boardOneononeTitle,
          boardOneononeContent: this.boardOneononeContent,
          boardOneononeAnswer: this.boardOneononeAnswer,          
          boardOneononeCreateName: name,
          boardOneononeGroupNo: this.boardOneononeGroupNo,
          boardOneononeGroupSort: this.boardOneononeGroupNo,
          boardOneononeGroupDepth: this.boardOneononeGroupSort,
          channeltuneFiles: this.channeltuneFiles,
          mailSendFlag:this.mailSendFlag
        });

        const res = this.oneononeModifyResult.nextmApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(this.errorMessage, this.errorColor);
          bus.$emit("end:spinner");
          return false;
        }

        this.reload();
        this.alim("수정 되었습니다.", this.successColor);
        this.modify = false;
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    cancel() {
      this.modify = false;
    },
    //업체 삭제
    async emitResetConfirm(data) {
      if (data.del === "Y") {
        if (data.type === "list") {
          try {
            bus.$emit("start:spinner");
            await this.$store.dispatch("common/ONEONONE_DEL", this.boardOneononeSid);
            const res = this.oneononeDelResult.nextmApiResult;
            if (parseInt(res.errorCode) !== 200) {
              this.alim(res.errorMessage, this.errorColor);
              return false;
            }

            await this.$router.push("/homepage/board/oneonone/list");
          } catch (error) {
            this.alim(error, this.errorColor);
          } finally {
            bus.$emit("end:spinner");
          }
        }
      }
      this.resetDeleteData();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-group {
  text-align: center;
  & button {
    margin: 0 2px;
  }
}
.download-wrap {
  display: flex;
  flex-direction: column;
  & .download {
    cursor: pointer;
    margin-bottom: 3px;
    &:hover {
      color: rgb(73, 126, 196);
    }
  }
}
</style>
