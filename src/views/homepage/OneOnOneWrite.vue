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
              1:1문의 답변
            </caption>
            <colgroup>
              <col width="150" />
              <col width="*" />
              <col width="150" />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>상단공지</td>
                <td colspan="3">
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
                <td colspan="3"><input type="text" v-model="boardOneononeTitle" /></td>
              </tr>
              <tr class="ql-snow">
                <td>문의글</td>
                <td colspan="3"><textarea  v-model="boardOneononeContent" > </textarea></td>
              </tr>
              <tr class="ql-snow">
                <td>답변글</td>
                <td colspan="3"><textarea  v-model="boardOneononeAnswer" > </textarea></td>
              </tr>

            </tbody>
          </table>
        </div>
      </section>
      <section class="btn-group mt20">
        <v-btn small color="primary" @click="save" class="btn-search">저장</v-btn>
        <v-btn small @click="linkList" class="btn-search">취소</v-btn>
      </section>
    </section>
    <!-- 알럿 -->
    <alim :open="snackbar" :txt="text" :color="color" @reset="emitReset"></alim>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import { getAdminUserNameCookie } from "@/utils/cookie";
import FileUpload from "@/components/form/FileUpload.vue";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
import fileUploadMixin from "@/mixins/fileUpload";
import alimMixin from "@/mixins/alim.js";
export default {
  components: { alim, FileUpload },
  mixins: [fileUploadMixin, alimMixin, loading],
  data() {
    return {
      boardOneononeTopFlag: "N",
      boardOneononeTitle: "",
      boardOneononeContent: "",
      boardOneononeGroupNo: "",
      boardOneononeGroupSort: "",
      boardOneononeGroupDepth: "",
      boardOneononeAnswer:"",
      channeltuneFiles: [],
      file: [],
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
    ...mapGetters("common", ["getOneononeDetail", "oneononeWriteResult"]),
  },
  //데이터 불러오기
  methods: {
    linkList() {
      this.$router.push("/homepage/board/oneonone/list");
    },
    async save() {
      if (this.boardOneononeTitle === "") {
        this.alim("제목을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.boardOneononeContent === "") {
        this.alim("문의글을 입력해주세요.", this.errorColor);
        return false;
      }
      if (this.boardOneononeAnswer === "") {
        this.alim("답변글을 입력해주세요.", this.errorColor);
        return false;
      }

      const name = getAdminUserNameCookie();
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/ONEONONE_WRITE", {
          boardOneononeTopFlag: this.boardOneononeTopFlag,
          boardOneononeTitle: this.boardOneononeTitle,
          boardOneononeContent: this.boardOneononeContent,
          boardOneononeAnswer: this.boardOneononeAnswer,
          boardOneononeCreateName: name,
          channeltuneFiles: this.channeltuneFiles,
        });

        const res = this.oneononeWriteResult.nextmApiResult;
        if (parseInt(res.errorCode) !== 200) {
          this.alim(res.errorMessage, this.errorColor);
          return false;
        }

        this.alim("등록 되었습니다.", this.successColor);
        this.linkList();
      } catch (error) {
        this.alim(error, this.errorColor);
      } finally {
        bus.$emit("end:spinner");
      }
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
</style>
