$(document).ready(function() {
    $(document).on('click', '.add-comment', function() {
        var uuid_ = $(this).val();
        var uuid = '#' + uuid_;

        if ($(uuid).find('.input').hasClass('hide')) {
                $(uuid).find('.comment').addClass('hide');
                $(uuid).find('.input').removeClass('hide');            
        }
        else {
            $(uuid).find('.input').addClass('hide');
        }
        $(document).on('click', '.submit', function() {
            $(uuid).find('.input').addClass('hide');
            var str = $(uuid).find('.comment_input').val();
            $(uuid).find('.comment_input').val('');
            var comment = {
                comment: str,
                uuid: uuid_
            }
            $.post('/api/add_comment', comment, function(res) {});
        });        
    });

    $(document).on('click', '.show-comment', function() {
        var uuid_ = $(this).val();
        var uuid = '#' + uuid_;

        if ($(uuid).find('.comment').hasClass('hide')) {
                $(uuid).find('.input').addClass('hide');
                $(uuid).find('.comment').removeClass('hide');            
        }
        else {
            $(uuid).find('.comment').addClass('hide');
        }
        $(uuid).find('.comment').empty();
        $.post('/api/show_comment', {uuid: uuid_}, function(res) {
            res.forEach(function(element) {                 
                $(uuid).find('.comment').append('<h5 style="padding: 5px 0 5px 0; border: outset; border-width: 2px">'
                    +element.comment+'<button class="delete" style="float: right; font-size: 9pt;" value='+element._id+'>Delete</button></h5>');
            });
            
        });
    });

    $(document).on('click', '.delete', function() {
        var id = $(this).val();
        $(this).parent().remove();
        $.post('/api/delete', {id: id}, function(res) {});
    });
});