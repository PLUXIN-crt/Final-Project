



$(function(){
    
    $('.btnClear').click(function()
    {
        $('.txtEmail, .txtPassword, .txtName').val('');
    })

    $('.btnSubmit').click(function()
    {
        if($('.txtEmail').val() == "")
        {
            alert('Email not specified');
        }
        else if(!(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test($('.txtEmail').val())))
        {
            alert('Invalid email format');
        }
        else if($('.txtPassword').val() == "")
        {
            alert('Password not specified');
        }else if(!(/^[a-zA-Z0-9]+$/.test($('.txtPassword').val())))
        {
            alert('Invalid password format');
        }
        else
        {
            alert("Submitted data: " + 
                    $('.txtEmail').val() + '\n' + 
                    $('.txtPassword').val()             
                );
        }
    })

})







$(function () {
    var dolarValue;

    // Llamar a la API cuando la página se carga
    $.getJSON('https://mindicador.cl/api', function (data) {
        $('.txtDate').val(data.fecha.substring(0, 10));
        $('.txtUF').val(data.uf.valor);
        $('.txtDollar').val(data.dolar.valor);
        $('.txtUTM').val(data.utm.valor);
        dolarValue = data.dolar.valor;
    }).fail(function () {
        console.log('Error while consuming the API!');
    });

    $(".priceCLP").show();
    $(".priceUSD").hide();

    // Cuando se selecciona CLP
    $(".selectCLP").click(function () {
        $(".priceCLP").show();
        $(".priceUSD").hide();
    });

    // Cuando se selecciona USD
    $(".selectUSD").click(function () {
        $(".priceCLP").hide();
        $(".priceUSD").show();

        // Realizar el cálculo y actualizar el precio en USD para cada elemento
        $(".priceCLP").each(function (index) {
            var originalPrice = parseFloat($(this).text().replace('$', '').replace('.', ''));
            var priceInUSD = originalPrice / dolarValue;
            $(".priceUSD").eq(index).text('$' + priceInUSD.toFixed(2));
        });
    });
});