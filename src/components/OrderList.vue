<template>
  <div class="container mx-auto">
    <h1>Let's drink something</h1>
    <!-- <Cards /> -->
    <button class="btn addOrder mb-l" @click="addOrderModalShow">
      新增訂單
    </button>
    <table class="table mx-auto">
      <thead class="table-thead">
        <tr>
          <th>
            訂購人 <button @click="sortTypeChange('personName')"></button>
          </th>
          <th>杯數<button @click="sortTypeChange('num')"></button></th>
          <th>價錢<button @click="sortTypeChange('totalPrice')"></button></th>
          <th>附註</th>

          <th>修改</th>
          <th>刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border_bottom" v-for="(eachOrder, index) in copyOrderList">
          <td>{{ eachOrder.personName }}</td>
          <td>{{ eachOrder.num }}</td>
          <td>{{ eachOrder.totalPrice }}</td>
          <td>{{ noteLengthLimit(eachOrder.note) }}</td>
          <td>
            <button class="btn modify" @click="openModifyModal(eachOrder.id)">
              修改
            </button>
          </td>
          <td>
            <button class="btn delete" @click="deleteOrder(eachOrder.id)">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Modal
    :modifyTemplate="modifyTemplate"
    :isNewOrder="isNewOrder"
    v-if="isShow"
    @closeModal="closeFn"
    @changeOrderModal="changeOrderList"
    @addOrderModal="addOrderList"
    @changeIsNewOrder="changeIsNewOrder"
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Modal from './Modal.vue';
import { orders } from '../composition/orderState.js';
import { modalState } from '../composition/modalState.js';
const {
  orderList,
  modifyOrder,
  deleteOrder,
  addOrder,
  findElementIndex,
} = orders();
const {
  isShow,
  modifyTemplate,
  openModal,
  isNewOrder,
  modifyTemplateInit,
} = modalState();
const openModifyModalIndex = ref(null);
function closeFn() {
  isShow.value = false;
}
// const copyOrderList = ref({ ...orderList });
const sortMethod = (type, isAscending, list) => {
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
      console.log(a[type] - b[type]);
      return a[type] - b[type];
    });
  }
  if (isAscending == false) {
    list.sort((a, b) => {
      return b[type] - a[type];
    });
  }
};
const sortType = ref({ type: '', isAscending: false });
const sortTypeChange = (type) => {
  sortType.value.type = type;
  sortType.value.isAscending = !sortType.value.isAscending;
};
const copyOrderList = computed(() => {
  let list = { ...orderList };
  if (!sortType.value.type) {
    return list;
  }
  console.log(' mode', sortType.value.type, sortType.value.isAscending);
  let sortArr = [];
  let outPutList = {};
  for (let eachObj in list) {
    sortArr.push(list[eachObj]);
  }
  console.log(sortArr);
  sortMethod(sortType.value.type, sortType.value.isAscending, sortArr);
  console.log(sortType.value.type, sortType.value.isAscending);
  console.log(sortArr);
  sortArr.forEach((each, index) => {
    outPutList[index] = each;
  });

  return outPutList;
});

function changeIsNewOrder() {
  isNewOrder.value = false;
}
const addOrderModalShow = () => {
  isNewOrder.value = true;
  openModifyModal();
};
const currentOrderId = ref(null);
const addOrderList = (template) => {
  addOrder(template);
};
const changeOrderList = (template) => {
  modifyOrder(currentOrderId.value, template);
};

const openModifyModal = (id) => {
  console.log(orderList);
  if (id !== 0 && !id) {
    console.log('沒有id');
    modifyTemplateInit();
    openModal();
    return;
  }
  console.log(id);
  currentOrderId.value = id;
  const index = findElementIndex(id);
  openModal(orderList[index]);
  // openModifyModalIndex.value = index;
};
const noteLengthLimit = (note) => {
  if (!note) return;
  if (note.length > 10) {
    return `${note.slice(0, 10)}...`;
  }
  return note;
};
</script>
<style lang="scss" scoped>
.mx-auto {
  margin-right: auto;
  margin-left: auto;
}
.mb-l {
  margin-bottom: 40px;
}
.container {
  width: 1200px;
}
.btn {
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  // margin: 4px 2px;
  cursor: pointer;
}
.addOrder {
  background-color: #fff;
  color: #f99070;
  border: 2px solid #f99070;
  &:hover {
    background-color: #f99070;
    color: #fff;
    border: 2px solid transparent;
  }
}
.modify {
  background-color: #fff;
  color: #20c997;
  border: 2px solid #20c997;
  &:hover {
    background-color: #20c997;
    color: #fff;
    border: 2px solid transparent;
  }
}
.delete {
  background-color: #fff;
  color: #dc3545;
  border: 2px solid #dc3545;
  &:hover {
    background-color: #dc3545;
    color: #fff;
    border: 2px solid transparent;
  }
}
.table {
  border-spacing: 0px;
  width: 80%;
  border: 1px solid #000;
  & td,
  th {
    padding: 20px 10px;
  }
  &-thead {
    background-color: #aee;
  }
  tr.border_bottom td {
    border-bottom: 1px solid black;
  }
}
</style>
