const initState = {
    joranServices: [
        {
            "id": 1,
            "title": "Artikel Premium",
            "image_src": "images/blog/img-1.jpg",
            "content": "Dapatkan insight market update setiap harinya",
        },
        {
            "id": 2,
            "title": "Konsultasi Porto",
            "image_src": "images/blog/img-2.jpg",
            "content": "Konsultasi Portofolio dengan mentor-mentor berpengalaman",
        },
        {
            "id": 3,
            "title": "Komunitas Diskusi",
            "image_src": "images/blog/img-3.jpg",
            "content": "Saling bertukar pikiran dalam grup khusus",
        },
    ]
}

const joranserviceReducer = (state = initState, action) => {
    return state;
}

export default joranserviceReducer;