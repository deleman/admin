<?php
    function navbar_start(){
        ?>
            <nav class="navbar navbar-expand-lg navbar-light bg-success text-warning" id="header">
            <a class="navbar-brand" href="<?php echo URL_ROOT.'admin/dashboard.php' ?>">داشبورد</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
        <?php
    }

?>
      <?php
            

    //  define useul function && create links
        function navbar_dashboard($bool=false){
            if($bool===true){
        ?>
        <li class="nav-item active">
            <a class="nav-link" href="#">داشبورد <span class="sr-only">(current)</span></a>
        </li>
        <?php } } ?>
            
        <?php
            function navbar_link($name,$href,$bool=false){
                if($bool===true){
        ?>
        <li class="nav-item">
            <a class="nav-link btn btn-lg px-3 py-2  btn-lg" href="<?php echo $href; ?>"><?php echo $name; ?></a>
        </li>
        <?php } } ?>

        <?php
            //first is default for selection twice is associate array [name=>href,...]
            function navbar_selection($default,$param,$bool){
                if($bool===true){
        ?>
           <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <?php echo $default; ?>
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <?php 
                    foreach ($param as $name => $href) {
                    ?>
                        <a class="dropdown-item" href="<?php echo $href; ?>"><?php echo $name; ?></a>

                   <?php } }
                
                ?>
                </div>
            </li> 
        <?php } ?>

        <?php

        function navbar_destroy(){
            ?>
                    </ul>
                </div>
            </nav>
            <?php

        }