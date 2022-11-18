import * as Vue from "./vue.js";

Vue.createApp({
    data: function () {
        return {
            images: [],
            title: "",
            file: null,
            headline: "This is a gallery",
        };
    },
    mounted: async function () {
        // console.log("mounted check");
        const response = await fetch("/api/images");
        const data = await response.json();
        // console.log("image data", data);
        this.images = data;
        // console.log("user", this.images);
    },
    methods: {
        handleChange(event) {
            console.log("handle change is running");
            this.file = event.target.files[0];
        },
    },
    handleSubmit(event) {
        console.log("handle submit is running");
        console.log("this.title: ", this.title);

        event.preventDefault();

        const formData = new FormData();
        formData.append("file", this.file);
        formData.append("title", this.title);

        fetch("/upload", {
            method: "POST",
            body: formData,
        });
    },
}).mount("#main"); // cann be a class element or id
