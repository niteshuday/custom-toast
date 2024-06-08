
showCustomToast(
  { 
    eleWrapper: '#example',
    msg: 'There is an error while sending message. Please try again later.',
    theme: 'error',
    afterShow: function(){
                  console.log('After show function');
                },
    afterClose: function(){
                  console.log('After close function');
                }
  } 
);


$('#showAutoClose').click( function (){
  showCustomToast(
    { 
      eleWrapper: '#example',
      msg: 'Thank you for your message. I will write back soon.',
      theme: 'success',//error,warning,info
      closeButton: false,
      autoClose: false
    } 
  );
});

function showCustomToast(option){
  var wrapper = $(option.eleWrapper);
  var toast = createToast(option);
  toast = $(toast).hide().fadeIn(750);
  if(option.autoClose){
    var outTime  = option.autoCloseTime || 3500;
    if(outTime < 1000){
      outTime =  1000;
    }
    var watch = setTimeout(function(){
      toast.animate({ 'margin-top' : '-50px' , 'opacity': '0'},500, function(){
        this.remove();
        if(option.afterClose){
          option.afterClose();
        }
      });
    }, outTime);
  }

  $(wrapper).on('click', '.custom-close', function(){
    $(this).closest('.custom-toast').remove();
    //clearTimeout(watch);
    if(option.afterClose){
      option.afterClose();
    }  
  });

  $(wrapper).append(toast);
  if(option.afterShow){
    option.afterShow();
  }
}

function createToast(option){
  var final = toastCaseValidation(option);
  var html = `
               <div class="custom-toast custom-theme-`+(option.theme).toLowerCase()+`">
                <div class="custom-toast-inner">                
                  <div class="custom-toast-icons ">
                    `+final.themeIcoText+`
                  </div>
                  <div class="custom-toast-msg">
                    `+final.msg+`
                  </div>
                  <div class="custom-toast-action">
                    `+final.close+`
                  </div>
                </div>
               </div>`;
  return html;
}

function toastCaseValidation(option){
  var finalOption={};
  var toastmsg;
  var themeIcoText;
  var closeBtn =  '<button type="button" class="custom-close">&#10006;</button>';
  switch(option.theme) {
    case 'error':
        themeIcoText='&#10008;';
      break;
    case 'success':
        themeIcoText='&#x2714;';
      break;
    case 'warning':
        themeIcoText='&#10071;';
      break;
    default:
         themeIcoText='&#10004;';
  }
  if(!option.closeButton){
    closeBtn = '';
  }
  
  if(option.msg === undefined ){ 
    toastmsg = 'No Message';
  }
  else{
    if(option.msg.length !== 1  && typeof option.msg === "object" ){ 
      toastmsg = '<ul>';            
        option.msg.forEach(function(val,index){                     
          toastmsg = toastmsg + '<li>'+val+'</li>';
        });                
      toastmsg = toastmsg +'</ul>';     
    }
    else{                                
      toastmsg =option.msg;             
    }
	}
  finalOption.close = closeBtn;
  finalOption.msg = toastmsg;
  finalOption.themeIcoText=themeIcoText;
  return finalOption;
}

