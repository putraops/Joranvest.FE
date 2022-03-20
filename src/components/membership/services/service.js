import axiosApi from '../../../config/axiosConfig';

export function getMemberships(payload) {
    return axiosApi.get(`/membership/getAll`, payload);
}