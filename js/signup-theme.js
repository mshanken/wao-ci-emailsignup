'use strict';

function populate() {
    var checkboxes = document.getElementsByName('CI_custom29');
    var ip1 = document.getElementById('CI_custom29');

    ip1.value = '';

    for (var i = 0, iLen = checkboxes.length; i < iLen; i++) {

        if (checkboxes[i].checked) {
            if (ip1.value.length === 0) {
                ip1.value = checkboxes[i].value;
            } else {
                ip1.value = ip1.value + ',' + checkboxes[i].value;
            }
        }
    }
}

$(function () {
	$("#CI_subscribeForm").validate({
		ignore: '.ignore',
		rules: {
			CI_email:{email:true},
            CI_custom7: {
                required: function(element) {
                    return $("#othersel").is(":selected");
                }
            },
            CI_custom30: {
                required: function(element) {
                    return $("#Other_for").is(":checked");
                }
            },
            CI_proactive_agree_to_receive_emails: {
            	required: function(element) {
            		return $("#CI_custom25").is(":checked");
			    }
            }
		},
		validClass: "success",
		errorClass: "error",
		errorElement:"em",
		submitHandler: function(form) { form.submit(); },
		success: function(label, element){
			// console.log( "test2: ", label, element );
			var _this = ($(element).hasClass('form-check-input'))?$(element).parent().parent():$(element).parent();
			if( $(_this).hasClass("has-error") ){
				$(_this).removeClass("has-error").addClass("has-success");
				$(_this).find("span.glyphicon").removeClass("glyphicon-remove").addClass("glyphicon-ok");
				$(_this).find("span.sr-only").attr("id", "inputSuccess2Status").text("(success)");
			}
		},
		invalidHandler: function(event, validator){
			// console.log("test:", validator, event, validator.invalid);
			$.each( validator.invalid, function( key, value ) {
				// console.log( key + ": " + value );
				var _this = ($("#"+key).hasClass('form-check-input'))?$("#"+key).parent().parent():$("#"+key).parent();
				$(_this).addClass("has-success");
				$(_this).addClass("has-error has-feedback");
				$(_this).find(".form-control-feedback").css("display","block");
			});
		}
	});

	var workWithThisFormIfExist2 = $("form[method='post']").length;

	// Tracking link source
	if(workWithThisFormIfExist2){
		var url = window.location.search,
			tmp = url.substring(url.indexOf('source=')+7, url.length);
		// console.log(url.indexOf('email='));
		if ( url.indexOf('source=') !== -1 ){
			// console.log(1);
			$("#CI_custom5").val(tmp);
		}
	}

    // Adds an input field when other (type of industry select field) is selected
    $("#CI_custom2").change( function(){
        // console.log($(this).val());
        if( $(this).val() === "Other" ){
            $(".form-group.hide").removeClass("hide");
        } else {
            $('#CI_custom7').parent().addClass("hide");
        }
    } );

    $( "input[type=checkbox]" ).change(function() {
        if( $(this).prop('checked') ){
            $(this).prev().removeClass('glyphicon-unchecked').addClass('glyphicon-check');
        } else {
            $(this).prev().removeClass('glyphicon-check').addClass('glyphicon-unchecked');
        }
    });

    $( "#CI_custom25" ).change(function() {
        if( $(this).prop('checked') ){
        	$('#CI_subscribeForm').attr('action','//portal.mshanken.com/wc/wc7_verify.cfm');
        	$(this).val('Y');
        	// $('#CI_pproactive_agree_to_receive_emails').attr('required','required');
            $("#GDPRContent").removeClass('hidden');
        } else {
        	$('#CI_subscribeForm').attr('action','//portal.mshanken.com/wc/wc_verify.cfm');
        	$(this).val('N');
        	// $('#CI_pproactive_agree_to_receive_emails').prop('required',false);
            $('#GDPRContent').addClass('hidden');
        }
    });

    // check for Whisky interesr -- can not select more than 5 types
	/*
	 * For checkboxes instead, if use anyway
	 */
  	$('.row-two input').on('change', function(e) {
		var counter = 0;
  		$(".row-two input").each(function(index){
	  		if($(this).prop('checked')){
				counter++;
			}
		});
		if(counter > 5){
			$(this).attr('checked',false);
			$(this).prev().removeClass('glyphicon-check').addClass('glyphicon-unchecked');
			// $(this).prop('checked',false);
			$("#myModal .modal-body").html("<p>You can not select more than 5 types</p>");
			$("#myModal .modal-footer .btn").text("close");
			$("#myModal").modal("show");
		}
		if( $(this).prop('checked') && $(this).val() === "Other_for" && counter <= 5 ){
			$(".another-hidden-field").removeClass('hide');
		} else {
			$(".another-hidden-field").addClass('hide');
		}
	});



});
