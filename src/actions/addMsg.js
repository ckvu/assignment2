const addMsg = (msg) => {
  return {
    type: 'ADD',
    newMsg: msg
  };
};

export default addMsg;
