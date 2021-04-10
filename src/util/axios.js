import axios from "axios";

// This instance is to be used when the contents of a directory are to be
// fetched or a file is to be accessed, including media files.
export const browser = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL + "api/browse/",
});
