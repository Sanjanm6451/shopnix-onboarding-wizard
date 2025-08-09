
$(function(){
  let step = 1;
  const totalSteps = 3;
  const stepNum = $('#stepNum');
  const progressBar = $('#progressBar');
  const themeCards = $('.theme-card');
  const nextBtn = $('#nextBtn');
  const prevBtn = $('#prevBtn');


  function showStep(s){
    $('.wizard-step').addClass('d-none');
    $('#step'+s).removeClass('d-none');
    stepNum.text(s);
    progressBar.css('width', ((s/totalSteps) * 100)+'%');
    prevBtn.prop('disabled', s===1);
    if(s===totalSteps) nextBtn.text('Finish'); else nextBtn.text('Next');
  }

  showStep(step);

  themeCards.on('click keypress', function(e){
    if(e.type==='keypress' && e.which!==13) return;
    themeCards.removeClass('selected');
    $(this).addClass('selected');
    const t = $(this).data('theme');
    let color = '#1e6fff';
    if(t==='orange') color = getComputedStyle(document.documentElement).getPropertyValue('--orange').trim();
    if(t==='turquoise') color = getComputedStyle(document.documentElement).getPropertyValue('--turquoise').trim();
    if(t==='blue') color = getComputedStyle(document.documentElement).getPropertyValue('--blue').trim();
    document.documentElement.style.setProperty('--theme-color', color);
    $('body').removeClass('theme-applied').addClass('theme-applied');
  });

  $('#productType').on('change', function(){
    const val = $(this).val();
    const cat = $('#category');
    cat.empty().append('<option value="">Select category</option>');
    if(val==='Clothing'){
      cat.append('<option>T-Shirts</option><option>Jackets</option><option>Accessories</option>');
    } else if(val==='Electronics'){
      cat.append('<option>Mobile</option><option>Computers</option><option>Audio</option>');
    } else if(val==='Home & Living'){
      cat.append('<option>Decor</option><option>Furniture</option><option>Kitchen</option>');
    } else if(val==='Beauty'){
      cat.append('<option>Skincare</option><option>Makeup</option>');
    }
  });

  nextBtn.on('click', function(){
    if(step===1){
      if(!$('.theme-card.selected').length){
        alert('Please select a theme to continue.');
        return;
      }
    }
    if(step<totalSteps){
      step++;
      showStep(step);
    } else {
      const theme = $('.theme-card.selected').data('theme');
      const productType = $('#productType').val();
      const category = $('#category').val();
      alert('Onboarding complete!\nTheme: '+theme+'\nType: '+productType+'\nCategory: '+category);
    }
  });

  prevBtn.on('click', function(){
    if(step>1){ step--; showStep(step); }
  });

  $('.theme-card').on('keydown', function(e){
    if(e.key==='Enter' && $('.theme-card.selected').length){
      nextBtn.trigger('click');
    }
  });
});
