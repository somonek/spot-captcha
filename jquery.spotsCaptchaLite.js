(function ($){
    "use strict";
    $.fn.spotsCaptcha = function (){
        $.fn.randomClassName = function (){
            var n = $.fn.getClassNameLength();
            var text = '';
            var chars = 'abcdefghijklmnopqrstuvwxyz';
            for(var i=0; i < n; i++){
                text += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return text;
        };

        $.fn.getClassNameLength = function (){
            return Math.floor(Math.random() * (Math.random() * 4)) + 6;
        };
        
        var listClass = $.fn.randomClassName();
        var activeSpotClass = $.fn.randomClassName();
        var spotClass = $.fn.randomClassName();
        
        var container = $(this); // reference used later to append elements
        var passed = [];
        var key = $.fn.randomClassName();
        passed[key] = false;
        
        // create spots list
        var spotsElements = '<ul class="'+listClass+'">';
        var activeClass;
        for(var i = 0; i < 4; i++){
            if(i === 0){
                activeClass = activeSpotClass;
            }else{
                activeClass = "";
            }
            spotsElements += '<li><div class="'+spotClass+' '+activeClass+'"></div></li>';
        }
        spotsElements += '</ul>';
        
        //append the list to the container
        container.append(spotsElements);
        
        //styling the elements
        var activeSpotStyle = {
            "background-color": "#ca0088"
        };
        var inactiveSpotStyle = {
            "margin": "0 5px",
            "background-color": "#555",
            "width": "15px",
            "height": "15px",
            "_height": "15px",
            "border-radius": "100%"
        };
        
        // creating the style tag in the head of the page
        var headStyles = "<style type='text/css'>";
        headStyles += "."+spotClass+"{";
        $.each(inactiveSpotStyle, function(key, value){
            headStyles += key + ": " + value + ";";
        });
        headStyles += "}"
        headStyles += "."+activeSpotClass+"{";
        headStyles += "background-color: #ca0088";
        headStyles += "}";
        headStyles += "."+activeSpotClass+":hover{cursor: pointer;}";
        headStyles += "."+listClass+"{";
        headStyles += "list-style-type: none;";
        headStyles += "padding: 0px;";
        headStyles += "}";
        headStyles += "."+listClass+" li{";
        headStyles += "float: left;";
        headStyles += "display: -moz-inline-stack;";
        headStyles += "display: inline-block;";
        headStyles += "vertical-align: top;";
        headStyles += "zoom: 1;";
        headStyles += "*display: inline;";
        headStyles += "}";
        headStyles += "</style>";

        $(headStyles).appendTo("head");
        
        // start moving the spots
        var previousPosition = 0;
        $.fn.moveCaptcha = function(){
            var elements = $("."+listClass).children().length;
            var newPos;
            //avoid same position twice
            do{
               newPos = $.fn.getNewPosition(elements)
            }while(previousPosition === newPos);
            previousPosition = newPos;

            $("."+spotClass).each(function(){
                if($(this).hasClass(activeSpotClass)){
                    $(this).removeClass(activeSpotClass);
                    $( "."+listClass+" li" ).eq( newPos ).find("div").addClass(activeSpotClass);
                    return false;
                }
            });

        };
        // get the position for the next active spot
        $.fn.getNewPosition = function (elements){
            return Math.floor((Math.random() * elements));
        };
        
        
        // if click on active spot returns true
        function setPassed(){
            passed[key] = true;
        };
        
        var captchaTimer = setInterval($.fn.moveCaptcha, 1500);

        $("."+spotClass).click(function(){
            if($(this).hasClass(activeSpotClass)){
                clearInterval(captchaTimer);
                setPassed();
            }
        });
        return {
            getCaptchaResult: function (){
                return passed[key];
            }
        }
    };
    
    
})(jQuery);