const Popup = {
    data() {
        return {
            image: [],
            imageId: null,
        };
    },

    props: {
        id: {
            type: Number,
        },
    },
    mounted: async function () {
        console.log("fetch ID", this.id);
        this.imageId = this.id;
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
            <button @click="handleCloseClick" class="closeButton mobileButton">×</button>
            <section>
                <img :src="image.url" class="bw-img"/>
            </section>
            <section>
                <button @click="handleCloseClick" class="closeButton desktopButton">×</button>
                <h2>{{ image.title }}</h2>
                <h3>Posted by {{ image.username }}</h3>
                <h4>Created at: {{ image.created_at }}</h4>
                <p>Description:</p>
                <p>{{ image.description}}</p>
            </section>
        </div>
        <comments :id="imageId"></comments>
        `,
};

export default Popup;
