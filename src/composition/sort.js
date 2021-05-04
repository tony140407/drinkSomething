import {ref} from 'vue'
export const sortType = ref({ type: '', isAscending: false });
export const sortTypeChange = (type) => {
  sortType.value.type = type;
  sortType.value.isAscending = !sortType.value.isAscending;
};
export const sortMethod = (type, isAscending, list) => {
  // 文字 sort特別處理
  if (type == 'personName') {
    let ascendingNum = 1;
    if (isAscending == false) {
      ascendingNum = -1;
    }
    list.sort((a, b) =>
      a[type] > b[type] ? ascendingNum : b[type] > a[type] ? -ascendingNum : 0
    );
    return;
  }
  if (isAscending == true) {
    list.sort((a, b) => {
      return a[type] - b[type];
    });
  }
  if (isAscending == false) {
    list.sort((a, b) => {
      return b[type] - a[type];
    });
  }
};