import config from './config.json'

const baseUrl = config.baseUrl

//routes from server

export function login(body) {
    return callPost(baseUrl + '/login', body);
}

export function register(body) {
    return callPost(baseUrl + '/register', body);
}

export function routes() {
    return callGet(baseUrl + '/transroute/routes');
}

export function route(station) {
    return callGet(baseUrl + '/transroute/route/' + station);
}

export function buses() {
    return callGet(baseUrl + '/transroute/buses/');
}

export function trainsByRoute(route) {
    return callGet(baseUrl + '/transroute/trains/' + route);
}
export function busesByRoute(route) {
    return callGet(baseUrl + '/transroute/buses/' + route);
}

export function classes() {
    return callGet(baseUrl + '/transroute/classes/');
}

export function schedules() {
    return callGet(baseUrl + '/transroute/schedules/');
}

export function validateCard(body) {
    return callPost(baseUrl + '/payment/card', body);
}

export function validatePhone(body) {
    return callPost(baseUrl + '/payment/phone', body);
}

export function makeReservation(body) {
    return callPost(baseUrl + '/transroute/reservations', body);
}

export function getReservations(user) {
    return callGet(baseUrl + '/transroute/users/' + user + '/reservations/');
}

export function getReservation(rid) {
    return callGet(baseUrl + '/transroute/reservations/' + rid);
}

export function deleteReservation(id) {
    return callDelete(baseUrl + '/transroute/reservations/' + id);
}

export function updateAccount(body, id) {
    return callPut(baseUrl + '/users/' + id, body)
}

export function contact(body) {
    return callPost(baseUrl + '/transroute/contact', body);
}

export function getBookedSeatsCount(train, trainClass, date, time) {
    return callGet(baseUrl + "/transroute/reservations/buses/" + train + "/class/" + trainClass + "/date/" + date + "/time/" + time);
}

const callGet = (url) => {
    return fetch(url).then(handleres);
}

const callPost = (url, body) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const callPut = (url, body) => {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const callDelete = (url) => {
    return fetch(url, {
        method: 'DELETE'
    }).then(handleres);
}

const handleres = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        if (res.status === 404) {
            return Promise.reject();
        } else {
            throw res.json();
        }
    }
}