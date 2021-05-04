let emit;
export const emitInit = function (emitModal) {
  emit = emitModal;
};

export const closeModal = (isNewOrder) => {
  emit('closeModal');
  changeIsNewOrder(isNewOrder);
};
export const changeOrderModal = (modifyObjct) => {
  emit('changeOrderModal', modifyObjct);
};
export const addOrderModal = (newObjct) => {
  emit('addOrderModal', newObjct);
};
export const changeIsNewOrder = (isNewOrder) => {
  if (isNewOrder) {
    emit('changeIsNewOrder');
  }
};
