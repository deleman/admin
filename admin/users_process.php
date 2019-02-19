<?php
require_once ('./users_class.php');

//create a instatnce form class insert 
$insert = new insert();

/**
 * listern for ajax request from change select year term_name
 * 
 */
if(isset($_POST['term_name'])){
    $info = trim(htmlspecialchars($_POST['term_name']));
    $all_years = $insert->get_all_termnames();
    if (in_array($info, $all_years)){
        //was found
        echo true;
    }else{
        //doesnt found
        echo false;
    }
}


/**
 * listern for ajax request from add row for insert infomations
 */
if(isset($_POST['addRow'])){
    if($_POST['addRow'] =='addition'){
        foreach($insert->get_all_enumtypes() as $value){
            echo str_replace("'",'',$value).','; 
        }
    }else{
        echo 'no it isnt';
    }
}


/***
 * listern for ajax request from create table does not exitst
 * 
 */
if(isset($_POST['create'])){

    $resultOne = $insert->create($_POST['create']);
    $resultTwo = $insert->insert($_POST['create']);
    if($resultOne && $resultTwo){
        echo 'successfully table was created';
    }else{
        echo 'erro was eccured';
    }
}


/**
 * listen for ajax requrest from save infromations input by admin
 */
if(isset($_POST['save'])){
    //get last element of post array
    $save_term = array_pop($_POST['save']);
    echo count($_POST['save']);
    //insert every element into table
    foreach ($_POST['save'] as $key => $value) {
        $result = $insert->update_informations($save_term,$value);
        if($result){
            echo 'updated.';
        }else{
            echo 'doesnt updated.';
        }
    }

}


/***
 * listen for ajax requerst from show_all informations table selected by admin
 * get all informations from table selected
 */
if(isset($_POST['table_selected'])){
    
    //all informations

    //validate post data
    $selected_table = htmlspecialchars(htmlentities(trim($_POST['table_selected'])));
    
    //show informations returned
    echo $insert->get_all_editInformations($selected_table);
}


/***
 * listen for ajax requerst remove sepicefic row or record from table
 * if exist in table remove it
 */
if(isset($_POST['remove'])){
    $data = $_POST['remove'];
    $data[0] = htmlspecialchars(htmlentities(trim($data[0])));
    $data[1] = htmlspecialchars(htmlentities(trim($data[1])));
    echo $insert->remove_row($data[1],$data[0]);
}

if(isset($_GET['home'])){
    echo '<pre>';
    print_r($insert->get_all_tables());

    echo '</pre>';

}