$(document).ready(function () {

    $('form').on('submit', function (e) {
      e.preventDefault();
      $("#info").hide();
      $.ajax({
        type: 'GET',
        url: './setup.php',
        data: $("#dimensions").serializeArray(),
        success: function (data) {
          if (jQuery.parseJSON(data) == "fail") {
          alert("Please enter all fields!");
          return false;
          } 
          $("#intro").text("Click individual lights to turn on/off all adjacent lights. Try to turn off all lights!");
          //$("#result").text(data);
          data = jQuery.parseJSON(data);
          var width = data[data.length - 1][0];
          var height = data[data.length - 1][1];
          alert("Creating a "+width+"x"+height+ " game board!" );
          //console.log(data);
          data.pop();
          //console.log(data);
          $("#board").empty();
          var board = "<table>";
          for(var h=1; h < height+1; h++) {
            board += "<tr>";
            for(var w=1; w < width+1; w++) {
                if (check(w,h,data) === "true") {
                    board +="<td><button type='button' class=on style='background-color: yellow; display: absolute; margin: 0; width:100%; height:100%;'></button></td>";
                }
                else {
                    board +="<td><button type='button' class=off style='background-color: black; display: relative; margin: 0; width:100%; height:100%'></button></td>";
                }
            }
            board += '</tr>';
        }
        board += '</table>';
        $("#board").append(board);
        }
      });
    });
});

$(document).ready(function(){
    $("#board").on('click', 'button', function() {

    if($('.on').length){
    
    var col_index = $(this).parent().parent().children().children().index($(this));
    var row_index = $(this).parent().parent().index('tr');
    //alert("["+row_index+","+col_index+']');

    //current
    var b = $(this);
    b.css("backgroundColor", color(b));

    //right
    b = $(this).closest("td").next().find("button");
    b.css("backgroundColor", color(b));
    //left
    b = $(this).closest("td").prev().find("button");
    b.css("backgroundColor", color(b));
    //up
    b = $(this).closest("tr").prev().children().eq(col_index).find("button");
    b.css("backgroundColor", color(b));
    //down
    b = $(this).closest("tr").next().children().eq(col_index).find("button");
    b.css("backgroundColor", color(b));
    if($('.on').length) {
        $("#info").hide();
    }
    else {
    $("#info").addClass("alert alert-success");
    $("#info").css("text-align", "center");
    $("#info").text("You’ve won!");
    $("#info").show();
    }
    }
    else {
        alert("You already won! No more lights can be changed. Please start a new game.");
    }
    });

});

function color(element) {
    if (element.css('background-color')=="rgb(255, 255, 0)") {
        element.toggleClass("on off");
        return "black";
    }
    else {
        element.toggleClass("off on");
        return "yellow";
    }
}


function check(w,h,d) {
    for (var i=0; i<d.length; i++) {
        if (d[i][0]==w && d[i][1]==h) {
            //console.log(d[i][0])
            //console.log(d[i][1])
            return "true";
        }
    }
    return "false";
}

