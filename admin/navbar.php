<?php

require_once ('./theme/navbar.php');  ?>
            <?php
            //call function menues
            navbar_start();
            $names = [
                'اطلاعات جدید' => 'insert_information.php',
                'ویرایش اطلاعات' => 'edit_information.php'
            ];
                navbar_dropDown('درج اطلاعات',$names, true);
                navbar_link('ثبت اطلاعات','selection.php',true);
            
                navbar_link('تغییر اطلاعات','submit_selection.php',true);
                navbar_link(' نمایش کلی','show_all.php',true);
                navbar_link('  راهنما','#',true);

            navbar_destroy();


?>