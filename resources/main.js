let one;
let two;

$(document).ready(function() {
    change();
    //Make default theme there
    if (window.location.pathname == "/index.html") {
        changeTheme(0);
    }
    $( ".sort" ).sortable({
      start: function(event, ui){
        ui.item.addClass('noclick');
        collapse_groups();
        },
        stop: function (event, ui) {
          var moved = ui.item,
              replaced = ui.item.prev();
          
          // if replaced.length === 0 then the item has been pushed to the top of the list
          // in this case we need the .next() sibling
          if (replaced.length == 0) {
              replaced = ui.item.next();
          }
          one = moved;
          two = replaced;
          console.log(moved);
          console.log(replaced);
          console.log("moved ID:" + moved.attr("id") + "replaced ID:" + replaced.attr("id"));
          console.log("moved: " + moved.attr('class') + " replaced: " + replaced.attr('class'));
          /* alert("moved ID:" + moved.attr("id"), "replaced ID:" + replaced.attr("id")) */;
      },
      update: function( event, ui ) {
        test(event, ui)
      }
    });
});



// TODO: make groups follow where the item has been dragged
function test (event, ui) {
  // test1 = event;
  // test2 = ui;
  
  // find the old group
  // let old_group = $(".group"+)
  // make sure that it is collapsed
  collapse_groups();
  // 

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

//For Settings

function Settings() {
    document.getElementById("overlay").style.display = "block";
}


function off() {
    document.getElementById("overlay").style.display = "none";
}


$(".group-class").click(function(){
  if ($(this).hasClass('noclick')) {
    $(this).removeClass('noclick');
  }
  else {
    $(this).find('.ui-icon').toggleClass("ui-icon-minusthick").toggleClass("ui-icon-plusthick");
    $("."+$(this).attr('id')).toggle('fast');
  }
});
  

function change() {
    $("#bottomBar").children().children().removeClass("box").addClass("box-small");
    $("#iconArea").children().children().removeClass("box-small").addClass("box");
}
