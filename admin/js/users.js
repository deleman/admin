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
    $('#term_name').css('border','none')       
    //get current selection value
    selected_termname=$("#term_name").val();    
    
    //if selected value is valid
    let numbers = selected_termname.split('_');

    
    if(parseInt(numbers[0]) || parseInt(numbers[0]) == 0){
        if(parseInt(numbers[1]) || parseInt(numbers[1]) == 0){
            $.ajax({
                url: "edit_process.php",
                method: "POST",
                data: { term_name:selected_termname },
                dataType: "html"
            })
            // if data was successfully reutrned
            .done(function(data) {
                //if table data is exist
                if(data){
                    modal('اخطار !!', 'bg-warning', 'حدول شما از قبل وجود دارد. اطلاعات جدید به آن اظافه میشود..', '',true)
                    
                }else{
                    let agree = `<button type="button" class="btn btn-primary ml-auto mr-1 px-5" name="${selected_termname}" onclick="create(this.name)">تایید</button>
                                </div>
                            </div>
                            </div>
                        </div>`;
                    $("body").append((modalStart + selected_termname + modalEnd + agree))
                    $('#exampleModal').modal();
                }
        
                /*
                * whatevet table exist of not exist
                * using function get all information table selected
                */
               show_informtion_table(selected_termname);
               
               setTimeout(() => {
                let table = document.querySelector('table');
                table.scrollTo(1000,0);  
               }, 3000);
               //scroll to left
               
                
                
            })
            .fail(function() {
                console.log( "error" );
            })
            .always(function() {
                // alert( "complete" );
            });
        }else{
        }
    }else{
    }
   

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
        <input id="nazari${random}" class="form-control" style="min-width:50px !important;"  type="text">
    </td>
    <td>
        <input id="amali${random}" class="form-control " style="min-width:50px !important;"  type="text">
    </td>
    <td>
        <input id="pishniaz${random}" class="form-control" style="min-width:240px;"  type="text">
    </td>

    `;



    //create a conastant varable for add a new row
    let add = 'addition'
    $.ajax({
        url: "edit_process.php",
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

    supre=supre.filter(el => {
        if(el != name){
            return true;
        }
         })

    // let h = $(`tr[id=${name}]`).remove()

    //if input in tr with id name has content
    //then check if is in table
    //first input must be integer value
        
    let code = `#code${name}`;
    if(parseInt($(code).val())){

        if(( ( ( ($(code).val()).toString().length ) > 6 ) && ( ($(code).val()).toString().length) < 9 ) ) {
            
            //set a ajax request to server
            $(code).css('border','none')  
            
            $.ajax({
                url: "edit_process.php",
                method: "POST",
                data: { remove: [$(code).val(),$("#term_name").val()]},
                dataType: "html"
            })
            // if data was successfully reutrned
            .done(function(data) {
                if(data){
                    modal(name, 'bg-success', 'رکورد مورد نظر شما با موفقیت حذف شد', '',true)
                    //refresh information
                    show_informtion_table($('#term_name').val());
                }else{
                    let h = $(`tr[id=${name}]`).remove()

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
            $(code).attr('title','کد درس باید بین 6 تا 9 عدد باشد'); 
            let h = $(`tr[id=${name}]`).remove()
        }
    }else{
        // set error to ture
        error = true

        $(code).css('border','1px solid red')   
        $(code).attr('title','مقدار کد درس باید عدد باشد');   
        let h = $(`tr[id=${name}]`).remove()      
    }

}

/***
 * agree to create a new table
 * first => creae a table
 * second=> insert term_name into table years
 */
function create(name){
    $.ajax({
        url: "edit_process.php",
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




/**
 * save information inseted by admin
 * save into table year
 * 
 */
//define a array infomations

$('#saveInfo').click(function(){
    let All=Array();
    let save_term =  $("#term_name").val();    
    let error = false
    supre.forEach(element => {
        let infos=Array()

        //first input must be integer value
        
        let code = `#code${element}`;
        if(parseInt($(code).val())){

            if(( ( ( ($(code).val()).toString().length ) > 6 ) && ( ($(code).val()).toString().length) < 9 ) ) {
                infos.push($(code).val());
                $(code).css('border','none')   
                
            }else{
                // set error to ture
                error = true

                $(code).css('border','1px solid red')   
                $(code).attr('title','کد درس باید بین 6 تا 9 عدد باشد'); 
            }
        }else{
            // set error to ture
            error = true

            $(code).css('border','1px solid red')   
            $(code).attr('title','مقدار کد درس باید عدد باشد');         
        }

        //admin can insert any thing
        let name = `#name${element}`;
        infos.push($(name).val());

        //unit value must be integer value
        let nazari = `#nazari${element}`;
        //must less than 5
        //must integer
        if(parseInt($(nazari).val())){
            if(parseInt(($(nazari).val()))<5){
                
                //if amali has content too
                let amali = `#amali${element}`;
                if($(amali).val().length > 0){
                    // set error to ture
                    error = true
                    $(amali).css('border','1px solid red')   
                    $(amali).attr('title','باید یکی از واحد های نظری با عملی را پر کنید.'); 
                }else{

                    infos.push($(nazari).val());
                    infos.push(null);
                    $(nazari).css('border','none')   
                    $(amali).css('border','none')   
                }

            }else{
                // set error to ture
                error = true
            
                $(nazari).css('border','1px solid red')   
                $(nazari).attr('title','مقدار واحد نظری باید کمتر از 5 باشد'); 
            }
        }else{
            // check if amali has any content

            if($(nazari).val().length > 0){
                // set error to ture
                error = true
                
                $(nazari).css('border','1px solid red')   
                $(nazari).attr('title','واحد نظری باید عدد باشد');  
            }else{
                //does not have content
            

                //unit value must be integer value
                let amali = `#amali${element}`;
                if(parseInt($(amali).val())){
                    if(parseInt(($(amali).val()))<5){
                        infos.push($(amali).val());
                        infos.push(null);
                        $(amali).css('border','none')   
                        $(nazari).css('border','none')   

                    }else{
                        // set error to ture
                        error = true
                    
                        $(amali).css('border','1px solid red')   
                        $(amali).attr('title','مقدار واحد عملی باید کمتر از 5 باشد'); 
                    }
                }else{
                    // set error to ture
                    error = true
                    
                    $(amali).css('border','1px solid red')   
                    $(amali).attr('title','واحد عملی باید عدد باشد');         
                }
            }
       
        }
    
        
       

        let pishniaz = `#pishniaz${element}`;
        infos.push($(pishniaz).val());

        let type = `#type${element}`;
        if($(type).val() == 'نوع کتاب'){
           // set error to ture
           error = true
            
           $(type).css('border','1px solid red')   
           $(type).attr('title','نوع باید انتخاب شود'); 
        }else{

            infos.push($(type).val());
            $(type).css('border','none')   

        }

        //inset all inot all array
        All.push(infos)
    });
    // push term name of table 
    All.push(save_term);

    //fileter in table name doesnt selected
    if( ( save_term.toString().length > 6 ) ){
        $('#term_name').css('border','1px solid red')   
        setTimeout(() => {
            modal('خطا !!', 'bg-danger', 'حدول مورد نظر خود را انتخاب کنید ',true)     
        }, 1000);
    }else if(error == true){
        $('#term_name').css('border','none')   
        setTimeout(() => {
            modal('خطا !!', 'bg-danger', 'برای نمایش ارور روی آن اشاره کنید ',true)     
        }, 1000);
    }else{        
        $('#term_name').css('border','none')           
        //sending infomation by ajax 

        $.ajax({
            url: "edit_process.php",
            method: "POST",
            data: { save: All },
            dataType: "html"
        })
        // if data was successfully reutrned
        .done(function(data) {
            /***
             * if informations was inserted remove rows contain informations
             * first => remove rows 
             * then => create three empty row with fresh code
             */
            //first remove all rows
            supre.filter(element => {
                $("#"+element).remove();
            });


            //then show all informions 
            show_informtion_table(save_term);
            
            
            modal(name, 'bg-primary', 'اطلاعات شما با موفقیت ثبت شد.', '',true)
        })
        .fail(function() {
            console.log( "error" );
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
 

/**
 * function for default row for desplay at begining load page
 */
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
        <input id="nazari${random}" class="form-control " style="min-width:50px !important;"   type="text">
    </td>
    <td>
        <input id="amali${random}" class="form-control " style="min-width:50px !important;" type="text">
    </td>
    <td>
        <input id="pishniaz${random}" class="form-control" style="min-width:240px !important;"  type="text">
    </td>

    `;



    //create a conastant varable for add a new row
    let add = 'addition'
    $.ajax({
        url: "edit_process.php",
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



/**
 * function for show all informations table selected by admin
 * using this information whern user or admin select table name in selection
 * using it in change event selection table names
 */
function show_informtion_table(selected_table){

    /*
    * sent selected table to the server
    * sent request for loading all information was inserted in table selected
    */
    $.ajax({
        url: "edit_process.php",
        method: "POST",
        data: { table_selected : selected_table},
        dataType: "html"
    })
    // if data was successfully reutrned
    .done(function(data) {
        console.log('data=> ' + data)
        //convert sting to array with (,) charachter
        //split hole string
        let row= data.split(',');
            row.pop()

        //define allinfo varable
        let allInfo= [];

        //convert row string to array with (-)  character
        row.forEach(element => {
            
            allInfo.push(element.split('-'));
        });


        //if data returned has somecontent remove default empty rows
        if(allInfo.length > 0){
            /*
            * if information was returned
            * remove all super datas
            */
            if(supre.length){
                supre=Array();
            }

            $('table tbody tr').remove();

            //show information in page
            //show in page using function defaultRowsWithInfo
            //show evety row informations with info
            allInfo.forEach(row => {
                defaultRowsWithInfo(row);
            });

        }else{
            //else dont remove empty default rows
            $('table tbody tr').remove();

            defaultRows();
            defaultRows();
            defaultRows();
        }
        


        
        

    })
    .fail(function() {
        console.log('errro eccured in return all information table selected.');
    })
    .always(function() {
        // alert( "complete" );
    });

}


/**
 * function for create a row with array informations
 * show one row with info in page
 * sent info is array
 */
function defaultRowsWithInfo(info){
    //scroll to down
    scrollWin()
    
    //create a random numbers
    let random = Math.random(0,1000).toString().slice(3,12)
    supre.push(random)

    //condition for number zero
    if(info[3]=='0'){
        info[3] = '';
    }
    if(info[2]=='0'){
        info[4] = ''
    }

    let addRow = `
    <td>
        <input id="code${random}" class="form-control" value="${info[0]}" type="text"  style="min-width:100px;">
    </td>
    <td>
        <input id="name${random}" class="form-control" value="${info[1]}" type="text" style="min-width:120px;">
    </td>
    <td>
        <input id="nazari${random}" class="form-control " value="${info[2]}" style="min-width:50px !important;"   type="text">
    </td>
    <td>
        <input id="amali${random}" class="form-control " value="${info[3]}" style="min-width:50px !important;" type="text">
    </td>
    <td>
        <input id="pishniaz${random}" class="form-control" value="${info[4]}" style="min-width:240px !important;"  type="text">
    </td>

    `;



    //create a conastant varable for add a new row
    let add = 'addition'
    $.ajax({
        url: "edit_process.php",
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
            let selected = null;
            if(element == info[5]){
                selected = 'selected';
            }
            td += `<option value="${element}" ${selected} > ${element}</option>`;
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
