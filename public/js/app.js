import * as Vue from "./vue.js";

Vue.createApp({
    data: function () {
        return {
            headline: "This is a gallery",
            images: [],
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
}).mount("#main");
