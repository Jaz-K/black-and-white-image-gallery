import * as Vue from "./vue.js";

console.log("Hello");

Vue.createApp({
    data: function () {
        return {
            users: [],
            greeting: "",
            heading: "My first Vue App",
            headingClassName: "heading",
            cities: [
                {
                    name: "Hamburg",
                    country: "Germany",
                },
                {
                    name: "Amsterdam",
                    country: "Netherlands",
                },
                {
                    name: "Arco",
                    country: "Italy",
                },
            ],
        };
    },
    methods: {
        emphasize: function (event) {
            event.target.style.textDecoration = "underline";
        },
        deemphazise: function (event) {
            event.target.style.textDecoration = "";
        },
    },
    mounted: async function () {
        console.log("mounted check");
        const response = await fetch("https://reqres.in/api/users?page=2");
        const parseJson = await response.json();
        console.log("parse json", parseJson);
        this.users = parseJson.data;
        console.log("user", this.users);
    },
}).mount("#main");
