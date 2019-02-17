
/**
 * send informations form select select year term name to server
 */
let selected_termname;
$("#term_name").change(function(){
    selected_termname=$("#term_name").val();
    alert(selected_termname);   
    
    $.ajax({
        url: "insert_process.php",
        method: "POST",
        data: { term_name:selected_termname },
        dataType: "html"
    })
    .done(function(data) {
        alert( "success" );
        alert(data)
    })
    .fail(function() {
        alert( "error" );
    })
    .always(function() {
        alert( "complete" );
    });

})


/***
 * create row by clicking a button
 * adding a new row for insert informatiosn
 */
let addRow = `
<td>
    <input id="book_code" class="form-control" type="text">
</td>
<td>
    <input id="book_name" class="form-control" type="text">
</td>
<td>
    <input id="book_nazari" class="form-control w-50" type="text">
</td>
<td>
    <input id="book_amali" class="form-control w-50" type="text">
</td>
<td>
    <input id="book_pishniaz" class="form-control" style="min-width:240px;" type="text">
</td>

`;

$("#addRow").click(function(e){
    e.preventDefault();
    scrollWin()
    
    //create a random numbers
    let random = Math.random(0,1000).toString().slice(3,12)

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
            <select class="custom-select custom-select-sm">
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
    
    let h = $(`tr[id=${name}]`).remove()

}


/**
 * save information inseted by admin
 * save into table year
 * 
 */