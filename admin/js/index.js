$(document).ready(function(){
    var bookCount ={name:96};
    $("#add_selection").click(function(e){
        e.preventDefault();
        add_inputs("#intry",bookCount,"process.php");
    });

    //show term name

    // add_inputs("#term_name",bookCount,"term_name.php");
    $('#closealert').click(function(){
        alert('ho');
    })


    // $("button").click(function(){
    //     $.ajax({url: "demo_test.txt", success: function(result){
    //       $("#div1").html(result);
    //     }});
    //   });

    selectChange("#intry","#term_name","#intry");
    selectChange("#intry","#term_name","#term_name");
    // selectChange('#myselect');


//function selection ajax change options
function selectChange(id1,id2,id3){
    if(id1==id3)
        $(id1).change(function(){
            bookCount.name=96;
            //remove all
            remove_inputs();
            get_ajax_info(id1,id2,bookCount);

        });

    if(id2==id3)
        $(id2).change(function(){
            bookCount.name=96;
            //remove all
            remove_inputs();
            get_ajax_info(id1,id2,bookCount);

        });
}

    //finish jquery
});
function addBook(bookCount){
    bookCount.name+=1;
    return String.fromCharCode(bookCount.name);
}

//function for append input books
function create_inputs(s,bookCount){
    let input;
    input='<div class="alert alert-warning alert-dismissible fade show" role="alert">';
        input+='<select class="custom-select" name="a[]" id="inputGroupSelect02">';
            input+=s;
        input+='</select>';
        input+='<button type="button" class="close" data-dismiss="alert" id="closealert" aria-label="Close">';
            input+='<span aria-hidden="true">&times;</span>';
        input+='</button>';

    input+='</div>';
    /************************** */

        $(input).appendTo(".remove_inputs");
}

function remove_inputs(){
    $(".remove_inputs").children().remove();
}

function get_ajax_info(id1,id2,bookCount){
    let a = $( id1+" option:selected" ).val();
    let b = $(id2+" option:selected" ).val();
    console.log(a,b);
    $.ajax({
        method: "POST",
        url: "process.php",
        data: { name: a,term_name: b}
      })
        .done(function( msg ) {

            console.log(msg);
            let data =msg.split(',');
            //console.log(data);
            //console.log(data.length);
            let s;
                for(let i=0;i<=data.length;i+=7){
                    let r='';
                    let code='';
                    for(let j =i;j<i+7;j++){
                        if(j%7 ==0){
                            code=data[j];
                        }else{
                            
                            r+=data[j]+" - ";
                        }
                        // r+=data[j]+'('+j+')'+" - ";
                    }
                        s+="<option value='"+code+"'>"+r+"</option> ";

                }
                create_inputs(s,bookCount);
                create_inputs(s,bookCount);
                create_inputs(s,bookCount);

           
            // alert(msg);
        });
}

//get input selection with ajax from process.php
function add_inputs(id,bookCount,href){
    let a = $( id+" option:selected" ).val();
    let b = $("#term_name option:selected" ).val();

    //console.log(a);
    $.ajax({
        method: "POST",
        url: href,
        data: { name: a,term_name: b}
      })
        .done(function( msg ) {
            //console.log(msg);
            let data =msg.split(',');
            //console.log(data);
            //console.log(data.length);
            let s;
                for(let i=0;i<=data.length;i+=7){
                    let r='';
                    let code='';
                    for(let j =i;j<i+7;j++){
                        if(j%7 ==0){
                            code=data[j];
                        }else{
                            
                            r+=data[j]+" - ";
                        }
                        // r+=data[j]+'('+j+')'+" - ";
                    }
                        s+="<option value='"+code+"'>"+r+"</option> ";

                }
                create_inputs(s,bookCount);

           
            // alert(msg);
        });
}


