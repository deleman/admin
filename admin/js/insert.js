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
 * send informations form select select year term name to server
 */
let selected_termname;
$("#term_name").change(function(){
    selected_termname=$("#term_name").val();    
    $.ajax({
        url: "insert_process.php",
        method: "POST",
        data: { term_name:selected_termname },
        dataType: "html"
    })
    // if data was successfully reutrned
    .done(function(data) {
        //if table data is exist
        if(data){
            alert('true')
        }else{
            let agree = `<button type="button" class="btn btn-primary ml-auto mr-1 px-5" name="${selected_termname}" onclick="create(this.name)">تایید</button>
                        </div>
                    </div>
                    </div>
                </div>`;
            $("body").append((modalStart + selected_termname + modalEnd + agree))
            $('#exampleModal').modal();
        }
    })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
        // alert( "complete" );
    });

})


/***
 * create row by clicking a button
 * adding a new row for insert informatiosn
 */

$("#addRow").click(function(e){
    e.preventDefault();
    scrollWin()
    
    //create a random numbers
    let random = Math.random(0,1000).toString().slice(3,12)
    supre.push(random)

    let addRow = `
    <td>
        <input id="code${random}" class="form-control"  type="text">
    </td>
    <td>
        <input id="name${random}" class="form-control"  type="text">
    </td>
    <td>
        <input id="nazari${random}" class="form-control w-50"  type="text">
    </td>
    <td>
        <input id="amali${random}" class="form-control w-50"  type="text">
    </td>
    <td>
        <input id="pishniaz${random}" class="form-control" style="min-width:240px;"  type="text">
    </td>

    `;



    //create a conastant varable for add a new row
    let add = 'addition'
    $.ajax({
        url: "insert_process.php",
        method: "POST",
        data: { addRow:add },
        dataType: "html"
    })
    .done(function(data) {
        let types = data.split(',');
        types.pop();
        //row start 
        let rowStart = `<tr id="${random}">`;

        //create a td or cell table thant contain book types
        let tdStart =`
        <td class="" style="min-width:135px;">
            <select class="custom-select custom-select-sm"  id="type${random}">
                <option selected>نوع کتاب</option>`;
                
        //operation on option based on returned value fro serever
        let td='';
        types.forEach(element => {
            td += `<option value="${element}" > ${element}</option>`;
        });  
        
        let tdEnd =` 
            </select>
        </td>
        </tr>`;

        // td for remove 
        let tdRemove = `<td><button class="btn btn-danger" id="remove" onclick="Remove(this.name)" name="${random}">remove</button></td>`;

        //join and concat all slice of data should be appen to tbody table
        let allInfo = rowStart + addRow + tdStart + td + tdRemove + tdEnd;
        $("#tbody").append(allInfo);
    
        scrollWin()
        
    })
    .fail(function() {
        console.log( "error" );
    })
    .always(function() {
    });

})


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
    console.log(supre)
    supre=supre.filter(el => {
        if(el != name){
            return true;
        }
         })

    console.log(supre)

    let h = $(`tr[id=${name}]`).remove()

}

/***
 * agree to create a new table
 * first => creae a table
 * second=> insert term_name into table years
 */
function create(name){
    
    $.ajax({
        url: "insert_process.php",
        method: "POST",
        data: { create: name},
        dataType: "html"
    })
    // if data was successfully reutrned
    .done(function(data) {
        console.log(data)
        modal(name, 'bg-success', 'جدول شما با موفقیت ساخته شد.', '',true)
    })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
        // alert( "complete" );
    });
}




/**
 * save information inseted by admin
 * save into table year
 * 
 */
//define a array infomations
let All=Array();

$('#saveInfo').click(function(){
    console.log(supre); 
    let save_term =  $("#term_name").val();    
    
    supre.forEach(element => {
        let infos=Array()
        let code = `#code${element}`;
        infos.push($(code).val());

        let name = `#name${element}`;
        infos.push($(name).val());

        let nazari = `#nazari${element}`;
        infos.push($(nazari).val());

        let amali = `#amali${element}`;
        infos.push($(amali).val());

        let pishniaz = `#pishniaz${element}`;
        infos.push($(pishniaz).val());

        let type = `#type${element}`;
        infos.push($(type).val());
        All.push(infos)
    });
    // push term name of table 
    All.push(save_term);

    //fileter in table name doesnt selected
    if(save_term.toString().length>6){
        modal('خطا !!', 'bg-danger', 'حدول مورد نظر خود را انتخاب کنید ',true)        
    }else{        
        
        console.log('array infos',All)
        
        //sending infomation by ajax 
        $.ajax({
            url: "insert_process.php",
            method: "POST",
            data: { save: All },
            dataType: "html"
        })
        // if data was successfully reutrned
        .done(function(data) {
            console.log(data)
            modal(name, 'bg-success', 'جدول شما با موفقیت ساخته شد.', '',true)
        })
        .fail(function() {
            alert( "error" );
        })
        .always(function() {
            // alert( "complete" );
        });
    }

});



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
 * autoload section for generate three fow for insert informations by default
 * 
 */

$(document).ready(function(){
    defaultRows();
    defaultRows();
    defaultRows();
});
    
function defaultRows(){
    //scroll to down
    scrollWin()
    
    //create a random numbers
    let random = Math.random(0,1000).toString().slice(3,12)
    supre.push(random)

    let addRow = `
    <td>
        <input id="code${random}" class="form-control"  type="text">
    </td>
    <td>
        <input id="name${random}" class="form-control"  type="text">
    </td>
    <td>
        <input id="nazari${random}" class="form-control w-50"  type="text">
    </td>
    <td>
        <input id="amali${random}" class="form-control w-50"  type="text">
    </td>
    <td>
        <input id="pishniaz${random}" class="form-control" style="min-width:240px;"  type="text">
    </td>

    `;



    //create a conastant varable for add a new row
    let add = 'addition'
    $.ajax({
        url: "insert_process.php",
        method: "POST",
        data: { addRow:add },
        dataType: "html"
    })
    .done(function(data) {
        let types = data.split(',');
        types.pop();
        //row start 
        let rowStart = `<tr id="${random}">`;

        //create a td or cell table thant contain book types
        let tdStart =`
        <td class="" style="min-width:135px;">
            <select class="custom-select custom-select-sm"  id="type${random}">
                <option selected>نوع کتاب</option>`;
                
        //operation on option based on returned value fro serever
        let td='';
        types.forEach(element => {
            td += `<option value="${element}" > ${element}</option>`;
        });  
        
        let tdEnd =` 
            </select>
        </td>
        </tr>`;

        // td for remove 
        let tdRemove = `<td><button class="btn btn-danger" id="remove" onclick="Remove(this.name)" name="${random}">remove</button></td>`;

        //join and concat all slice of data should be appen to tbody table
        let allInfo = rowStart + addRow + tdStart + td + tdRemove + tdEnd;
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