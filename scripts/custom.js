$(document).ready(function () {
    var elem;
    var PageCount = 0;
    var leftval = 0;
    var PageLimit = 0;




    /* The following code is executed once the DOM is loaded */

    $('.BeforeFlip').bind("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        // $(this) point to the clicked .sponsorFlip element (caching it in elem for speed):
        color_target: "red",

        elem = $(this);
            //.find(".BeforeFlip");
       
        // data('flipped') is a flag we set when we flip the element:

        if (elem.data('flipped')) {
            // If the element has already been flipped, use the revertFlip method
            // defined by the plug-in to revert to the default state automatically:
           
            elem.revertFlip();

            // Unsetting the flag:
            elem.data('flipped', false);
        }
        else {
            // Using the flip method defined by the plugin:
           
            elem.flip({
                direction: 'lr',
                speed: 350,
                onBefore: function () {
                    // Insert the contents of the .sponsorData div (hidden
                    // from view with display:none) into the clicked
                    // .sponsorFlip div before the flipping animation starts:

                    elem.html(elem.siblings('.AfterFlip').html());
                   
                }
            });

            // Setting the flag:
            elem.data('flipped', true);
           
           
        }
        
    });

    var FlipBoxCnt = 0;
    
    $(".FlipStrip").each(function (index) {
        FlipBoxCnt = $(this).find('.Flipbox').length;
      //  PageLimit = parseInt(FlipBoxCnt) - 2;
        $(this).attr('PageLimit', FlipBoxCnt);
    });



    $('.FlipStrip').on('swipeleft swiperight', function (event) {

        if (event.type == "swipeleft") {
            PageLimit = $(this).attr('PageLimit');
            PageCount = $(this).attr('PageCount');
            if (PageLimit > PageCount) {
                leftval = parseInt(PageCount) * 260;
                $(this).find('.Flipbox').animate({
                    left: "-=" + leftval
                }, 500, function () {
                    // $('.Flipbox:eq(0)').css({ "left": "0px" });
                });
                PageCount++;
                PageCount = $(this).attr('PageCount', PageCount);
            }
        }

        if (event.type == "swiperight") {
            PageCount = $(this).attr('PageCount');
            if (PageCount > 1)  {
                leftval = parseInt($(this).find('.Flipbox').css("left")) + 260;
                PageCount--;
                PageCount = $(this).attr('PageCount', PageCount);
                $(this).find('.Flipbox').animate({
                    left: "+=" + leftval
                }, 500, function () {
                    // $('.Flipbox:eq(0)').css({ "left": "0px" });
                });
            }
           
        }
       
        event.preventDefault();
    });
    




});
