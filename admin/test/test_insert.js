if(parseInt($(nazari).val())){
    if(parseInt(($(nazari).val()))<5){

        //if amali was inserted
        let amali = `#amali${element}`;
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
        
        infos.push($(nazari).val());
        $(nazari).css('border','none') 
        
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
    let nazari = `#nazari${element}`;
    let amali = `#amali${element}`;
    
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





/**
 * original codes
 */
if(parseInt($(nazari).val())){
    if(parseInt(($(nazari).val()))<5){
        infos.push($(nazari).val());
        $(nazari).css('border','none') 
        
    }else{
        // set error to ture
        error = true
    
        $(nazari).css('border','1px solid red')   
        $(nazari).attr('title','مقدار واحد نظری باید کمتر از 5 باشد'); 
    }
}else{
    // set error to ture
    error = true
    
    $(nazari).css('border','1px solid red')   
    $(nazari).attr('title','واحد نظری باید عدد باشد');         
}


//unit value must be integer value
let amali = `#amali${element}`;
if(parseInt($(nazari).val())){
    
}else{
        if(parseInt($(amali).val())){
            if(parseInt(($(amali).val()))<5){
                infos.push($(amali).val());
                $(amali).css('border','none')   

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