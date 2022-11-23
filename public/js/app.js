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
            button: true,
        };
    },
    mounted: async function () {
        // console.log("mounted check");
        const response = await fetch("/api/images");
        const data = await response.json();
        this.images = data;
        this.imageId = window.location.hash.slice(1);
    },
    methods: {
        async handleMoreImages() {
            const lastImage = this.images[this.images.length - 1].id;

            const response = await fetch("/api/loadImages/" + lastImage);
            const data = await response.json();
            console.log("data", data);

            if (data.id == data.lowestId) {
                console.log(data);

                this.button = false;
            }
            this.images = [...this.images, ...data];
        },
        handleDeleteImage(imageId) {
            this.images = this.images.filter((x) => x.id !== imageId);
        },
        handleClosePopup() {
            window.history.pushState({}, "", `/`);
            this.selectedImageId = null;
        },
        handleImageClick(image) {
            console.log("handle CLick image", image);
            this.selectedImageId = image;
            window.history.pushState({}, "", `/#${image}`);
        },
        handleChange(event) {
            event.preventDefault();
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

            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const newImage = await response.json();
            this.images = [newImage, ...this.images];

            // reset form
            this.title = "";
            this.username = "";
            this.description = "";
            this.image = null;
        },
    },
}).mount("#main"); // can be a class element or id
