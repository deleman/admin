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
    })
    .fail(function() {
        console.log( "error" );
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

    supre=supre.filter(el => {
        if(el != name){
            return true;
        }
         })

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
        let amali = `#amali${element}`;

        //must less than 5
        //must integer
        if(parseInt($(nazari).val())){
            if(parseInt(($(nazari).val()))<5){
        
                //if amali was inserted
                if(($(amali).val())){
                    $(nazari).css('border','1px solid red')   
                    $(nazari).attr('title','باید یکی از واحد های نظری یا عملی پر شود'); 
        
                    $(amali).css('border','1px solid red')   
                    $(amali).attr('title','باید یکی از واحد های نظری یا عملی پر شود'); 
                }else{
                    //clear warning 
                    $(nazari).css('border','none') 
                    $(amali).css('border','none') 
        
                    infos.push($(nazari).val());
                    infos.push($(amali).val());
        
                }
                
                 
                
            }else{
                // set error to ture
                error = true
            
                $(nazari).css('border','1px solid red')   
                $(nazari).attr('title','مقدار واحد نظری باید کمتر از 5 باشد'); 
            }
        }else{
            // set error to ture
            
            //if nazari value does not inserted
            /******************************/
            //unit value must be integer value
            
            if(parseInt($(amali).val())){
                if(parseInt(($(amali).val()))<5){
                    
                    //clear warning 
                    $(nazari).css('border','none') 
                    $(amali).css('border','none') 
        
                    infos.push($(nazari).val());
                    infos.push($(amali).val());
        
                }else{
                    // set error to ture
                    error = true
                
                    $(amali).css('border','1px solid red')   
                    $(amali).attr('title','مقدار واحد عملی باید کمتر از 5 باشد'); 
                }
            }else{
                // set error to ture
                error = true
                
                $(nazari).css('border','1px solid red')   
                $(nazari).attr('title','باید یکی از واحد های نظری یا عملی پر شود'); 
        
                $(amali).css('border','1px solid red')   
                $(amali).attr('title','باید یکی از واحد های نظری یا عملی پر شود');  
                       
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
        console.log(infos)
        //inset all inot all array
        All.push(infos)
    });
    // push term name of table 
    All.push(save_term);

    //fileter in table name doesnt selected
    if( ( save_term.toString().length > 6 ) ){
        setTimeout(() => {
            modal('خطا !!', 'bg-danger', 'حدول مورد نظر خود را انتخاب کنید ',true)     
        }, 1000);
    }else if(error == true){
        setTimeout(() => {
            modal('خطا !!', 'bg-danger', 'برای نمایش ارور روی آن اشاره کنید ',true)     
        }, 1000);
    }else{        
        alert('some thing')
        //sending infomation by ajax
        console.log('all informations before send with ajax')
        console.log(All);
        $.ajax({
            url: "insert_process.php",
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
            console.log(data)
            //then create three fresh rows
            defaultRows();
            defaultRows();
            defaultRows();

            
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