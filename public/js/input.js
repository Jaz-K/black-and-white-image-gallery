document.addEventListener("DOMContentLoaded", function () {
    let single = "One file choosed";

    fileUploadStyling(single);
});

/* Die Funktion */

/* function fileUploadStyling(single, multiple) {
    let input = document.querySelectorAll("input[type=file]");
    for (let i = 0; i < input.length; i++) {
        var inputFile = input[i];
        inputFile.addEventListener("change", function () {
            var label = this.nextElementSibling;

            if (this.files && this.files.length > 1) {
                label.innerHTML = this.files.length + " " + multiple;
            } else {
                label.innerHTML = this.files[0].name + " " + single;
            }
        });
    }
} */

function fileUploadStyling(single) {
    let input = document.querySelector("input[type=file]");

    const inputFile = input;
    inputFile.addEventListener("change", function () {
        let label = this.nextElementSibling;

        label.innerHTML = `🖼 ${single}`;
        // this.files[0].name.slice(0, 10) + "..." + " " + single;
        // this.files[0].name.slice(0, 10) + "..." + " " + single;
    });
}

// toggle

const toggle = document.querySelector(".switch");

toggle.addEventListener("click", () => console.log("toggle click")); // here add darktheme );
