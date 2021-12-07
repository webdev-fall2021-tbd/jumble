$(document).ready(function() {
    change();
    changeTheme(0);
    $( ".sort" ).sortable({
      start: function(event, ui){
        ui.item.addClass('noclick');
        collapse_groups();
        },
        stop: function (event, ui) {
          test1 = event;
          test2 = ui;
          var moved = ui.item,
              replaced = ui.item.prev();
          
          // if replaced.length === 0 then the item has been pushed to the top of the list
          // in this case we need the .next() sibling
          if (replaced.length == 0) {
              replaced = ui.item.next();
          }
          if (!(moved[0].attributes["id"] == undefined && replaced[0].attributes["id"] == undefined)) {
            group_move(moved, replaced);
          }
      }
    });

    // add_ajax();

});

if (true)
{

function group_move (moved, replaced) {
  if (moved[0].attributes["id"]!= undefined) {
    $("."+moved[0].attributes["id"].value).insertAfter($('#'+moved[0].attributes["id"].value))
    console.log(moved[0].attributes["id"].value)
  }
  if (replaced[0].attributes["id"] != undefined) {
    $("."+replaced[0].attributes["id"].value).insertAfter($('#'+replaced[0].attributes["id"].value))
  }
  collapse_groups();

}

function collapse_groups () {
   $(".group").hide('fast');
}

function changeTheme(themeNum) {
    $.getJSON("resources/themes.json", data => {
        document.getElementById("homepageBody").style.backgroundColor = data["themes"][themeNum]["backgroundColor"];
        document.getElementById("homepageBody").style.backgroundImage = data["themes"][themeNum]["backgroundImage"];

        document.getElementById("bottomBar").style.backgroundColor = data["themes"][themeNum]["barColor"];
        document.getElementById("bottomBar").style.backgroundImage = data["themes"][themeNum]["barImage"];

       
        });
}


function hover(i){
  
  $.getJSON("resources/themes.json", data => {
    document.getElementsByClassName("theme")[i].style.backgroundImage = data["themes"][i]["backgroundImage"];

   
    });
   
}

//For Settings

function Settings() {
    document.getElementById("overlay").style.display = "block";
}


function off() {
    document.getElementById("overlay").style.display = "none";
}

function hideform() {
  document.getElementById("info").style.display = "none";
}

function showform() {
  document.getElementById("info").style.display = "block";
}


$(document).on('click', 'body > .ui-widget-overlay', function(){
  $("#addModal").dialog("close");
  return false;
});


$(".group-class").click(function(){
  if ($(this).hasClass('noclick')) {
    $(this).removeClass('noclick');
  }
  else {
    $(this).find('.ui-icon').toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
    $("."+$(this).attr('id')).toggle('fast');
  }
});
  
function hideform() {
  document.getElementById("info").style.display = "none";
}

function showform() {
  document.getElementById("info").style.display = "block";
}


function change() {
    $("#bottomBar").children().children().removeClass("box").addClass("box-small");
    $("#iconArea").children().children().removeClass("box-small").addClass("box");
}

}

$("#addButtonImage").click(function () {
  // console.log("clicked the add button")
  $('#addModal').dialog('open');
});

function add_remove(data) {
  // if the add button is checked then add it to the website
  for (i = 0; i < $("#add_section").children()['length']; i++) {
    let child = $("#add_section").children()[i];
    let input = child['children'][0].attributes['id'].value
    let checked = $("#"+input).is(':checked')
    if (checked) {
      console.log(input)
      let last = $("#main:last")
      last.append("<div class='box'>this is a test</div>");
    }
  }
  // for (let child in $("#add_section").children()) {
  //   // let checked = $('#check_add').is(':checked') 
  //   if (child.is(':checked')) {

  //   }
  // }

  for (let child in $("#remove_section").children()) {

  }
}

$( function() {
  $( "#addModal" ).dialog({
    autoOpen: false,
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Close": function() {
          $( this ).dialog( "close" );
      },
      "Save": function() {
          $.ajax({
              // url: "#",                   
              // timeout: 30000,
              type: "POST",
              // data: $('#add/remove').serialize(),
              // dataType: 'json',
              error: function(XMLHttpRequest, textStatus, errorThrown)  {
                  alert("An error has occurred making the request: " + errorThrown)
              },
              success: function(data){                                                        
                   //Do stuff here on success such as modal info   
                  // alert("saved");   
                  add_remove(data);
                  $( "#addModal" ).dialog( "close" );
              }
          });
      }
    }
  });
});


function form_ajax(dat) {
  $.ajax({
    url: 'resources/add.php',
    type: 'post',
    data: dat,
    success: function(response) {
        console.log(response);
        $("#" + dat + "_section").html(response);
    }
});
}

// function remove_ajax()

let remove_clicked = false;

$("#check_remove").click( function() {
    if (!remove_clicked) {
      // remove_ajax();
      form_ajax("remove")
      remove_clicked = true;
    }


  let checked = $('#check_remove').is(":checked")
  // console.log(checked)
  if (checked) { // if the checkbox has been checked, show the fieldset with what to remove (build this from the page)
    $("#remove").show('fast');
  } else {
    $('#remove').hide('fast');
  }

});


let add_clicked = false;
$("#check_add").click( function() {
  if (!add_clicked) {
    form_ajax("add");
    add_clicked = true;
  }

  let checked = $('#check_add').is(':checked') 
  if (checked) { // show the fieldset with the add stuff info (build this from database of things that you can add)
    $("#add").show('fast');
  } else {
    $("#add").hide('fast');
  }

});


function logout() {
  // Logout ajax call
  $.ajax({
    url: "resources/logout.php",
    type: "POST",
    success: () => {
      window.location = "login.html";
    },
    error: () => {
      alert("There was an error connecting to the server, please try again.");
    }
  });
}