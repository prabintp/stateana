	(function($) {

    $.fn.tpgraph = function(options) {
            
        // Establish our default settings
        var settings = $.extend({
            ydata        : null,
            xdata        : null,
            fontStyle    : null
        }, options);
        
        
        
        
        var mydata = settings.ydata;
        var myvalue = settings.xdata;
        
        var min = Math.min.apply(null, mydata);
    	  var max = Math.max.apply(null, mydata);
    	  var sumval=max+min;
    	
     		
          var i=0,item
			while(item=mydata[i]){
				var val=myvalue[i];
				
				if(i%3 == 0)
				var simClass='';
				else
				var simClass='simple';
				
				
				
			   $(this).append(
    			'<div id="tpbar" class="bar '+simClass+'"><div class="title">'+val+'</div><div class="value">'+(item/sumval)*100+'%</div><div class="value">'+(item/sumval)*100+'%</div><span class="label label-success">'+item+'</span></div>');
    			//$('#tpbar .value').html(item);
    			i++;
			}     
     
       
        
		      
        
       /* return this.each( function() {
    			$(this).text( settings.text );

    		if ( settings.color ) {
        		$(this).css( 'color', settings.color );
    		}

    		if ( settings.fontStyle ) {
        		$(this).css( 'font-style', settings.fontStyle );
    		}
});*/
       

    }

	}(jQuery));
