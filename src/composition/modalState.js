import { reactive, ref } from 'vue';
export const modalState = () => {
  const isShow = ref(false);
  const modifyTemplate = ref({
    name: '',
    personName: '',
    num: 1,
    totalPrice: 0,
    note: '',
    size: '',
    ice: '',
    sweet: '',
    img:
      'https://foodtracer.taipei.gov.tw/Backend/upload/product/28722339/28722339_40.jpg',
    price: { M: 35, L: 50 },
  });
  const openModal = (data) => {
    console.log(data);
    if (data) {
      modifyTemplate.value = data;
      //   console.log(data);
    }
    isShow.value = true;

    // return data;
  };

  return { isShow, openModal, modifyTemplate };
};
