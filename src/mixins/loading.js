import bus from "@/utils/bus";
export default {
  //재 사용할 컴포넌트 옵션
  created() {
    bus.$emit("end:spinner");
  },
};
