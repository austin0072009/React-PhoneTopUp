import axios from "axios";

const instance = axios.create({
  baseURL: "https://web.xhxm99.com",
});

// 你还可以在此配置其他axios相关的内容，如拦截器等...

export default instance;
