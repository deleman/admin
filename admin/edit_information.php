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
<?php require_once ('./insert_process.php');?>
<?php require_once ('navbar.php');  ?>

<section class="container bg-light mt-1">

    <article class="row bg-info">
        <div class="col-4">

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
                            $new_year = $i.'-'.$i+1;
                            ?>
                        <option value="<?php echo $new_year; ?>"><?php echo $new_year; ?></option>

                        <?php }

                    ?>
            </select>
        </div>
    </article>

    <article class="">
        <table class="pr-5  table table-primary text-right  bordered table-hover table-responsive text-dark  table-striped text-nowrap table-fixed">
        
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
                <tr id="mohammad">
                    <td>
                        <input id="book_code" class="form-control" type="text">
                    </td>
                    <td>
                        <input id="book_name" class="form-control" type="text">
                    </td>
                    <td>
                        <input id="book_nazari" class="form-control w-50" type="text">
                    </td>
                    <td>
                        <input id="book_amali" class="form-control w-50" type="text">
                    </td>
                    <td>
                        <input id="book_pishniaz" class="form-control" style="min-width:240px;" type="text">
                    </td>
                    <td class="" style="min-width:135px;">
                        <select class="custom-select custom-select-sm">
                            <option selected>نوع کتاب</option>
                            <?php foreach($insert->get_all_enumtypes() as $key => $value) { ?>
                
                                <?php $trim = str_replace("'",'',$value); ?>
                                
                                <option value="<?php echo $trim; ?>"><?php echo $trim; ?> </option>

                            <?php } ?>
                        </select>
                    </td>

                    <!-- td for remove curent row -->
                    <td><button class="btn btn-danger" name="mohammad" id="remove" onclick="Remove(this.name)">remove</button></td>
                </tr>

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
    <script src="./js/insert.js"></script>
    </body>
</html>








