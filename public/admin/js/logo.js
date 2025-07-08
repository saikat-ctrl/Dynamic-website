const defaultImg = "https://w7.pngwing.com/pngs/819/548/png-transparent-photo-image-landscape-icon-images-thumbnail.png";

$(document).ready(function () {
    // On image select
    $('#imageInput').on('change', function () {
        const file = this.files[0];

        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (e) {
                $('#preview-img').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            $('#preview-img').attr('src', defaultImg);
        }
    });

    // On trash button click
    $('#reset-btn').on('click', function () {
        $('#preview-img').attr('src', defaultImg);   // Reset image
        $('#imageInput').val("");                    // Clear file input
    });
});