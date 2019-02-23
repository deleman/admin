<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <?php require_once ('./theme/header.php'); ?>
    <title>Document</title>
</head>
<?php require_once ('./index_proccess.php');?>
<!-- show navbar for page -->
<?php require_once ('./edit_process.php');?>
<?php require_once ('navbar.php');  ?>

<section class="container bg-light mt-1">

    <article class="row bg-info">
        <div class="col-lg-4 col-md-5 col-sm-6">

        <select class="custom-select" id="term_name" name="term_name">
                <option selected>ورودی سال</option>
                    <?php $last_value =''; ?>
                    <?php foreach($insert->get_all_termnames() as $key => $value) {?>
                        <?php $last_value = $value; ?>
                        <option value="<?php echo $value; ?>"><?php echo $value; ?></option>
                    <?php } ?>    

                    <!--explode last value  -->
                    <?php
                        $years = explode('-',$last_value);
                        for($i=$years[0]+1;$i<200;$i++){
                            $new_year = (string)($i%100).'_'.(string)(($i+1)%100);
                            ?>
                        <option value="<?php echo $new_year; ?>"><?php echo $new_year; ?></option>

                        <?php }

                    ?>

                    
            </select>
        </div>
    </article>

    <article class="">
        <table class="pr-5  table table-primary text-right  bordered table-hover table-responsive text-dark  table-striped text-nowrap table-fixed" >
        
            <thead>
                <tr class="bg-secondary">
                    <th>کد درس</th>
                    <th>نام درس</th>
                    <th> نظری</th>
                    <th> عملی</th>
                    <th>پیش نیاز</th>
                    <th>نوع</th>
                    <td>تعدادد فراد</td>
                </tr>
            </thead>  
            <tbody id="tbody">
                
            </tbody>
            <tfoot>
                <tr>
                    <td><button class="btn btn-info" id="addRow">Add New </button></td>
                    <td><button class="btn btn-primary w-100" id="saveInfo">save </button></td>
                    <th>#</th>
                </tr>
            </tfoot>
        </table>
    </article>


</section>

    
    <!-- modal to show -->
    <?php
    //  require_once ('./theme/modal.php'); 
     ?>
    <!-- end modal code -->

      <!-- include footer page -->
      <?php include_once('./theme/footer.php'); ?>
    <?php  if(isset($_GET['alert'])){   echo "<script>
                    $(document).ready(function(){
                        $('#newModal').modal('show');
                        
                        $('#button1').click(function(){
                            $('#newModal').modal('hide');
                        });
                    });
                    </script>";

            }

        
            
    ?>
    <script src="./js/edit.js"></script>
    </body>
</html>








