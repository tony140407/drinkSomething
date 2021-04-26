import { reactive } from 'vue';
export const orders = () => {
  const orderList = reactive([
    {
      id: 1619471596178,
      name: '可可',
      personName: 'aaa',
      num: 1,
      totalPrice: 50,
      note: 'hihi',
      size: 'L',
      ice: '去冰',
      sweet: '無糖',
      img:
        'https://foodtracer.taipei.gov.tw/Backend/upload/product/28722339/28722339_40.jpg',
      price: { M: 35, L: 50 },
    },
    {
      id: 1619471618613,
      name: '可可',
      personName: 'aaa',
      num: 1,
      totalPrice: 50,
      note: 'hihi',
      size: 'L',
      ice: '去冰',
      sweet: '無糖',
      img:
        'https://foodtracer.taipei.gov.tw/Backend/upload/product/28722339/28722339_40.jpg',
      price: { M: 35, L: 50 },
    },
  ]);
  const addOrder = (item) => {
    orderList.push(item);
  };
  const findElementIndex = (findId) => {
    const index = orderList.findIndex((element) => element.id === findId);
    return index;
  };
  const modifyOrder = (id, item) => {
    const index = findElementIndex(id);

    orderList.splice(index, 1, item);
  };
  const deleteOrder = (id) => {
    const index = findElementIndex(id);
    orderList.splice(index, 1);
  };
  return { orderList, deleteOrder, modifyOrder, addOrder, findElementIndex };
};
