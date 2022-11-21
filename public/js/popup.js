const Popup = {
    data() {
        return {
            image: [],
        };
    },

    props: {
        id: {
            type: Number,
        },
    },
    mounted: async function () {
        console.log("fetch ID", this.id);
        // const id = this.id;

        const response = await fetch("/api/" + this.id);
        const data = await response.json();
        this.image = data;
    },
    methods: {
        handleCloseClick() {
            this.$emit("close");
            console.log("closeClick test");
        },
    },
    template: `
        <div class="popup">
            <h1>{{ image.title }}</h1>
            <h2>Posted by {{ image.username }}</h2>
            <img :src="image.url"/>
            <button @click="handleCloseClick">X</button>
        </div>`,
};

export default Popup;
