import { debounce as LDebounch } from "lodash";

export const debounce = (func, delay) => {
  return LDebounch(func, delay || 300);
};

export const sliceText = (text, sliceNumber = 14) => {
  if (!text) return null;
  if (text?.length < sliceNumber) return text;
  return text?.slice(0, sliceNumber) + "...";
};

export const toFormData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    value && formData.append(key, value);
  });
  return formData;
};

export const getBase64Image = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const parseError = (error) => {
  const errorObj = error.response.data;
  if (errorObj?.issue) {
    return Object.values(errorObj?.issue)[0];
  } else {
    return errorObj?.message;
  }
};
