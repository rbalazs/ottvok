requirejs.config({
    paths: {
        'knockout-3.4.0' : 'https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.0/knockout-min',
        'jquery' : 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min'
    }
});

require(['knockout-3.4.0', 'jquery'], function(ko, $) {

});