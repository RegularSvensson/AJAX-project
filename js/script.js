
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
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        //create articles variable that stores data from nytimes
        articles = data.response.docs;

        //iterate through data object  which is the response from nytimes for individual articles and append each one to html
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + ' <p>' + article.snippet + '</p>' + '</li>');
        };
    //Add error function to catch errors from NYT requests    
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    // Wikipedia AJAX request goes here

    //declare var for wikipedia api string
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    
    //set timeout function for error handling after 8 seconds
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text('failed to get wikipedia resources');
    }, 8000);
    
    //ajax request object
    $.ajax({
        //assign wikiURl as key to url
        url: wikiUrl,
        // set datatype to jsonp
        dataType: 'jsonp',
        //next line is redundant in this case
        // jsonp: 'callback', 
        //success function with response from wikipedia as parameter, run when we get a response
        success: function(response) {
            //declare variable and assign response to it
            var articleList = response[1];
            //iterate through articleList and append urls and article strings to html as list items
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };
            //clear timeout to avoid error messages if request is successful
            clearTimeout(wikiRequestTimeout);
        }
    });
    return false;
};

$('#form-container').submit(loadData);
