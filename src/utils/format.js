export const getPaginationData = ({
  data,
  key = '',
  defaultReturn = '',
  changeReturnData,
}) => {
  if (data) {
    if (data[key]) {
      return changeReturnData ? changeReturnData(data[key]) : data[key];
    }
  }
  return defaultReturn;
};
