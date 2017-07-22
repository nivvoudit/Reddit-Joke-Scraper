$(document).ready(function() {
    $(document).on('click', '.save', function() {
        var uuid = $(this).val();
        $.post('/api/save', {uuid: uuid}, function(res) {});
    });
});