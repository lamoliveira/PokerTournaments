$(document).ready(function () {

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    console.log($(document));
    console.log("isconnected:"+$(document).isConnected);
    
    console.log("title:"+ $(document).context.title);
    $("#menutournaments").hide();


    $.get("/api/user_data").then(function (data) {
        console.log("email:" + data.email);
        
        if (data.email) {
            $("#menulogin").text("logged as:" + data.email);
            
            //$("#menurule").style.display = 'block';
   
            document.getElementById("menurule").style.display = 'block';
            document.getElementById("menublog").style.display = 'block';
            document.getElementById("menuauthors").style.display = 'block';
            document.getElementById("menuaddtours").style.display = 'block';
            document.getElementById("menutours").style.display = 'block';
            document.getElementById("menuleagues").style.display = 'block';
            document.getElementById("menutrain").style.display = 'block';
            document.getElementById("menulogout").style.display = 'block';
            document.getElementById("menusignup").style.display = 'none';
        } 
        else {
            console.log("notlogged");
            document.getElementById("menurule").style.display = "none";
            document.getElementById("menublog").style.display = 'none';
            document.getElementById("menuauthors").style.display = 'none';
            document.getElementById("menuaddtours").style.display = 'none';
            document.getElementById("menutours").style.display = 'none';
            document.getElementById("menuleagues").style.display = 'none';
            document.getElementById("menutrain").style.display = 'none';
            document.getElementById("menulogout").style.display = 'none';
            document.getElementById("menusignup").style.display = 'block';
              
          //  window.location.href = "/tours";
        }
    });
});