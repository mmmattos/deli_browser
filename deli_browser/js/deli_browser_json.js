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
