import axiosApi from '../../../../config/axiosConfig';

export function loadPagination(payload) {
    return axiosApi.post(`/education/getPagination`, payload);
}

export function markVideoAsWatched(payload) {
    return axiosApi.post(`/auth/education/markVideoAsWatched`, payload);
}

export function getByPathUrl(path_url) {
    return axiosApi.get(`/education/getByPathUrl/${path_url}`);
}

export function getPlaylist(educationId, userId) {
    return axiosApi.get(`/education/getPlaylistByUserId/${educationId}/${userId}`);
}

export function emitenCategoryLookup(payload) {
    return axiosApi.get(`/education_category/lookup`, payload);
}