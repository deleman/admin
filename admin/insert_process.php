<?php
require_once ('./insert_class.php');

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
    
}