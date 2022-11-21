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
        /*  title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }, */
    },
    mounted: async function () {
        console.log("fetch ID", this.id);
        // const id = this.id;

        const response = await fetch(
            "/api/{{ id }}" /* , {
            method: "GET",
        } */
        );
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
            <h2>This is a example {{ id }}</h2>
            <img :src="url"/>
            <button @click="handleCloseClick">X</button>
        </div>`,
};

export default Popup;
