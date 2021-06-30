export const sayHello = () => 'Hello';
export const asyncSayHello = async () => {
  return new Promise((resolve, reject) => resolve("asyncSayHello"));
};

export const _appendFormData = (data, keydata) => {
  try {
    const formData = new FormData();
    const dataTypeOf = (value) => {
      if (typeof value === 'object') {
        if (Array.isArray(value)) return value[0] ? `array of ${dataTypeOf(value[0])}` : 'array';
        else return 'object';
      }
      return typeof value;
    };
    const _appendDataArray = (keys, dataArray) => {
      if (!keys) throw new Error('_appendDataArray : No key to append data');
      dataArray.forEach((data, index) => {
        _appendData(`${keys}[${index}]`, data);
      });
    }
    const _appendDataObject = (keyObject, dataAObject) => {
      Object.keys(dataAObject).forEach((key) => {
        _appendData(keyObject ? `${keyObject}[${key}]` : key, dataAObject[key]);
      });
    };
    const _appendDataArrayOfObject = (keys, dataArray) => {
      if (!keys) throw new Error('_appendDataArrayOfObject : No key to append data');
      dataArray.forEach((data, index) => {
        if (dataTypeOf(data) === "object") _appendDataObject(`${keys}[${index}]`, data);
        else if (dataTypeOf(data) === "array") _appendDataArray(`${keys}[${index}]`, data);
        else formData.append(keys, data);
      });
    };
    const _appendData = (keys, data) => {
      if (dataTypeOf(data) === "array of object") _appendDataArrayOfObject(keys, data);
      else if (dataTypeOf(data) === "object") _appendDataObject(keys, data);
      else if (dataTypeOf(data) === "array") _appendDataArray(keys, data);
      else formData.append(keys, data);
    };

    if (dataTypeOf(data) === "object") _appendDataObject(null, data);
    else if (dataTypeOf(data) === "array") _appendDataArray(null, data);
    else if (dataTypeOf(data) === "array of object") _appendDataArrayOfObject(null, data);
    else keydata && formData.append(keydata, data);
    return formData;
  } catch (error) {
    throw new Error("_appendFormData : can't append data");
  }
};