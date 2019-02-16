<?php ?>
<script src="<?php echo URL_ROOT;?>js/jquery.min.js"></script>


<script src="<?php echo URL_ROOT;?>js/bootstrap.bundle.min.js"></script>
<script src="<?php echo URL_ROOT;?>js/bootstrap.min.js"></script>

<?php 
    function add_index_file($bool){
        if($bool){
            echo '<script src="js/index.js"></script>';
        }
        return;
    }
?>
