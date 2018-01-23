$(function() {
    // GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: 'users/user',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');
                tbodyEl.html('');
                console.log(response);
                response.users.forEach(function(user) {
                    console.log(user.id);
                    tbodyEl.append(
                        '\
                        <tr>\
                            <td class="id">' + user.id + '</td>\
                            <td><input type="text" class="name" value="' + user.name + '"></td>\
                            <td><input type="text" class="surname" value="' + user.surname + '"></td>\
                            <td><input type="text" class="age" value="' + user.age + '"></td>\
                            <td><input type="text" class="mail" value="' + user.mail + '"></td>\
                            <td>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    '
                    )
                });
            }
        });
    });

    // CREATE/POST
    $('#create-form').on('submit', function(event) {
        event.preventDefault();

        var createName = $('#create-name');
        let createSurname = $('#create-surname');
        let createAge = $('#create-age');
        let createMail = $('#create-mail');
        $.ajax({
            url: 'users/user',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: createName.val(),
                                   surname: createSurname.val(),
                                   age:createAge.val(),
                                   mail:createMail.val()}),
            success: function(response) {
                console.log(response);
                createName.val('');
                createSurname.val('');
                createAge.val('');
                createMail.val('');
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();
        var newSurname = rowEl.find('.surname').val();
        var newAge = rowEl.find('.age').val();
        var newMail = rowEl.find('.mail').val();
        $.ajax({
            url: 'users/user/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName,
                                   newSurname:newSurname,
                                   newAge: newAge,
                                   newMail:newMail }),
            success: function(response) {
                console.log(response); 
                $('#get-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: 'users/user/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
});