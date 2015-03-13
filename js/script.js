
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

    // YOUR CODE GOES HERE!
    
    //create vars for values in street & city elements. 
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();

    //concatenate street and city as adress
    var adress = streetStr + ', ' + cityStr;

    //change heading by selecting greeting id (or class) using jQuery
    $greeting.text('So, you want to live at ' + adress + '?');

    //use google streetview api, add adress to url to get it
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + adress + '';


    return false;
};

$('#form-container').submit(loadData);
