let customerToUpdate = '';

function loadAllCustomers() {
  $.ajax({
    url: 'http://localhost:3000/api/v1/customer/getAll',
    success: function (result) {
      $('#tblCustomer').empty();
      result.data.forEach((element) => {
        let row = '<tr>';
        row += '<td>' + element.id + '</td>';
        row += '<td>' + element.name + '</td>';
        row += '<td>' + element.address + '</td>';
        row += '<td>' + element.salary + '</td>';
        row +=
          "<td><button class='btn btn-warning' onclick='deleteCustomer(this)'>Delete</button></td>";
        row +=
          "<td><button class='btn btn-dark' onclick='fillForm(this)'>Select</button></td>";
        row += '</tr>';
        $('#tblCustomer').append(row);
      });
    },
    error: function (err) {
      console.log(err);
    },
  });
}

$('#btnSave').on('click', function () {
  let data = {
    name: $('#name').val(),
    address: $('#address').val(),
    salary: $('#salary').val(),
  };
  if ($('#btnSave').text() === 'Save') {
    $.ajax({
      url: 'http://localhost:3000/api/v1/customer/add',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (result) {
        alert(result.message);
        loadAllCustomers();
        $('#btnCancel').click();
      },
      error: function (err) {
        console.log(err);
      },
    });
  } else {
    data.id = customerToUpdate;

    $.ajax({
      url: 'http://localhost:3000/api/v1/customer/update',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (result) {
        alert(result.message);
        loadAllCustomers();
        $('#btnCancel').click();
      },
      error: function (err) {
        console.log(err);
      },
    });
  }
});

function deleteCustomer(ref) {
  const id = $($(ref).parent().parent().children()[0]).text();

  $.ajax({
    url: 'http://localhost:3000/api/v1/customer/delete/' + id,
    type: 'DELETE',
    success: function (result) {
      alert('Success');
      loadAllCustomers();
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function fillForm(ref) {
  customerToUpdate = $($(ref).parent().parent().children()[0]).text();
  $('#name').val($($(ref).parent().parent().children()[1]).text());
  $('#address').val($($(ref).parent().parent().children()[2]).text());
  $('#salary').val($($(ref).parent().parent().children()[3]).text());

  $('#btnSave').removeClass('btn-primary');
  $('#btnSave').addClass('btn-success');

  $('#btnSave').text('Update');
}

$('#btnCancel').on('click', function () {
  $('#name').val(null);
  $('#address').val(null);
  $('#salary').val(null);

  $('#btnSave').removeClass('btn-success');
  $('#btnSave').addClass('btn-primary');

  $('#btnSave').text('Save');
});
