const ACCESS_TOKEN = "ACCESS_TOKEN";

export const addAccessToken = (token) =>
  localStorage.setItem(ACCESS_TOKEN, token); //ตั้งค่า
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN); //อ่านค่า
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN); //เอาออก
