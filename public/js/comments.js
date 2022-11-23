const Comments = {
    data() {
        return {
            comments: [],
            username: "",
            comment: "",
        };
    },
    props: {
        id: {
            type: Number,
        },
    },
    mounted: async function () {
        console.log("this id", await this.id);
        const response = await fetch("/api/comments/" + this.id);
        const data = await response.json();
        this.comments = data;
        console.log("comments", this.comments);
    },
    methods: {
        handleSubmitComment(event) {
            console.log("its submits!");
            event.preventDefault;
            fetch("/api/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: this.username,
                    comment: this.comment,
                    image_id: this.id,
                }),
            });
        },
    },
    template: `
    <h3>Add a comment</h3>
    <form @submit.prevent.default="handleSubmitComment">
        <div>
        <label for="username">Usernames</label>
        <input v-model="username" type="text" name="username" id="username" maxlength="15">
        </div>
        <div>
        <label for="comment">Comment</label>
        <input v-model="comment" type="text" name="comment" id="comment" maxlength="30">
        </div>
        <button type="submit">Submit</button>
    </form>
    <ul class="comments">
        <li v-for="comment of comments">
            <h4>{{comment.username}} says:</h4>
            <p class="comment">{{comment.comment}}</p>
        </li>
    </ul>
    
    `,
};

export default Comments;
