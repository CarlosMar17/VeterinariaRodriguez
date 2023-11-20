
    $(document).ready(function () {
        $('#loginModal button[data-target="#registerModal"]').on('click', function () {
            $('#loginModal').modal('hide');
            $('#registerModal').modal('show');
        });
    });
