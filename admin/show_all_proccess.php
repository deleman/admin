<?php
require_once('./lib/database.php');
require_once('./submit_process.php');

class show_general_info{
    private $pdo;
    public $term_name;
    public function __construct(){
        $this->pdo= new Database();
    }

    //get all userid from table bookinformations

public function get_all_user_ids(){
        $sql = "SELECT * FROM books_info";
        $this->pdo->query($sql);
        // $this->pdo->bind(':user_id',$_SESSION['user_id']);
        $result = $this->pdo->resultSet();
        if(count($result)){
            $info = Array();
            foreach ($result as $key => $value) {
            
                array_push($info,$value->user_id);  
                
            }
            
            return $info;
        }else{
            return Array();
        }
    }


//get all code books informatios by user_id
//گرفتن تمام کد های کتاب ها بر اساس کد کاربری
public function show_book_ids($user_id){
    $user_id = $this->validate($user_id);
    $sql = "SELECT * FROM books_info WHERE user_id = :user_id";
    $this->pdo->query($sql);
    $this->pdo->bind(':user_id',$user_id);
    $result = $this->pdo->resultSet();
    if(count($result)){
        $all= Array();
        $info = Array();
        foreach ($result as $key => $value) {
        
            array_push($info,$value->id);
            
            if($value->bokk_1){
                array_push($info,$value->bokk_1);
            }
            if($value->bokk_2){
                array_push($info,$value->bokk_2);  
            }
            if($value->bokk_3){
                array_push($info,$value->bokk_3);  
            }
            if($value->bokk_4){
                array_push($info,$value->bokk_4);
            }
            if($value->bokk_5){
                array_push($info,$value->bokk_5);
            }
            if($value->bokk_6){
                array_push($info,$value->bokk_6);
            }
            if($value->bokk_7){
                array_push($info,$value->bokk_7);
            }
            if($value->bokk_8){
                array_push($info,$value->bokk_8);
            }
            if($value->bokk_9){
                array_push($info,$value->bokk_9);
            }
            if($value->bokk_10){
                array_push($info,$value->bokk_10);    
            }
               
            
        }

        return $info;
    }else{
        return Array();
    }
}


public function show_my_informations_book_ids(){
    $count = count($this->get_all_user_ids());
    $h=Array();
    foreach($this->get_all_user_ids() as $key => $value){
       array_push($h,$this->show_book_ids($value));
    }
    return $h;
}  
public function show_all_book(){
    $count_users_id = count($this->get_all_user_ids());
    $users_id = $this->get_all_user_ids();
    $all=Array();
        
            foreach($this->show_my_informations_book_ids() as $key => $value){
                $count = count($value);
                $info =$value;
                for($i=0;$i<$count;$i++){
                    $r=$this->return_book_name($info[$i],$users_id[$key]);
                    array_push($all,$r);
                }
            
            }
    return $all;

}
public function get_year($user_id){
    $user_id = $this->validate($user_id);
    $sql = "SELECT term_name FROM books_info WHERE user_id = :user_id";
    $this->pdo->query($sql);
    $this->pdo->bind(':user_id',$user_id);
    $result = $this->pdo->resultSet();
    return ($result[0]->term_name);
}

//return book_name by book_id
public function return_book_name($book_id,$user_id){
    $book_id = $this->validate($book_id);
    $user_id = $this->validate($user_id);
    $this->term_name = $this->validate($this->term_name);
    $sql = "SELECT * FROM ".$this->get_year($user_id)." WHERE id = :id";
    $this->pdo->query($sql);
    $this->pdo->bind(':id',$book_id);
    $result = $this->pdo->resultSet();
    return ($result);
}

//validate input or variables
public function validate($user_id){
    return htmlspecialchars(htmlentities(trim($user_id)));
}


}

$init = new show_general_info();



$submit = new submit();









