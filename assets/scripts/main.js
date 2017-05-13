(function(){
$('.slider').each(function() {              // For every slider
  var $this   = $(this);              // Current slider
  var $group  = $this.find('.slide-group'); // Get the slide-group (container)
  var $slides = $this.find('.hero__slide');       // Create jQuery object to hold all slides
  var buttonArray  = [];                 // Create array to hold navigation buttons
  var currentIndex = 0;                     // Hold index number of the current slide
  var timeout;

  function move(newIndex) {
    var animateLeft, slideLeft;

    advance();

    if ($group.is(':animated')||currentIndex === newIndex) {
      return;
    }

    buttonArray[currentIndex].removeClass('active');
    buttonArray[newIndex].addClass('active');

    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }

    $slides.eq(newIndex).css({left:slideLeft, display:'block'});
    $group.animate({left: animateLeft}, function() {
      $slides.eq(currentIndex).css({display: 'none'});
      $slides.eq(newIndex).css({left:0});
      $group.css({left: 0});
      currentIndex = newIndex;
    });
  }

  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 4000);
  }

  $.each($slides, function(index){
    var $button = $('<button type="button" class="slide_btn">&bull;</button>');
    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button.on('click', function(){
      move(index);
    }).appendTo($this.find('.slide-buttons'));
    buttonArray.push($button);
  });

  advance();
});
}());

(function(){
  var bars = document.querySelector('.fa-bars');
  var nav = document.querySelector('nav');
  var barsContainer = document.querySelector('.i-container');
  var headerTop = document.querySelector('.header__top');

  var search = document.querySelector('.fa-search');
  var searchContainer = search.parentNode;
  var logo = document.querySelector('.logo__container');
  var searchBar = document.querySelector('.search__container');
  var searchInput = searchBar.firstChild.nextSibling;

  function barsToggle(){
    bars.classList.toggle('ion-close');
    bars.classList.toggle('fa-bars');
  }
  function navToggle(){
    nav.classList.toggle('is-active');
    nav.classList.toggle('is-hidden');
  }
  bars.parentNode.addEventListener('click', function(){
      barsToggle();
      navToggle();
  });
  searchContainer.addEventListener('click', function(){
    if(searchBar.style.display === 'block') {
      searchBar.style.display = 'none';
      logo.style.width = '';
      searchInput.value = '';
      headerTop.insertBefore(barsContainer,logo);
    } else {
      headerTop.removeChild(barsContainer);
      logo.style.width = 'auto';
      searchBar.style.display = 'block';
      searchInput.focus();
    }
  });
}())


$('#addToWatchlistIcon').on('click', function(){
  $.ajax ({
    type: "GET",
    url: 'assets/data/watchlist.html',
    success: function(data){
      $('#addToWatchlist').html(data);
    }
  });
});
