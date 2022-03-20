import axiosApi from '../../../../config/axiosConfig';

export function loadPagination(payload) {
    return axiosApi.post(`/education/getPagination`, payload);
}

export function loadWebinarRecordingPagination(payload) {
    return axiosApi.post(`/webinar_recording/getPagination`, payload);
}

export function markVideoAsWatched(payload) {
    return axiosApi.post(`/auth/education/markVideoAsWatched`, payload);
}

export function getByPathUrl(path_url) {
    return axiosApi.get(`/webinar_recording/getByPathUrl/${path_url}`);
}

export function getPlaylist(educationId, userId) {
    return axiosApi.get(`/education/getPlaylistByUserId/${educationId}/${userId}`);
}

export function emitenCategoryLookup(payload) {
    return axiosApi.get(`/education_category/lookup`, payload);
}

export function webinarCategoryLookup(name) {
    return axiosApi.get(`/webinar_category/lookup?q=&page=1&field=name`)
}

export function isWebinarRegistered(id) {
    return axiosApi.get(`/webinar_registration/isWebinarRegistered/${id}`);
}