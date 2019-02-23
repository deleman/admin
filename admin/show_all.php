<?php
require_once ('./submit_process.php');
require_once ('./show_all_proccess.php');
$submit = new submit();
$general_info = new show_general_info();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <?php
    $bool_insert_dot_css=true;
     require_once ('./theme/header.php');
     if(!isset($_SESSION['admin'])){
        header("Location:".URL_ROOT."index.php?alert=invalid");
    }
    ?>
    <link rel="stylesheet" href="./css/show_all.css">
 </head>
<body>


<?php require_once ('navbar.php');  ?>
  
        <?php
    //محاسبه ی تعداد تکرار یک کتاب یا تعداد افراد ی که ی ک کتاب را گرفته اند
    $all_names=Array();
        $fileter_names = Array();
            foreach($general_info->show_all_book() as $key => $value){
                foreach($value as $k => $v){
                    $break=false;
                    foreach($all_names as $k_all => $v_all){
                        
                        if(in_array($v->book_code,$v_all)){
                            
                            $all_names[$k_all][6]+=1;
                            $break=true;
                            break;
                        }
                        if($break==true ){
                            $fileter_names=Array();
                            break;
                        }
                    }
                    if($break==true ){
                        $fileter_names=Array();
                        break;
                    }
                    
                    array_push($fileter_names,$v->book_code);
                    array_push($fileter_names,$v->book_name);
                    array_push($fileter_names,$v->Theoretical_unit);
                    array_push($fileter_names,$v->Practical_unit);
                    array_push($fileter_names,$v->prerequisite);
                    array_push($fileter_names,$v->book_type);
                    array_push($fileter_names,1);
                   
                }
                if(count($fileter_names)){
                    array_push($all_names,$fileter_names);
                }
                $fileter_names=Array();
            }
        //پایان محاسبات مربوط به برگرداندن تعداد افراد گرفته شده یک کتاب
        ?>


    <!-- نمایش اطلاعات کلی -->
    <article class="">
        <div class="table-responsive d-flex justify-content-center">
            <table class="table  text-right align-center bordered table-hover table-responsive table-striped text-nowrap table-fixed w-auto showAlll  ">
        
            <thead>
                <tr class="bg-primary">
                    <th>کد درس</th>
                    <th>نام درس</th>
                    <th> نظری</th>
                    <th> عملی</th>
                    <th>پیش نیاز</th>
                    <th>نوع</th>
                    <td>تعدادد فراد</td>
                </tr>
            </thead>    
            <tbody
            <?php
                foreach($all_names as $key => $value){
                        echo "<tr >";
                            foreach($value as $k => $v){
                                echo '<td>'.$v.'</td>';
                            }
                        echo '</tr>';
                }
                ?> 
            </tbody>
        </table>
    </div>
</article>





?>
<?php
 require_once('./theme/footer.php');

 ?>

 </body>
 </html>
