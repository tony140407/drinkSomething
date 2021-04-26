import { reactive } from 'vue';
export const orders = () => {
  const orderList = reactive([
    {
      name: '可可',
      personName: 'aaa',
      num: 1,
      totalPrice: 123,
      note: 'hihi',
      size: 'L',
      ice: '去冰',
      sweet: '無糖',
      img:
        'https://foodtracer.taipei.gov.tw/Backend/upload/product/28722339/28722339_40.jpg',
      price: { M: 35, L: 50 },
    },
    {
      name: '可可',
      personName: 'aaa',
      num: 1,
      totalPrice: 123,
      note: 'hihi',
      size: 'L',
      ice: '去冰',
      sweet: '無糖',
      img:
        'https://foodtracer.taipei.gov.tw/Backend/upload/product/28722339/28722339_40.jpg',
      price: { M: 35, L: 50 },
    },
  ]);
  const modifyOrder = (index, item) => {
    orderList.splice(index, 1, item);
  };
  const deleteOrder = (index) => {
    orderList.splice(index, 1);
  };
  return { orderList, deleteOrder, modifyOrder };
};
