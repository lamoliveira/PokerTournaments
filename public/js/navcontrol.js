$(document).ready(function () {

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    console.log($(document));
    console.log("isconnected:"+$(document).isConnected);
    
    console.log("title:"+ $(document).context.title);

    $.get("/api/user_data").then(function (data) {
        console.log("email:" + data.email);
        //$("#menutournaments").hide;

        if (data.email) {
            $("#menulogin").text("logged as:" + data.email);
        } 
        else {
            console.log("notlogged");
          //  window.location.href = "/tours";
        }
    });
});