jQuery(document).ready(function($) {
  var timelineBlocks = $('.cd-timeline-block'),
    offset = 0.8;

  //hide timeline blocks which are outside the viewport
  hideBlocks(timelineBlocks, offset);

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function() {
    (!window.requestAnimationFrame) ? setTimeout(function() {
      showBlocks(timelineBlocks, offset);
    }, 100): window.requestAnimationFrame(function() {
      showBlocks(timelineBlocks, offset);
    });
  });

  function hideBlocks(blocks, offset) {
    blocks.each(function() {
      ($(this).offset().top > $(window).scrollTop() + $(window).height() * offset) && $(this).find('.cd-timeline-img, .cd-timeline-content, .cd-date').addClass('is-hidden');
    });
  }

  function showBlocks(blocks, offset) {
    blocks.each(function() {
      ($(this).offset().top <= $(window).scrollTop() + $(window).height() * offset && $(this).find('.cd-timeline-img').hasClass('is-hidden')) && $(this).find('.cd-timeline-img, .cd-timeline-content, .cd-date').removeClass('is-hidden').addClass('bounce-in');
    });
  }

  //expand data on click  
  jQuery('.cd-timeline-content .project-content').click(function() {
    jQuery(this).children('.title').toggleClass('expanded');
    jQuery(this).siblings('.description').slideToggle(600);

  });

  //close open project on tab click
  function close_OpenProject() {
    var panel = jQuery('.cd-timeline-content .project .description');
    jQuery(panel).each(function() {
      if (jQuery(this).css('display') == 'block') {
        jQuery(this).css('display', 'none');
        jQuery(this).siblings('.project-content').children('.title').removeClass('expanded');
      }
    });
  };

  function chec_Project_length() {
    jQuery('.cd-container .cd-timeline-block_year').each(function() {
      if (jQuery(this).css("display") === "none") {
        jQuery(this).next("div.cd-timeline-block_year").addClass("first");
      }
    });

    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').each(function() {
      if (jQuery(this).children('.project').length > 1) {
        jQuery(this).children('.project').next().addClass('paddingTop');
      }
      if (jQuery(this).children('.project').eq(0).is(':hidden')) {
        jQuery(this).children('.project').next().removeClass('paddingTop');
      }
    });
  }

  function checkVisibility() {
    jQuery('#cd-timeline .cd-timeline-block_year').removeClass('visible').removeClass('last-one').removeClass('first-one');
    jQuery('#cd-timeline .cd-timeline-block_year').each(function() {
      if (jQuery(this).is(':visible')) {
        jQuery(this).addClass('visible');
      }
    });
    var length = jQuery('#cd-timeline .cd-timeline-block_year.visible').length;
    length = length - 1;
    jQuery('#cd-timeline .cd-timeline-block_year.visible:eq(' + length + ')').addClass('last-one');
    jQuery('#cd-timeline .cd-timeline-block_year.visible:eq(0)').addClass('first-one');
  }

  function checkChildVisibility() {
    jQuery('#cd-timeline .cd-timeline-block_year.last-one .cd-timeline-block').removeClass('visible').removeClass('last-one');
    jQuery('#cd-timeline .cd-timeline-block_year.last-one .cd-timeline-block').each(function() {
      if (jQuery(this).is(':visible')) {
        jQuery(this).addClass('visible');
      }
    });
    var length = jQuery('#cd-timeline .cd-timeline-block_year.last-one .cd-timeline-block.visible').length;
    length = length - 1;
    jQuery('#cd-timeline .cd-timeline-block_year.last-one .cd-timeline-block.visible:eq(' + length + ')').addClass('last-one');
  }

  checkVisibility();
  checkChildVisibility();
  chec_Project_length();

  jQuery('ul.timeline li').click(function() {
    jQuery(this).addClass('active').siblings().removeClass('active');
    var trarget_class = jQuery(this).attr('class');
    var st = trarget_class.split(' ');
    var firstClass = st[0];
    close_OpenProject();

    jQuery('.cd-timeline-block_year').hide();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.project').hide();
    chec_Project_length();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.project').parents('.cd-timeline-block').hide();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.' + firstClass).parents('.cd-timeline-block_year').show();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.' + firstClass).parents('.cd-timeline-block').show();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.' + firstClass).show();
    showBlocks(timelineBlocks, offset);
    checkVisibility();
    checkChildVisibility();
  });

  jQuery('ul.timeline li.all').click(function() {
    close_OpenProject();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.project').show();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.project').parents('.cd-timeline-block').show();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').parents('.cd-timeline-block_year').show();
    chec_Project_length();
    checkVisibility();
    checkChildVisibility();
  });
  
   //Project filter for mobile
  jQuery('.timeline-filter-tab .view-content-filter-mob').change(function() {
    var myClass = jQuery(this).val();    
    close_OpenProject();
    jQuery('.cd-timeline-block_year').hide();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.project').hide();
    chec_Project_length();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.project').parents('.cd-timeline-block').hide();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.' + myClass).parents('.cd-timeline-block_year').show();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.' + myClass).parents('.cd-timeline-block').show();
    jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.' + myClass).show();
    showBlocks(timelineBlocks, offset);
    checkVisibility();
    checkChildVisibility();
   
    if (myClass == "all") {
       close_OpenProject();
       jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.project').show();
       jQuery('.cd-container .cd-timeline-block .cd-timeline-content').find('.project').parents('.cd-timeline-block').show();
       jQuery('.cd-container .cd-timeline-block .cd-timeline-content').parents('.cd-timeline-block_year').show();
       chec_Project_length();
       checkVisibility();
       checkChildVisibility();
    }
  });
  
});
