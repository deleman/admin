<?php
require_once ('./lib/database.php');

class sign{
    
    public $db;
    public $name;
    public $lname;
    public $number;
    public $subscriber;
    public function __construct()
    {
        $this->db = new Database();
    }
    
    /**
     * redirect to somewhere if users is not admin
     * using header function for somewhere
     */
    public function redirect_with_cond($url, $cond){
        $new = $this->validate_inpus($url);
        if($cond){
            header("Location: $url");
        }else{
            // header("Location: $old");
        }
    }

    //unknown functions action
    public function is_subscriber($infos){
        $data = $this->get_all_infos();
        $user_infos =array();
        foreach($data as $key => $value){
            array_push($user_infos,$value->name);
            array_push($user_infos,$value->fname);
            array_push($user_infos,$value->number);
        }
        $this->name = $this->validate_inpus($infos['name']);
        $this->lname = $this->validate_inpus($infos['lname']);
        $this->number = $this->validate_inpus($infos['number']);
        $_SESSION['user_id']=($this->get_user_id());
        //if data in database or validate
        if(in_array($this->name,$user_infos)){
            // echo 'name is <br >';
            if(in_array($this->lname,$user_infos)){
                // echo 'lname is <br >';
                if(in_array($this->number,$user_infos)){
                    // echo 'number is <br >';
                    $this->subscriber = true;
                }else{
                    $this->subscriber = false;

                }
            }else{
                $this->subscriber = false;                
            }
        }else{
            $this->subscriber = false;
        }
        return $this->subscriber;
        //if data was not in database
    }

    /***
     * get all admin informations in database
     * 
     * @return adminInformations
     */
    public function get_all_infos(){
        $sql = "SELECT * FROM users  WHERE name='admin'";
        $this->db->query($sql);
       return $this->db->resultSet();
          
    }

    /**
     * validate inputs informations
     * first trim
     * then htmlspecalchar 
     *      and
     * htmlentities
     * 
     * @return safeinformations
     */
    public function validate_inpus($value){
        return htmlspecialchars(htmlentities(trim($value)));
    }

    //unknown functions action and sample using pdo methods
    public  function get_user_id(){
        //     $sql = "SELECT * FROM users";
        //     $db->query($sql);
        //    return $db->resultSet();
        $sql = "SELECT id FROM users WHERE name=:name and fname=:lname and number=:num";
            $this->db->query($sql);
            $this->db->bind(':name',$this->name,PDO::PARAM_STR);
            $this->db->bind(':lname',$this->lname,PDO::PARAM_STR);
            $this->db->bind(':num',$this->number);
            $data =$this->db->resultSet();
        foreach ($data as $key => $value) {
            return $_SESSION['user_id'] = ($value->id);  
        }
                
    }
        
    
    /**
     * validate if users information is equal to admin informations
     * first => validate informations input
     * then => conditional logic for is current user is admin or no
     * @return bool
     */
    public function is_user_admin($info){
        //validate inputs info
        $safe_infos = Array();
        foreach($info as $Key => $Value){
            array_push($safe_infos,$this->validate_inpus($Value));
        }
        //validate is admin

        //if name is admin`s name
        if($this->get_all_infos()[0]->name == $safe_infos[0]){
            
            //if fname is admin`s fname
            if($this->get_all_infos()[0]->fname == $safe_infos[1]){
            
                //if number is admin`s number   
                if($this->get_all_infos()[0]->number == $safe_infos[2]){

                    return true;
                }
            }
        }else{
            return false;
        }

    }

    /**
     * show errors
     * first => is user admin show welcome to dashboard
     * else => show invalid informations or redirect to somewere
     * @return errors
     */
    public function show_errors($info){
        $is_admin = $this->is_user_admin($info);

        if($is_admin){
            //create error success
            return ['success','welocme to dashboard admin'];

        }else{
            
            //can`t start session or information was invalid
            //--------------------/

            //create error danger
            return ['danger','your infomations was invalid'];

        }
    }







}