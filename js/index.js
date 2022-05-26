$(function() {
    
    $('#menu').click(() => {
        
        var status = $('#menu').attr('data');
        
        if(status == 'active') {
            $('#menu').attr('data', 'inactive');
            $('#menu + ul').css('height', '0');
        } else {
            $('#menu').attr('data', 'active');
            $('#menu + ul').css('height', '100vh');
        }
        
    });
    
    function onShow() {
        $('body').append('<div id="background-image"></div>');
        $('#background-image').append('<img src="' + $(this).attr('src') + '">');
        $('#background-image').animate({opacity: 1}, 500);
        $('#background-image').click((e) => {
            $('#background-image').animate({opacity: 0}, 500, 'swing', () => {
                $(e.currentTarget).remove();
            });
        });
    }
    
    function onDisplay() {
        
        var id = $(this).attr('id');
        var url = '';
        
        switch(id) {
          case 'torta-chocolate':
            url = 'components/torta-chocolate.html';
            break;
          case 'tartaleta-fresa':
            url = 'components/tartaleta-fresa.html';
            break;
          case 'pie-manzana':
            url = 'components/pie-manzana.html';
            break;
          case 'strudel-manzana':
            url = 'components/strudel-manzana.html';
            break;
          default:
            return;
        }
        
        fetch(url)
        .then(response => {
            return response.text();
        })
        .then(data => {
            $('article .tab-pane[data=' + id + ']').html(data);
        });
        
    }
    
    $('#social-images img').click(onShow);
    $('article .list-group-item').click(onDisplay);
    
    $('nav .nav-item a').click((e) => {
        
        e.preventDefault();
        
        var url = '';
        
        switch($(e.currentTarget).attr('id')) {
          case 'home':
            url = 'another_index.html';
            break;
          case 'products':
            url = 'products.html';
            break;
          case 'contact-us':
            url = 'contact-us.html';
            break;
          case 'about-us':
            url = 'about-us.html';
            break;
          default:
            return;
        }
        
        fetch(url)
        .then(response => {
            return response.text();
        })
        .then(data => {
            $('#main-content').html(data);
            $(window).scrollTop(0);
            // cuando se carga de nuevo el contenido del index, tenemos que vincular de nuevo los eventos correspondientes
            if(url == 'another_index.html') {
                $('#social-images img').bind('click', onShow);
                $('article .list-group-item').bind('click', onDisplay)
            }
        });
        
    });
    
});