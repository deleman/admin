/***
 *supre array for sote all gerated key  
 */ 
let supre=Array();

/***
 * define a variable modal warnng
 */
let modalStart = `
<div class="modal fade " id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header bg-warning ">
        <h5 class="modal-title m-auto" id="exampleModalLabel" >`;
let modalEnd=`</h5>
        <button type="button" class="close float-right" style="position:absolute;" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-right">
        جدول انتخابی شما وجود ندارد آیا میخواهی آن را بسازی؟
      </div>
      <div class="modal-footer text-right">
        <button type="button" class="btn btn-secondary mr-auto ml-1 px-4" data-dismiss="modal">بستن</button>
        `;


/**
 * function for scroll down by clcking on button
 * 
*/
function scrollWin() {
    window.scrollTo(0, 5000);
}


/***
 * remove curent row by clicking a button remove
 * removing a elemnt by clicking onit
 */
function Remove(name){

    supre=supre.filter(el => {
        if(el != name){
            return true;
        }
         })

    // let h = $(`tr[id=${name}]`).remove()

    //if input in tr with id name has content
    //then check if is in table
    //first input must be integer value
        
    let code = `#table${name}`;
    console.log('value is ' + $(code).val())


        if(( ( ( ($(code).val()).toString().length ) >7  ) && ( ($(code).val()).toString().length) < 11 ) ) {
            
            //set a ajax request to server
            $(code).css('border','none')  
            
            $.ajax({
                url: "table_process.php",
                method: "POST",
                data: { removeTable: $(code).val()},
                dataType: "html"
            })
            // if data was successfully reutrned
            .done(function(data) {
                alert(data)
                if(data){
                    console.log(data)
                    // modal(name, 'bg-success', 'رکورد مورد نظر شما با موفقیت حذف شد', '',true)
                    //refresh information
                    get_all_tables()
                }else{
                     $(`tr[id=${name}]`).remove()

                }

            })
            .fail(function() {
                console.log( "error" );
            })
            .always(function() {
                // alert( "complete" );
            });

            
        }else{
            // set error to ture
            error = true

            $(code).css('border','1px solid red')   
            $(code).attr('title','جدول مورد نظر شما وحود ندارد'); 
            let h = $(`tr[id=${name}]`).remove()
        }
   

}

/***
 *sample ajax method
 */
function create(name){
    $.ajax({
        url: "table_process.php",
        method: "POST",
        data: { create: name},
        dataType: "html"
    })
    // if data was successfully reutrned
    .done(function(data) {

        modal(name, 'bg-success', 'جدول شما با موفقیت ساخته شد.', '',true)
    })
    .fail(function() {
        console.log( "error" );
    })
    .always(function() {
        // alert( "complete" );
    });
}


/***
 * cusome function modal for easy to use
 */
 function modal(htext, hcolor, btext = null, bcolor =null,justwarning=false){
     let randomId = 'mo'+ Math.random(0,40).toString().slice(3,10);
     let modalFirst = `
     <div class="modal fade " id="${randomId}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header ${hcolor}">
        <h5 class="modal-title m-auto" id="exampleModalLabel" >${htext}</h5>
        <button type="button" class="close float-right" style="position:absolute;" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-right ${bcolor}">
         ${btext}
      </div>`;
      
      let modalEnd = `
                </div>
            </div>
            </div>`;
        if(justwarning == true){
            $('.modal').modal('hide');
            $('body').append(modalFirst + modalEnd);
            $('#'+randomId).modal();
            setTimeout(() => {
                $('.modal').modal('hide');
            }, 4000);

            

        }else{
            $('.modal').modal('hide');
            $('body').append(modalFirst + modalEnd);
            $('#'+randomId).modal();
            setTimeout(() => {
                $('.modal').modal('hide');
            }, 4000);

        }
}


 /***
     * function for get all tables
     * using this function when page ready to load
     */
    function get_all_tables(){
        $("table tbody tr").remove();
        let name= 'showTables';

        $.ajax({
            url: "table_process.php",
            method: "POST",
            data: { showTables: name},
            dataType: "html"
        })
        // if data was successfully reutrned
        .done(function(data) {

            //convert string to array
            let tables = (data).split(',');

            //remove last elemnt from array
            tables.pop();

            tables.forEach(table => {
                showTable(table);
            });

            // modal(name, 'bg-success', 'جدول شما با موفقیت ساخته شد.', '',true)
        })
        .fail(function() {
            console.log( "error" );
        })
        .always(function() {
            // alert( "complete" );
        });

    }


/***
 * autoload section for generate three fow for insert informations by default
 * 
 */

$(document).ready(function(){
    //show all tables
    get_all_tables();
});
 

/**
 * function for create a row with array informations
 * show one row with info in page
 * sent info is array
 */
function showTable(info){
    //scroll to down
    scrollWin()
    
    //create a random numbers
    let random = Math.random(0,1000).toString().slice(3,12)
    supre.push(random)


    let addRow = `
    <td>
        <input id="code${random}" class="form-control" disabled value="جدول " type="text"  style="min-width:100px;">
    </td>
    <td>
        <input id="name${random}" class="form-control" disabled value="ورودی سال" type="text" style="min-width:120px;">
    </td>
    <td>
        <input id="table${random}" class="form-control " disabled value="${info}" style="min-width:50px !important;"   type="text">
    </td>
  
    `;


    //create a conastant varable for add a new row
    let add = 'addition'
    $.ajax({
        url: "table_process.php",
        method: "POST",
        data: { addRow:add },
        dataType: "html"
    })
    .done(function(data) {
        let types = data.split(',');
        types.pop();
        //row start 
        let rowStart = `<tr id="${random}">`;

        
                
    
        
        let tdEnd =` 
                </td>
                </tr>`;

        // td for remove 
        let tdRemove = `<td><button class="btn btn-danger" id="remove" onclick="Remove(this.name)" name="${random}">remove</button></td>`;

        //join and concat all slice of data should be appen to tbody table
        let allInfo = rowStart + addRow + tdRemove + tdEnd;
        $("#tbody").append(allInfo);
    
        //scroll todown
        scrollWin()
        
    })
    .fail(function() {
        console.log( "error" );
    })
    .always(function() {
    });
   

}
