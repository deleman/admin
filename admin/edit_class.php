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


    /***
     * get all information from year selected by admin for edit informations page
     * 
     */
    public function get_all_editInformations($year){
        $sql = "SELECT * FROM year_$year";
        $this->pdo->query($sql);
        $result = $this->pdo->resultSet();
        if(count($result)){
            $allInfo = Array();
            
            foreach ($result as $key => $value) {

                //local array for stroe instance informations
                $instance = Array(); 

                // [book_code] => 1234567
                array_push( $instance , $value->book_code);

                // [book_name] => 
                array_push( $instance , $value->book_name);
                
                // [Theoretical_unit] => 3
                array_push( $instance , $value->Theoretical_unit);

                // [Practical_unit] => 3
                array_push( $instance , $value->Practical_unit);

                // [prerequisite] => fdasf
                array_push( $instance , $value->prerequisite);

                // [book_type] => ا
                array_push( $instance , $value->book_type);

                
                //push all inctance array informatins into all array infos
                array_push($allInfo,$instance);
            }
            
            //define a string variabel for store all informations
            $allInformations = '';
            
            //convert and fit it to serve
            foreach ($allInfo as $key => $value) {
                $allInformations .= implode('-',$value) . ',';
            }

            return $allInformations;

        }else{
            return Array();
        }
    }


      /***
     * function for update information in table
     */
    public function update_informations($table_name,$info){
        $table_name = 'year_'.htmlspecialchars(htmlentities(trim($table_name)));

        try {
            // $sql = "UPDATE `$table_name` SET `model` = :model WHERE id = :id";

            $sql = "UPDATE `$table_name` SET";
            $sql .= " `book_code` = ? ,";
            $sql .= " `book_name` = ? ,";
            $sql .= " `Theoretical_unit` = ? ,";
            $sql .= " `Practical_unit` = ? ,";
            $sql .= " `prerequisite` = ? ,";
            $sql .= " `book_type` = ? ,";

            $this->pdo->query($sql);
            return $this->pdo->execute($info);

        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }




}