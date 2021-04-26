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
          <th>訂購人</th>
          <th>杯數</th>
          <th>價錢</th>
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
const sortMode = (mode, list) => {
  if (mode == 'totalPrice') {
    list.sort((a, b) => {
      return a.totalPrice - b.totalPrice;
    });
  }
};
const copyOrderList = computed(() => {
  let list = { ...orderList };
  let sortArr = [];
  let outPutList = {};
  for (let eachObj in list) {
    sortArr.push(list[eachObj]);
  }
  console.log(sortArr);
  sortMode('totalPrice', sortArr);
  console.log(sortArr);
  sortArr.forEach((each, index) => {
    console.log(each);
    outPutList[index] = each;
  });

  return outPutList;
});

// watch(orderList, (currentValue) => {
//   copyOrderList.value = { ...currentValue };
//   sortMode('name');
// });

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
