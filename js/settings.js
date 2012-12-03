
$(document).ready(function dSettings(){
	restoreOptions();
	$("#save").on("click", saveOptions);
});




/*
 * Saves options to localStorage.
 */ 
function saveOptions() {
    var tbox = document.getElementById("account");
    var _acct = tbox.value;
    localStorage["default_account"] = _acct;
    
    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
        status.innerHTML = "";
    }, 750);
}

/*
 * Restores select box state to saved value from localStorage.
 */
function restoreOptions() {
    var result = localStorage["default_account"];
    if (!result) {
        return;
    }
}