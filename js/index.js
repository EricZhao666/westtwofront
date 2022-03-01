function load_index() {
    recommendation = new Vue({
        el: "#recommendation",
        data: {
            books_left: [],
            books_right: [],
        },
        mounted() {
            axios.get("http://127.0.0.1:5000/findCommend").then(
                function (response) {
                    for (var i = 0; i < (response.data.data.length < 10 ? response.data.data.length : 10); i++) {
                        if (i % 2) {
                            recommendation.books_left.push({ type: response.data.data[i].type, name: response.data.data[i].name, url: "index.html" })
                        }
                        else {
                            recommendation.books_right.push({ type: response.data.data[i].type, name: response.data.data[i].name, url: "index.html" })
                        }
                    }
                }
            )
        }
    });

    rank = new Vue({
        el: "#rank",
        data: {
            ranks: []
        },
        mounted() {
            axios.get("http://127.0.0.1:5000/findRank").then(
                function (response) {
                    for (var i = 0; i < (response.data.data.length < 6 ? response.data.data.length : 6); i++) {
                        rank.ranks.push({ rank: i + 1, name: response.data.data[i].name, reader: response.data.data[i].reader, url: "index.html" })
                    }
                }
            )


        }
    });
}

function load_head() {
    login_ctrl = new Vue({
        el: "#login_ctrl",
        data: {
            is_login: false,
            show_shelf: false,
            show_history: false,
            username: "",
            history: [],
            shelf: [],
            key: ""
        },
        mounted() {
            axios.get("http://127.0.0.1:5000/is_login").then(
                function (response) {
                    login_ctrl.is_login = response.data.data.code
                    if (response.data.data.code) {
                        login_ctrl.username = response.data.data.username
                        login_ctrl.history = response.data.data.history
                        login_ctrl.shelf = response.data.data.collect
                    }
                }
            );
        },
        methods: {
            switch_shelf: function () {
                login_ctrl.show_shelf = !login_ctrl.show_shelf
                if (login_ctrl.show_shelf) {
                    login_ctrl.show_history = false
                }
            },
            switch_history: function () {
                login_ctrl.show_history = !login_ctrl.show_history
                if (login_ctrl.show_history) {
                    login_ctrl.show_shelf = false
                }
            },
            search: function () {
                if (login_ctrl.key != "") {
                    window.location.href = "search.html?key=" + login_ctrl.key
                }
            }
        }
    })
}

function load_store() {
    store = new Vue({
        el: "#store",
        data: {
            books: [],
            current_page: 1,
            all_page: 1,
            target_page: 1
        },
        mounted() {
            axios.get("http://127.0.0.1:5000/all?page=1").then(
                function (response) {
                    store.current_page = response.data.data.current
                    store.all_page = response.data.data.all
                    for (var i = 0; i < response.data.data.all / 2; i++) {
                        store.books.push([{
                            name: response.data.data.books[i * 2].name,
                            type: response.data.data.books[i * 2].type,
                            description: response.data.data.books[i * 2].description, img: "", url: ""
                        },
                        {
                            name: response.data.data.books[i * 2 + 1].name,
                            type: response.data.data.books[i * 2 + 1].type,
                            description: response.data.data.books[i * 2 + 1].description, img: "", url: ""
                        }
                        ])
                    }
                }
            )
        },
        watch: {
            target_page: function (page) {
                store.target_page = page
            }
        },
        methods: {
            change_page: function () {
                axios.get("http://127.0.0.1:5000/all?page=" + store.target_page).then(
                    function (response) {
                        store.books = []
                        store.current_page = response.data.data.current
                        store.all_page = response.data.data.all
                        for (var i = 0; i < response.data.data.all / 2; i++) {
                            store.books.push([{
                                name: response.data.data.books[i * 2].name,
                                type: response.data.data.books[i * 2].type,
                                description: response.data.data.books[i * 2].description, img: "", url: ""
                            },
                            {
                                name: response.data.data.books[i * 2 + 1].name,
                                type: response.data.wadata.books[i * 2 + 1].type,
                                description: response.data.data.books[i * 2 + 1].description, img: "", url: ""
                            }
                            ])
                        }
                    }
                )
            },
            collect: function (name) {
                axios.get("http://127.0.0.1:5000/collect?name=" + name)
            }
        }
    })

}

