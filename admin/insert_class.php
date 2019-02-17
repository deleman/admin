<?php
require_once('./lib/database.php');

class insert{
    private $pdo;
    public $term_name;
    public function __construct(){
        $this->pdo= new Database();
    }
    /**
     * function for return all term_name of year term name
     */
    public function get_all_termnames(){
        $sql = "SELECT * FROM term_name";
        $this->pdo->query($sql);
        $result = $this->pdo->resultSet();
        if(count($result)){
            $term_names = Array();
            foreach ($result as $key => $value) {
                array_push($term_names,$value->name);
            }
            return $term_names;

        }else{
            return Array();
        }
    }

    /***
     * return all value of enum type in database
     * return all book type in table 
     */
    
    public function get_all_enumtypes(){
        $sql = "select substr(column_type,5) as types from information_schema.columns where table_schema='u1' AND TABLE_NAME='year_94_95' AND COLUMN_NAME='book_type'";
        $this->pdo->query($sql);
        $result = $this->pdo->resultSet();
        if(count($result)){
            $string = str_replace('(','',$result[0]->types);
            $string = str_replace(')','',$string);
            $types = Array();
            $types = explode(',',$string);
            return $types;
        }else{
            return Array();
        }
    }


    /***
     * function for create table does not exist now
     */
    public function create($table_name){
        $table_name = trim(htmlspecialchars(htmlentities($table_name)));
        $table_name = 'year'.$table_name;
        $sql = "CREATE TABLE $table_name SELECT * FROM SAMPLE";
        $this->pdo->query($sql);        
        $this->pdo->execute();
    }




}