import * as Vue from "./vue.js";

Vue.createApp({
    data: function () {
        return {
            images: [],
            title: "",
            username: "",
            description: "",
            image: null,
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
            event.preventDefault();
            console.log("handle change is running");
            this.image = event.target.files[0];
        },
        async handleSubmit(event) {
            console.log("handle submit is running");
            console.log("this....: ", this.title);

            event.preventDefault();

            const formData = new FormData();
            formData.append("image", this.image);
            formData.append("title", this.title);
            formData.append("username", this.username);
            formData.append("description", this.description);

            const response = await fetch("/upload", {
                method: "POST",
                body: formData,
            });
            const newImage = await response.json();
            console.log("thhis images", this.images);
            console.log("new image", newImage);
            this.images = [newImage, ...this.images];
        },
    },
}).mount("#main"); // can be a class element or id
