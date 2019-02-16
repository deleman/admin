<?php
    //require index_proccess.php
    require_once ('index_proccess.php');
  
    //create init in index_proccess
    $index = new sign();

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>پیش انتخاب واحد</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php require_once('./theme/header.php'); 
           
        ?>   
    </head>
    <body class="container-fluid" id="SlateBlue">
        <header class="row" id="header">
            <div class="text-justify col-6">
                <h4 class="p-3 m-3 mr-4 text-light">پیش انتخاب واحد </h4>
            </div>
            <div class="col-6">
                <h4 class="p-3 m-3 mr-4 text-light">رشته کامپیوتر</h4>
            </div>
        </header>

        <section class="mt-5 p-2 row" >
            <?php if(isset($_GET['alert'])){ ?>

                <div class="modal fade " id="newModal" role="dialog">
                <div class="modal-dialog">
                
                <div class="modal-content text-right bg-<?php echo $_GET['alert'] ?>">
                    <div class="modal-header my-modal-header" >
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <p class="modal-title my-modal-title my-style-custome" >خطا در وارد کردن اطلاعات!!!</p>
                    </div>
                    <div class="modal-body">
                    <p>لطفا مشخصات خود را درست وارد کنید!!!</p>
                    </div>
                </div>
                
                </div>
                </div>
            <?php } ?>
            <article id="body" class="col-lg-7 col-md-9 col-sm-10 m-auto bg-light">
            <form action="dashboard.php" method="POST" class="text-right m-5 pt-2" >
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-4 col-md-3 col-form-label mycolor">نام</label>
                    <div class="col-sm-8 col-md-9">
                    <input type="text" name="name" class="form-control" id="inputEmail3" placeholder="محمد">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputEmail3" class="col-sm-4 col-md-3 col-form-label mycolor font-weight-bold">نام خانوادگی</label>
                    <div class="col-sm-8 col-md-9">
                    <input type="text" name="lname" class="form-control" id="inputEmail3" placeholder="راوند">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword3" class="col-sm-4 col-md-3 col-form-label mycolor">شماره دانشجویی</label>
                    <div class="col-sm-8 col-md-9">
                    <input type="password" name="number" class="form-control" id="inputPassword3" placeholder="950238032">
                    </div>
                </div>
                
                
                <div class="form-group row">
                    <div class="col-md-4 col-sm-5  m-auto">
                        <button type="submit" name="submit_sign_in" class="btn btn-primary w-100">ورود</button>
                    </div>
                </div>
                </form>

            </article>
        </section>

        

        <!-- code for some test function-->
            <?php

                require_once("index_proccess.php");


                ?>



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
    </body>
</html>