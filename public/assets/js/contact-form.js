jQuery(document).ready(function ($) {
    $("#submit").on("click", document, function (event) {
        const button = document.querySelector("#submit");

        var tempValue = jQuery(this).html();
        jQuery("form#contactpage").validate({
            submitHandler: function (e) {
                submitSignupFormNow(jQuery("form#contactpage"));
                button.disabled = true;
                button.style = "cursor: not-allowed;"
            },
            rules: {
                name: {
                    required: true
                },
                phone: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                }
            },
            errorElement: "span",
            errorPlacement: function (e, t) {
                e.appendTo(t.parent())
            }
        });
        submitSignupFormNow = (e) => {
            const formData = e.serializeArray();
            const jsonData = {}

            $.map(formData, (n, i) => {
                jsonData[n["name"]] = n["value"]
            })

            fetch("/api/email/send-contact-email", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(jsonData)
            }).then(res => res.json()).then(data => {
                jQuery("#submit").html(tempValue);
                if (data.status === "success") {
                    jQuery("#form_result").html("<span class=\"form-success\">" + data.message + "</span>")
                } else {
                    jQuery("#form_result").html("<span class=\"form-error\">" + data.message + "</span>")
                }
                jQuery("#form_result").show();
                button.disabled = false;
                button.style = "cursor: auto;"
            })
        }
    });

})
