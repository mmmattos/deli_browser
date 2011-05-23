var ac_data;
$(document).ready(function dTags(){

    var account = $("#_acct").val();
    if (account == "") {
        if (localStorage["default_account"] != "") {
            account=localStorage["default_account"];
        }
    }
    
    if (account != "") {
        $("#_acct").val(account);
        $.ajax({ type:      "GET",
                 dataType:  "jsonp",
                 url:       "http://feeds.delicious.com/v2/json/tags"+
                            "/"+account+"?count=3000",
                 success:   function(data) {
                                $.each(data, function(key, val) {
                                    if (!ac_data) {
                                        ac_data = key + " ";
                                    } else {
                                        ac_data += key + " ";
                                    }
                                });
                                
                                $("#_tag").autocomplete(ac_data.split(" "));
                            }
        });
    }
});

/*
 * Return the default delicious account as set in the options page.
 */
function getDefaultAccount() {
    return localStorage["default_account"];
}

/*
 * Get the urls from a Delicious accoutn for the given tags
 */
function goDeli(){
    $.ajax({ type:      "GET",
             dataType:  "jsonp",
             url:       "http://feeds.delicious.com/v2/json"+
                        "/"+($("#_acct").val() != "" ? $("#_acct").val() : "tag") + "/" +
                        $("#_tag").val()+
                        "?count=20",
             success:   function(data){
                            $("#delicious").empty();
                            if (data.length > 0) {
                                $.each(data, function(index, record) {
                                    getA(record.d,record.u);
                                });
                             }
                        }
    });	
}


/*
 * Build an A element from the given delicious data...
 * parameter recordata: a delicious entry.
 */
function getA(description, url) {

    if (url.length > 0) {

        var entryLink = document.createElement('a'); 
        entryLink.setAttribute('href', url);
        entryLink.setAttribute('target', "top");

        var anchorText = url;
        if (description.length > 0) {
            anchorText = description;
        }

        tn = document.createTextNode(anchorText);
        entryLink.appendChild(tn);

        // Write it on the output div...
        $("#delicious").append(entryLink);
        $("#delicious").append("<br>");
    }
}
