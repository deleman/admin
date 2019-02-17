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

        // first -> create a table 
        //then -> alter table -- change id to primary key and auto_increment
        $table_name = trim(htmlspecialchars(htmlentities($table_name)));
        $table_name = 'year_'.$table_name;
        $sql = " CREATE TABLE $table_name SELECT * FROM SAMPLE;";
        $this->pdo->query($sql);        
        
        if($this->pdo->execute()){

            //alter table to auto increment and priamry key
            $sql = "ALTER TABLE `$table_name` CHANGE id id int PRIMARY KEY AUTO_INCREMENT;";
            $this->pdo->query($sql);        
            return $this->pdo->execute();

        }else{
            return false;
        }
    }
    /***
     * function for insert table created does not exist now
     * 
     */
    public function insert($table_name){
        $sql = 'INSERT INTO term_name(name) values(:term_name)';
        $this->pdo->query($sql);
        $this->pdo->bind(':term_name',$table_name);
        return $this->pdo->execute();
    }


    /***
     * function for insert informations into table
     */
    public function insert_informations($table_name,$info){
        $table_name = 'year_'.htmlspecialchars(htmlentities(trim($table_name)));
        echo '***************************';

        try {
            $sql = "INSERT INTO `$table_name` ( `book_code`, `book_name`, `Theoretical_unit`, `Practical_unit`, `prerequisite`, `book_type`) VALUES (?,?,?,?,?,?)";
        $this->pdo->query($sql);
        return $this->pdo->execute($info);

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }



}