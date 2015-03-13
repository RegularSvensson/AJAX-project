
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    
    //create vars for values in street & city elements. 
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();

    //concatenate street and city as adress
    var adress = streetStr + ', ' + cityStr;

    //change heading by selecting greeting id (or class) using jQuery
    $greeting.text('So, you want to live at ' + adress + '?');

    //use google streetview api, add adress to url to get it
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + adress + '';

    //append this url as an img class bgimg to html body  using jQuery
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // Your NY Times AJAX request goes here

    // create NY Times url with city string and api key
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=f56a49e81916642789304326d5bc60df:9:71579088';

    //Pass in nytimesURL and an anonymous function into .getJSON
    $.getJSON(nytimesUrl, function(data) {

        //set nytHeader text using jQuery
        $nytHeaderElem.text('New York Times Articles About' + cityStr);

        };
    })

    return false;
};

$('#form-container').submit(loadData);
