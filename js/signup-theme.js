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

});
