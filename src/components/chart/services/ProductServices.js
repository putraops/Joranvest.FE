import axiosApi from "../../../config/axiosConfig";

// export function loadPagination(payload) {
//     return axiosApi.post(`/product/getPagination`, payload);
// }

// export function save(payload) {
//     return axiosApi.post(`/product/save`, payload);
// }

// export function submit(id) {
//     return axiosApi.get(`/product/submit/${id}`);
// }

// export function getById(id) {
//     return axiosApi.get(`/product/getViewById/${id}`);
// }

export function getByProductType(value) {
    return axiosApi.get(`/product/getByProductType/${value}`);
}

// export function getPlaylistById(id) {
//     return axiosApi.get(`/product/getPlaylistById/${id}`);
// }

// export function deleteById(id) {
//     return axiosApi.delete(`/product/deleteById/${id}`);
// }