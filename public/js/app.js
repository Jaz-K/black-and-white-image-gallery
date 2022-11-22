import * as Vue from "./vue.js";
import Popup from "./popup.js";

Vue.createApp({
    components: {
        popup: Popup,
    },
    data: function () {
        return {
            images: [],
            title: "",
            username: "",
            description: "",
            image: null,
            selectedImageId: null,
            headline: "This is a gallery",
            button: true,
        };
    },
    mounted: async function () {
        // console.log("mounted check");
        const response = await fetch("/api/images");
        const data = await response.json();
        console.log("image data first load", data);
        this.images = data;
        // console.log("user", this.images);
    },
    methods: {
        async handleMoreImages() {
            const lastImage = this.images[this.images.length - 1].id;
            const response = await fetch("/api/loadImages/" + lastImage);
            const data = await response.json();

            data.forEach((image) => {
                this.images.push(image);
                console.log("image for Each", image);
            });
            if (this.images.find((image) => image.id === lastImage)) {
                console.log("I found the match");
                this.button = false;
            }
        },
        handleClosePopup() {
            this.selectedImageId = null;
        },
        handleImageClick(image) {
            console.log("handle CLick test", image);
            this.selectedImageId = image;
        },
        handleChange(event) {
            event.preventDefault();
            console.log("handle change is running");
            this.image = event.target.files[0];
        },
        async handleSubmit(event) {
            // console.log("handle submit is running");
            // console.log("this....: ", this.title);
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
            this.images = [newImage, ...this.images];
        },
    },
}).mount("#main"); // can be a class element or id
