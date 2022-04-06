import axios from "axios";
import { BASEURL, BASEAPIURL, VALIDAPIURL, ELECTIONAPI } from "../constants";

export const API = axios.create({
  baseURL: `${BASEAPIURL}`,
  withCredentials: true,
});

export const VALIDAPI = axios.create({
  baseURL: `${VALIDAPIURL}`,
});

export const AUTH_API = axios.create({
  baseURL: `${ELECTIONAPI}/auth`,
  withCredentials: true,
});

export const fetchUserData = () => API.get("/profile");
export const verifyLogin = () => AUTH_API.get("/token/verify/");
export const userRegistration = (data) =>
  API.patch("/registration/complete/", data);
export const logout = () => AUTH_API.get("/logout/");

// Important Dates API
export const fetchImportantDates = () => API.get("/imp_dates");
export const addImportantDateAPI = (newDate) =>
  API.post("/imp_dates/", newDate);
export const editImportantDateAPI = (id, updateDate) =>
  API.put(`/imp_dates/${id}/`, updateDate);
export const deleteImportantDate = (id) => API.delete(`/imp_dates/${id}/`);

// FAQs API
export const fetchFAQs = () => API.get("/faqs");
export const addFAQ = (newFAQ) => API.post("/faqs/", newFAQ);
export const editFAQ = (id, updateFAQ) => API.put(`/faqs/${id}/`, updateFAQ);
export const deleteFAQ = (id) => API.delete(`/faqs/${id}/`);

//POS APIS
export const fetchPos = () => API.get("/positions");

//Candidate APIS
export const candidateRegistration = (data) => API.post("/candidates/", data);
export const updateCandidateData = (id, updateFAQ) =>
  API.patch(`/candidates/${id}/`, updateFAQ);

//credentials
export const uploadCredentials = (data) => API.post("/add_credentials/", data);