function load_author() {
    author = new Vue({
        el: "#author",
        data: {
            title: "",
            type: "",
            description: "",
            content: ""
        },

        methods: {
            submit: function () {
                axios.post("http://127.0.0.1:5000/book", {
                    name: author.name,
                    type: author.type,
                    description: author.description,
                    content: author.content
                }).then(
                    function (response) {
                        window.location.href = "index.html"
                    }
                )

            },
        }
    })

}

function load_search() {
    search = new Vue({
        el: "#search",
        data: {
            key: "",
            books: [],
            current_page: 1,
            all_page: 1,
            target_page: 1
        },
        mounted() {
            search.key = window.location.search
            axios.get("http://127.0.0.1:5000/search" + search.key + "&page=1").then(
                function (response) {
                    search.current_page = response.data.data.current
                    search.all_page = response.data.data.all
                    for (var i = 0; i < response.data.data.all / 2; i++) {
                        search.books.push([{
                            name: response.data.data.books[i * 2].name,
                            type: response.data.data.books[i * 2].type,
                            description: response.data.data.books[i * 2].description, img: "", url: ""
                        },
                        {
                            name: response.data.data.books[i * 2 + 1].name,
                            type: response.data.data.books[i * 2 + 1].type,
                            description: response.data.data.books[i * 2 + 1].description, img: "", url: ""
                        }
                        ])
                    }
                }
            )
        },
        watch: {
            target_page: function (page) {
                search.target_page = page
            }
        },
        methods: {
            change_page: function () {
                axios.get("http://127.0.0.1:5000/search" + search.key + "&page=" + search.target_page).then(
                    function (response) {
                        search.books = []
                        search.current_page = response.data.data.current
                        search.all_page = response.data.data.all
                        for (var i = 0; i < response.data.data.all / 2; i++) {
                            search.books.push([{
                                name: response.data.data.books[i * 2].name,
                                type: response.data.data.books[i * 2].type,
                                description: response.data.data.books[i * 2].description, img: "", url: ""
                            },
                            {
                                name: response.data.data.books[i * 2 + 1].name,
                                type: response.data.wadata.books[i * 2 + 1].type,
                                description: response.data.data.books[i * 2 + 1].description, img: "", url: ""
                            }
                            ])
                        }
                    }
                )
            },
            collect: function (name) {
                axios.get("http://127.0.0.1:5000/collect?name=" + name)
            }
        }
    })

}

function load_admin() {
    admin = new Vue({
        el: "#admin",
        data: {
            books: [],
            current_page: 1,
            all_page: 1,
            target_page: 1
        },
        mounted() {
            search.key = window.location.search
            axios.get("http://127.0.0.1:5000/check" + "&page=1").then(
                function (response) {
                    search.current_page = response.data.data.current
                    search.all_page = response.data.data.all
                    for (var i = 0; i < response.data.data.all; i++) {
                        search.books.push({
                            name: response.data.data.books[i].name,
                            type: response.data.data.books[i].type,
                            description: response.data.data.books[i].description, img: "", url: ""
                        })
                    }
                }
            )
        },
        watch: {
            target_page: function (page) {
                search.target_page = page
            }
        },
        methods: {
            change_page: function () {
                axios.get("http://127.0.0.1:5000/check" + "&page=" + search.target_page).then(
                    function (response) {
                        search.books = []
                        search.current_page = response.data.data.current
                        search.all_page = response.data.data.all
                        for (var i = 0; i < response.data.data.all; i++) {
                            search.books.push({
                                name: response.data.data.books[i].name,
                                type: response.data.data.books[i].type,
                                description: response.data.data.books[i].description, img: "", url: ""
                            })
                        }
                    }
                )
            },
            collect: function (name) {
                axios.get("http://127.0.0.1:5000/collect?name=" + name)
            }
        }
    })

}