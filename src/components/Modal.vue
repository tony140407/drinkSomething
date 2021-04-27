<template>
  <div class="modal-bg">
    <div class="modal">
      <section class="modal-navbar">
        <h2>訂購飲料</h2>
        <button class="modal-closeBtn" @click="closeModal()">
          <i class="fas fa-times fa-2x"></i>
        </button>
      </section>
      <section class="modal-body mb-l">
        <img :src="order.img" :alt="`${order.name} 圖片`" />
        <div class="order">
          <h3>{{ order.name }}</h3>
          <div class="order-num mb-s">
            <button @click="order.num -= 1">
              <i class="fas fa-minus-circle"></i>
            </button>

            <input type="text" v-model="order.num" :placeholder="order.num" />
            <button @click="order.num += 1">
              <i class="fas fa-plus-circle"></i>
            </button>
          </div>
          <div class="order-size mb-s">
            <button
              v-for="size in sizeList"
              class="order-btn"
              :class="{ 'order-btn-active': order.size == size }"
              @click="order.size = size"
            >
              {{ size }}
            </button>
          </div>
          <div class="order-sweet mb-s">
            <button
              v-for="sweet in sweetList"
              class="order-btn"
              :class="{ 'order-btn-active': order.sweet == sweet }"
              @click="order.sweet = sweet"
            >
              {{ sweet }}
            </button>
          </div>
          <div class="order-ice mb-s">
            <button
              v-for="ice in iceList"
              class="order-btn"
              :class="{ 'order-btn-active': order.ice == ice }"
              @click="order.ice = ice"
            >
              {{ ice }}
            </button>
          </div>
          <div class="order-personName mb-s">
            <span>訂購人</span>
            <br />
            <input
              type="text"
              v-model="order.personName"
              placeholder="輸入你的大名~"
            />
          </div>
          <div class="order-annotation mb-s">
            <span>附註</span>
            <br />
            <textarea
              v-model="order.note"
              placeholder="(非必要) 要跟店員說些什麼嗎?"
            ></textarea>
          </div>
          <div class="totalPrice mb-s">
            <p>
              總價:
              <span v-show="order.size">{{ order.totalPrice }}</span>
            </p>
          </div>
        </div>
      </section>
      <section class="modal-footer">
        <button class="order-btn cancel" @click="closeModal()">取消</button>
        <button class="order-btn determine" @click="clickDetermine()">
          確定
        </button>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmit, toRefs, reactive } from 'vue';
// import { modalState } from '../composition/modalState.js';
// const newModifyTemplate = modalState().modifyTemplate;
const props = defineProps({
  modifyTemplate: Object,
  isNewOrder: Boolean,
});
const { modifyTemplate, isNewOrder } = toRefs(props);
const emit = defineEmit([
  'closeModal',
  'changeOrderModal',
  'addOrderModal',
  'changeIsNewOrder',
]);
function closeModal() {
  emit('closeModal');
  changeIsNewOrder();
}
console.log(`isNewOrder ${isNewOrder.value}`);
const order = reactive({ ...modifyTemplate.value });
order.totalPrice = computed(() => order.price[order.size] * order.num);

const sizeList = ['M', 'L'];
const sweetList = ['無糖', '微糖', '半糖', '少糖', '全糖'];
const iceList = ['去冰', '少冰', '正常', '多冰'];

const changeOrderModal = (modifyObjct) => {
  emit('changeOrderModal', modifyObjct);
};
const addOrderModal = (newObjct) => {
  emit('addOrderModal', newObjct);
};
const changeIsNewOrder = () => {
  if (isNewOrder.value) {
    emit('changeIsNewOrder');
  }
};
const clickDetermine = () => {
  // 若是新訂單
  if (isNewOrder.value) {
    const id = Date.now();
    order.id = id;
    addOrderModal(order);
  } else {
    changeOrderModal(order);
  }

  closeModal();
};
</script>
<style lang="scss" scoped>
.mb-s {
  margin-bottom: 15px;
}
.mb-l {
  margin-bottom: 30px;
}
.modal-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;

  .modal {
    width: 900px;
    border-radius: 30px;
    margin: 50px auto;
    padding: 50px;
    background-color: #fff;
    &-navbar {
      display: flex;
      justify-content: space-between;
      h2 {
        display: inline-block;
      }
    }
    &-closeBtn {
      color: tomato;
      background-color: #fff;
      padding: 5px 20px;
      border: none;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      cursor: pointer;
    }
    &-body {
      display: flex;
      justify-content: space-around;
    }
    .order {
      &-btn {
        background-color: #ccc; /* Green */
        border: none;
        color: white;
        padding: 5px 20px; //各自自己訂
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px; //各自自己訂
        cursor: pointer;
        &:hover {
          background-color: #f99070;
        }
        &-active {
          background-color: #f99070;
        }
      }
      &-num {
        input {
          width: 20px;
          text-align: center;
        }
      }
      &-personName {
        input {
          width: 100%;
        }
      }
      &-annotation {
        textarea {
          width: 100%;
        }
      }
    }
    &-footer {
      display: flex;
      justify-content: space-between;
    }
    .cancel {
      // background-color: #dc3545;
      background-color: #fff;
      border: 2px solid #dc3545;
      color: #dc3545;
      width: 30%;
      border-radius: 30px;
      padding: 10px 0;
      &:hover {
        background-color: #dc3545;
        border: 2px solid transparent;
        color: #fff;
      }
    }
    .determine {
      background-color: #fff;
      border: 2px solid #20c997;
      color: #20c997;

      width: 60%;
      border-radius: 30px;
      padding: 10px 0;
      &:hover {
        background-color: #20c997;
        border: 2px solid transparent;
        color: #fff;
      }
    }
  }
}
@media screen and(max-width:992px) {
  .modal-bg {
    .modal {
      width: 80%;
      &-body {
        display: block;
      }
    }
  }
}
</style>
