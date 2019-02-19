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
<?php require_once ('./table_process.php');?>
<?php require_once ('navbar.php');  ?>

<section class="container bg-light mt-1">

    <article class="row bg-info">
        <div class="col-lg-4 col-md-5 col-sm-6 py-2 ">
        <span  class="text-center text-light h4">نمایش تمامی جداول  ورودی ها</span>
        
        </div>
    </article>

    <article class="">
        <table class="pr-5 py-4 table table-primary text-right m-auto bg-dark  bordered table-hover table-responsive text-dark  table-striped text-nowrap table-fixed">
        
            <thead >
               
            </thead>  
            <tbody id="tbody">
                
            </tbody>
            <tfoot>
                
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
    <script src="./js/table.js"></script>
    </body>
</html>








