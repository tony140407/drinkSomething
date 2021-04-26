<template>
  <div class="container">
    <h1>Let's drink something</h1>
    <!-- <Cards /> -->
    <table>
      <thead>
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
        <tr v-for="(eachOrder, index) in orderList">
          <td>{{ eachOrder.personName }}</td>
          <td>{{ eachOrder.num }}</td>
          <td>{{ eachOrder.totalPrice }}</td>
          <td>{{ eachOrder.note }}</td>
          <td><button @click="openModifyModal(index)">修改</button></td>
          <td><button @click="deleteOrder(index)">刪除</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <Modal
    :modifyTemplate="modifyTemplate"
    v-if="isShow"
    @closeModal="closeFn"
    @changeOrderModal="changeOrderList"
  />
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import Modal from './Modal.vue';
import { orders } from '../composition/orderState.js';
import { modalState } from '../composition/modalState.js';
const { orderList, modifyOrder, deleteOrder } = orders();
const { isShow, modifyTemplate, openModal } = modalState();

function closeFn() {
  isShow.value = false;
}
// const changeOrderList = (template) => {
//   modifyOrder(1, template);
// };
// const orderIndex = ref(0);
// const orderList = computed(() => store.state.orderList);

const openModifyModal = (index) => {
  openModal(orderList[index]);
};
</script>
<style scoped>
.container {
  width: 1200px;
}
</style>
