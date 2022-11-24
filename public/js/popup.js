import Comments from "./comments.js";
const Popup = {
    components: {
        comments: Comments,
    },
    data() {
        return {
            image: [],
            imageId: this.id,
        };
    },

    props: {
        id: {
            type: Number,
        },
    },
    mounted: async function () {
        const response = await fetch("/api/" + this.id);
        const data = await response.json();
        if (!data) {
            this.$emit("close");
            return;
        }
        this.image = data;
    },
    methods: {
        handleDeleteClick() {
            console.log("image", this.image.url.slice(36));
            console.log("delete click");
            fetch("/api/delete", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: this.image.url.slice(36),
                    image_id: this.id,
                }),
            });
            this.$emit("close");
            this.$emit("delete", this.imageId);
        },
        handleCloseClick() {
            this.$emit("close");
            console.log("closeClick test");
        },
    },
    template: `
        <div class="popup ">
            <button @click="handleCloseClick" class="closeButton mobileButton">×</button>
            <div class="infos">
                <section>
                    <img :src="image.url" class="bw-img"/>
                </section>
                <section>
                    <button @click="handleCloseClick" class="closeButton desktopButton">×</button>
                    <h2>{{ image.title }}</h2>
                    <h3>Posted by: {{ image.username }}</h3>
                    <p v-if="image.description">Description: {{ image.description}}</p>
                    <button class="btn-style delete deleteIcon" @click="handleDeleteClick"></button>
                    <comments :id="imageId"></comments>
                </section>
            </div>
        </div>
        
        `,
};
//                     <h4>Created at: {{ image.created_at }}</h4>
export default Popup;
