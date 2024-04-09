
  $('.datepicker').datepicker({
    format: "yyyy-mm-dd",
    //startDate: new Date('2022-7-15'),
    // endDate:  new Date('2022-8-15')
    autoclose: true
  })
    .on('changeDate', function (e) {
      $(this).datepicker('hide');
    });


  $(document).on("click", function (event) {
    if (!$(event.target).closest('.datepicker').length) {
      $('.datepicker').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true
      });
    }
  });




  $(".tablink").click(function () {
    $('.tablink').removeClass('active');
    $(this).addClass('active');
    //event.preventDefault();
    var id = $(this).attr("data-title");
    $(".maintabsec").hide();
    $("#" + id).fadeIn();
    $(".maintabsec").removeClass('active');
    $("#" + id).addClass('active');
  });




  //<li class="width5 addbtn"><button type="button" class="btn bluebtn remove-field">Delete</button></li>
  $(".addfield").click(function () {
    var html = '';
    html += '<ul class="addcol6">';
    html += '<li class="width5"> <div> <input type="text" class="textfield" name="sl_no" value="" placeholder="" /> </div> </li> <li class="smallsec"> <div> <input type="text" class="textfield datepicker" name="section_date" value="" placeholder="" /> </div> </li> <li> <div> <input type="text" class="textfield" name="section_fin_year" value="" placeholder="" /> </div> </li> <li> <div> <input type="text" class="textfield" name="reference" value="" placeholder="" /> </div> </li> <li class="smallsec"> <div> <input type="text" class="textfield datepicker" name="reference_date" value="" placeholder="" /> </div> </li> <li> <div> <input type="text" class="textfield" name="sanctioned_capital" value="" placeholder="" /> </div> </li> <li> <div> <input type="text" class="textfield" name="sanctioned_revenue" value="" placeholder="" /> </div> </li> <li class="smallsec"> <div> <input type="text" class="textfield" name="total" value="" placeholder="" /> </div> </li> <li class="width3 checkbtn"><label><input type="checkbox" name="delete" class="checksec" /></label> </li>';
    html += '</ul>';

    $('.recordlist').append(html);
  });


  $(document).on("click", ".deletebtn", function () {
    $('input:checked').closest('.addcol6').remove();
    $(".deletebtn").prop("disabled", true);
  });
  $(document).on("change", '.addcol6 input[type="checkbox"]', function () {
    var checked = $('.addcol6 input[type="checkbox"]:checked').length > 0;
    if (checked) {
      $(".deletebtn").prop("disabled", false);
    } else {
      $(".deletebtn").prop("disabled", true);
    }
  });



  $(".addfield2").click(function () {
    var html = '';
    html += '<ul class="addcol10">';
    html += '<li class="width5"> <div> <input type="text" class="textfield" id="finYear" name="finYear" value="" placeholder=""> </div> </li> <li> <div> <input type="text" class="textfield" name="transaction_id" value="" placeholder=""> </div> </li> <li> <div> <input type="text" class="textfield datepicker" name="transaction_date" value="" placeholder=""> </div> </li> <li> <div> <input type="text" class="textfield" name="sanction_fin_year" value="" placeholder=""> </div> </li> <li> <div><input type="text" class="textfield" name="approval_number" value="" placeholder=""> </div> </li> <li> <div> <input type="text" class="textfield datepicker" name="approval_date" value="" placeholder=""> </div> </li> <li> <div> <input type="text" class="textfield" name="approving_authority" value="" placeholder=""> </div> </li><li> <div> <input type="text" class="textfield" name="capital_fund" value="" placeholder=""> </div> </li> <li> <div><input type="text" class="textfield" name="revenue_fund" value="" placeholder=""> </div> </li> <li> <div> <input type="text" class="textfield" name="total" value="" placeholder=""> </div> </li> <li class="width3 checkbtn"><label><input type="checkbox" name="delete" class="checksec"></label> </li>';
    html += '</ul>';

    $('.recordlist2').append(html);
  });


  $(document).on("click", ".deletebtn2", function () {
    $('input:checked').closest('.addcol10').remove();
    $(".deletebtn2").prop("disabled", true);
  });
  $(document).on("change", '.addcol10 input[type="checkbox"]', function () {
    var checked = $('.addcol10 input[type="checkbox"]:checked').length > 0;
    if (checked) {
      $(".deletebtn2").prop("disabled", false);
    } else {
      $(".deletebtn2").prop("disabled", true);
    }
  });

