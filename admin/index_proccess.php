<?php
require_once ('index_p_class.php');
$index = new sign();

//get all submited informations
if(isset($_POST['submit_sign_in'])){
    //check if data is validate or user is admin
    if($index->is_user_admin($_POST)){
        //redirect process
        $errors =$index->show_errors($_POST);
                                        
        //start session admin
        $_SESSION['admin'] = md5('admin');

    }else{

        $errors =$index->show_errors($_POST);
        $url = 'index.php?alert='.$errors[0];
        $index->redirect_with_cond($url,true);
        $index->redirect_with_cond('index.php?alert=warning',true);

    }
    
    

}else{


}