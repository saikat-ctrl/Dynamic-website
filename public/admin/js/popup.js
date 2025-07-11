
$(document).ready(function () {
    // Fill textarea with existing content when modal opens
    $('#editModal').on('show.bs.modal', function () {
        let content = '';
        $('#aboutContent p').each(function () {
            content += $(this).text() + '\n';
        });
        $('#aboutText').val(content.trim());
    });

    // Handle save button
    $('#editForm').submit(function (e) {
        e.preventDefault();
        let newText = $('#aboutText').val().trim();
        let paragraphs = newText.split('\n').filter(line => line.trim() !== '');
        let html = `<h5 class="card-title fw-semibold mb-4">About Us</h5>`;
        $.each(paragraphs, function (i, line) {
            html += `<p>${line}</p>`;
        });
        $('#aboutContent').html(html);
        $('#editModal').modal('hide');
    });
});
