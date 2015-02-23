var gmail="";
var email_signature = {
  
  		title : "not defined",
  		url : "not defined",
 
 		/**
  	 	Function to retrive site informations and send the url for checking... 
  		*/
 		get_info : function(){
 
  			this.url = document.location.href;
   			//console.log(this.url+"\n"+this.title+"\n"+this.desc);
   			if(!email_signature.blocking_url())
      		{
            
            	console.log("This url is track free.......");
            	
      		}
      		else
      		{ 	// it met the blocking criteria
            	console.log("freeapp : Url Blocked");
            	alert('Hello world gm');
            	//freeapp.loadGmail();
      		} 
 	},
  	blocking_url: function() {      // it will block some of the urls automatically

        var url = this.url;    // get the current url 
        var patt2=/^((https|http):\/\/(www\.)?.*(mail\.google|itsth\.de|itsth\.com|email-signatures\.org|([a-zA-Z0-9]|\/)+mail).*)$/gi;
        if(patt2.test(url))
        {
          return true; 
        } 
        return false;
        
  	},
  	

};//end freeapp prototype.
    
email_signature.get_info(); 
var composeObj="";
var main = {
	loadGmail:function(){
alert("U r in gmail load");
  gmail = new Gmail();
  alert('Hellooo110,'+gmail.get.user_email());
gmail.observe.on("send_message", function(url, body, data, xhr) {
  //alert(data.to+"<br/>"+data.body);
  console.log("url:", url, 'body', body, 'email_data', data, 'xhr', xhr);
});

gmail.observe.after('open_email', function(obj) {
  alert('view_email', obj);
});
gmail.observe.on("open_email", function(id, url, body, xhr) {
  
  alert(gmail.get.email_data(id));
});
gmail.observe.before("open_email", function(id, url, body, xhr) {
  
  alert(gmail.get.email_data(id));
});
gmail.observe.on('view_email', function(obj) {
  alert('view_email', obj);
});

// DOM observers
gmail.observe.on("compose", function(compose, type) {

  if(type=="reply"){
  	//alert(gmail.get.user_email());

  	var data= gmail.get.displayed_email_data();
  	var email_recpt="";
  	$.each(data.people_involved,function(i,datas){
  		if(i!=0){
  			//console.log(datas[1]);
  			email_recpt+=datas[1]+" ";
  		}	
  	});
  	email_recpt=email_recpt.trim();
  	alert(email_recpt);
  	console.log(gmail.get.displayed_email_data());

  }
  composeObj=setInterval(function(){loadSig(type)},50);
  //$(".editable").html("Alwyn");

});
gmail.observe.after("send_message", function(url, body, data, response, xhr) {
  alert("message sent");
})

}
};
setTimeout(main.loadGmail,2000);
function loadSig(type){

	console.log("here001");
	var obj=(type=="reply") ? document.querySelector('.Ap') : document.querySelector('.AD');

	
	if(obj)
	{ 
 	 		
 	 		renderFooter(type);
	}
}
function renderFooter(type)
{
	var lines=(type=="compose") ? "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>" :"<br/><br/><br/><br/>";
	$(".editable").html(lines+"<table border=1 width=100%><tr><td>Dummy-Signature</td></tr></table>");
	clearInterval(composeObj);
}

