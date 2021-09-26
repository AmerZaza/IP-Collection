
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        var launchDemoButton = document.getElementById('launch-demo');
        launchDemoButton.onclick = function() {
            app.loadARchitectWorld();
        }
    },
    loadARchitectWorld: function() {
        app.wikitudePlugin.isDeviceSupported(function() {
            app.wikitudePlugin.loadARchitectWorld(function successFn(loadedURL) {
                }, function errorFn(error) {
                    alert('Loading AR web view failed: ' + error);
                },
                cordova.file.dataDirectory + 'www/pgday/index.html', [ '2d_tracking' ], { camera_position: 'back' }
            );
        }, function(errorMessage) {
            alert(errorMessage);
        },
        [ '2d_tracking' ]
        );
    }
};

//Define variables
        var octet=new Array();     
                                   /*This array will hold the IP
                                       address octets as follows
                                        octet[0]         = subnet mask
                                        octet[1]  - [4]  = problem address
                                        octet[5]  - [7]  = network address octets 2-4
                                        octet[8]  - [10] = first host address octets 2-4
                                        octet[11] - [13] = last host address octets 2-4
                                        octet[14] - [16] = broadcast address octets 2-4 */

       var i=0;                     //generic counter integers
       var j=0;

 //Start a new problem
       function ClearForm(form){
                                    //wipe out all data in octetArray
         for(i=0; i <16; i++)
         {
            octet[i] =0;
         }                          //clear all data currently in the html form

         form.networkOctet1.value    = "";   form.networkOctet2.value    = "";  
         form.networkOctet3.value    = "";   form.networkOctet4.value    = "";
         form.firstHostOctet1.value  = "";   form.firstHostOctet2.value  = "";  
         form.firstHostOctet3.value  = "";   form.firstHostOctet4.value  = "";
         form.lastHostOctet1.value   = "";   form.lastHostOctet2.value   = "";  
         form.lastHostOctet3.value   = "";   form.lastHostOctet4.value   = "";
         form.broadcastOctet1.value  = "";   form.broadcastOctet2.value  = "";  
         form.broadcastOctet3.value  = "";   form.broadcastOctet4.value  = "";
         form.networkAnswer1.value   = "";   form.networkAnswer2.value   = "";  
         form.networkAnswer3.value   = "";   form.networkAnswer4.value   = "";
         form.firstHostAnswer1.value = "";   form.firstHostAnswer2.value = "";  
         form.firstHostAnswer3.value = "";   form.firstHostAnswer4.value = "";
         form.lastHostAnswer1.value  = "";   form.lastHostAnswer2.value  = "";  
         form.lastHostAnswer3.value  = "";   form.lastHostAnswer4.value  = "";
         form.broadcastAnswer1.value = "";   form.broadcastAnswer2.value = "";  
         form.broadcastAnswer3.value = "";   form.broadcastAnswer4.value = "";
         form.networkOK.value        = "";   form.firstHostOK.value      = "";  
         form.lastHostOK.value       = "";   form.broadcastOK.value      = "";
		 form.editedOctet1.value	 = "";	 form.editedOctet2.value	 = "";
		 form.editedOctet3.value	 = "";	 form.editedOctet4.value	 = "";
		 form.editedMask.value		 = "";

                                             //create a new IP address problem

         i=Math.floor(Math.random()*3);      //random number between 0 and 2 - select class
         if (i==0){                          //class A network
           octet[0] = 8+Math.floor(Math.random()*22);   //subnet mask
           octet[1] = 1+Math.floor(Math.random()*126);  //first Octet
         }
         if (i==1){                          //class B network
           octet[0] = 16+Math.floor(Math.random()*14);   //subnet mask
           octet[1] = 128+Math.floor(Math.random()*63);  //first Octet
         }
         if (i==2){                          //class C network
           octet[0] = 24+Math.floor(Math.random()*6);   //subnet mask
           octet[1] = 192+Math.floor(Math.random()*31); //first Octet
         }
         octet[2] = Math.floor(Math.random()*255);
         octet[3] = Math.floor(Math.random()*255);
         octet[4] = Math.floor(Math.random()*255);

                                             //display the problem

         form.givenMask.value   = octet[0];  
         form.givenOctet1.value = octet[1];
         form.givenOctet2.value = octet[2];
         form.givenOctet3.value = octet[3];
         form.givenOctet4.value = octet[4];

                                             //fill the octet array with the correct values
         j=1;
         i=octet[0]%8;
         for(i=8-octet[0]%8; i>0; i--)       //couldn't find javascript exponential operator
         {
            j=j*2;
         }    
         if(octet[0] < 16){                  //working in second octet
           octet[5] = octet[8] = Math.floor(octet[2]/j)*j;
           octet[10] = 1;
           octet[11] = octet[14] = octet[5]+j-1;
           octet[12] = octet[15] = octet[16] =255;
           octet[13] = 254;
         }else{
           if(octet[0] < 24){                //working in third octet
             octet[5]  = octet[8] = octet[11] = octet[14] = octet[2];
             octet[6]  = octet[9] = Math.floor(octet[3]/j)*j;
             octet[12] = octet[15] = octet[6]+j-1;
             octet[7]  = 0;
             octet[10] = 1;
             octet[13] = 254;
             octet[16] = 255;
            }else{                           //working in fourth octet
             octet[5]  = octet[8] = octet[11] = octet[14] = octet[2];
             octet[6]  = octet[9] = octet[12] = octet[15] = octet[3];
             octet[7]  = Math.floor(octet[4]/j)*j;
             octet[10] = octet[7]+1;
             octet[16] = octet[7]+j-1;
             octet[13] = octet[16]-1;
            }
         }
       }
	   
       function Calculate(form){
                                    //wipe out all data in octetArray
         for(i=0; i <16; i++)
         {
            octet[i] =0;
         }                          //clear all data currently in the html form
		 
         form.givenOctet1.value		 = "";	 form.givenOctet2.value		 = "";
         form.givenOctet3.value		 = "";	 form.givenOctet4.value		 = "";
		 form.givenMask.value		 = "";

		 form.networkOctet1.value    = "";   form.networkOctet2.value    = "";  
         form.networkOctet3.value    = "";   form.networkOctet4.value    = "";
         form.firstHostOctet1.value  = "";   form.firstHostOctet2.value  = "";  
         form.firstHostOctet3.value  = "";   form.firstHostOctet4.value  = "";
         form.lastHostOctet1.value   = "";   form.lastHostOctet2.value   = "";  
         form.lastHostOctet3.value   = "";   form.lastHostOctet4.value   = "";
         form.broadcastOctet1.value  = "";   form.broadcastOctet2.value  = "";  
         form.broadcastOctet3.value  = "";   form.broadcastOctet4.value  = "";
         form.networkAnswer1.value   = "";   form.networkAnswer2.value   = "";  
         form.networkAnswer3.value   = "";   form.networkAnswer4.value   = "";
         form.firstHostAnswer1.value = "";   form.firstHostAnswer2.value = "";  
         form.firstHostAnswer3.value = "";   form.firstHostAnswer4.value = "";
         form.lastHostAnswer1.value  = "";   form.lastHostAnswer2.value  = "";  
         form.lastHostAnswer3.value  = "";   form.lastHostAnswer4.value  = "";
         form.broadcastAnswer1.value = "";   form.broadcastAnswer2.value = "";  
         form.broadcastAnswer3.value = "";   form.broadcastAnswer4.value = "";
         form.networkOK.value        = "";   form.firstHostOK.value      = "";  
         form.lastHostOK.value       = "";   form.broadcastOK.value      = "";
		 
		 octet[0] = form.editedMask.value;
		 octet[1] = form.editedOctet1.value;
		 octet[2] = form.editedOctet2.value;
		 octet[3] = form.editedOctet3.value;
		 octet[4] = form.editedOctet4.value;
		 
                                             //fill the octet array with the correct values
         j=1;
         i=octet[0]%8;
         for(i=8-octet[0]%8; i>0; i--)       //couldn't find javascript exponential operator
         {
            j=j*2;
         }    
         if(octet[0] < 16){                  //working in second octet
           octet[5] = octet[8] = Math.floor(octet[2]/j)*j;
           octet[10] = 1;
           octet[11] = octet[14] = octet[5]+j-1;
           octet[12] = octet[15] = octet[16] =255;
           octet[13] = 254;
         }else{
           if(octet[0] < 24){                //working in third octet
             octet[5]  = octet[8] = octet[11] = octet[14] = octet[2];
             octet[6]  = octet[9] = Math.floor(octet[3]/j)*j;
             octet[12] = octet[15] = octet[6]+j-1;
             octet[7]  = 0;
             octet[10] = 1;
             octet[13] = 254;
             octet[16] = 255;
            }else{                           //working in fourth octet
             octet[5]  = octet[8] = octet[11] = octet[14] = octet[2];
             octet[6]  = octet[9] = octet[12] = octet[15] = octet[3];
             octet[7]  = Math.floor(octet[4]/j)*j;
             octet[10] = octet[7]+1;
             octet[16] = octet[7]+j-1;
             octet[13] = octet[16]-1;
            }
         }
		 }


 //Display selected addresses
       function Show(form,x){
         var hold = 0;
         var tex = x;
         var xloop = 1;
         if(tex == 5){
          tex = 0;
          hold = 1;
         }
         while(xloop == 1)
         {
           if(hold == 1){
             tex++;
           }else{
             xloop = 0;
           }
           switch(tex){
             case(1): form.networkAnswer1.value=octet[1];
                      form.networkAnswer2.value=octet[5];
                      form.networkAnswer3.value=octet[6];
                      form.networkAnswer4.value=octet[7];
                      break;
             case(2): form.firstHostAnswer1.value=octet[1];
                      form.firstHostAnswer2.value=octet[8];
                      form.firstHostAnswer3.value=octet[9];
                      form.firstHostAnswer4.value=octet[10];
                      break;
             case(3): form.lastHostAnswer1.value=octet[1];
                      form.lastHostAnswer2.value=octet[11];
                      form.lastHostAnswer3.value=octet[12];
                      form.lastHostAnswer4.value=octet[13];
                      break;
             case(4): form.broadcastAnswer1.value=octet[1];
                      form.broadcastAnswer2.value=octet[14];
                      form.broadcastAnswer3.value=octet[15];
                      form.broadcastAnswer4.value=octet[16];
                      break;
             default: hold = 0;
             }
           }
       }
 //Check answer input
       function Check(form,x){
         var hold = 0;
         var tex = x;
         var xloop = 1;
         if(tex == 5){
          tex = 0;
          hold = 1;
         }
         while(xloop == 1)
         {
           if(hold == 1){
             tex++;
           }else{
             xloop = 0;
           }
           switch(tex){
             case(1): if( (form.networkOctet1.value == octet[1]) && 
                           (form.networkOctet2.value == octet[5]) && 
                           (form.networkOctet3.value == octet[6]) && 
                           (form.networkOctet4.value == octet[7]) ){
                        form.networkOK.value="YES"; 
                      }else{
                        form.networkOK.value="NO"; 
                      }
                      break;
             case(2): if( (form.firstHostOctet1.value == octet[1]) && 
                           (form.firstHostOctet2.value == octet[8]) && 
                           (form.firstHostOctet3.value == octet[9]) && 
                           (form.firstHostOctet4.value == octet[10]) ){
                        form.firstHostOK.value="YES"; 
                      }else{
                        form.firstHostOK.value="NO"; 
                      }
                      break;
             case(3): if( (form.lastHostOctet1.value == octet[1]) && 
                           (form.lastHostOctet2.value == octet[11]) && 
                           (form.lastHostOctet3.value == octet[12]) && 
                           (form.lastHostOctet4.value == octet[13]) ){
                        form.lastHostOK.value="YES"; 
                      }else{
                        form.lastHostOK.value="NO"; 
                      }
                      break;
             case(4): if( (form.broadcastOctet1.value == octet[1]) && 
                           (form.broadcastOctet2.value == octet[14]) && 
                           (form.broadcastOctet3.value == octet[15]) && 
                           (form.broadcastOctet4.value == octet[16]) ){
                        form.broadcastOK.value="YES"; 
                      }else{
                        form.broadcastOK.value="NO"; 
                      }
                      break;
             default: hold = 0;         
         }
       }
      }
