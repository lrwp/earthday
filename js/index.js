$(function () {
    var
        $window = $(window),
        $home = $('#home'),
        $event = $('#event-map'),
        $sponsor = $('#sponsors'),

        // Shameless hack of FB Iframe plugin
        doResize = true,
        resizeFb = function () {
            if (!doResize) {
                return;
            }
            var width = ($window.width() > 768) ? parseInt($home.width() * 0.38, 10) : $home.width();
            $home.find('iframe').remove();
            $home.append('<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fearthdayfortwayne&amp;width='+width+'&amp;height=590&amp;show_faces=true&amp;colorscheme=light&amp;stream=true&amp;border_color&amp;header=true&amp;appId=488750714505287" scrolling="no" frameborder="0" style="border:none;background:white;overflow:hidden;height:590px;" allowTransparency="true"></iframe>');
            $home.find('iframe').css({width: width});
        },

        router = Router({

            '/': function () {
 
                var $active = $('.active');
                $active.hide(0, function () {
                    doResize = true;
                    $home.show().addClass('active');
                });

                if ($active[0].id !== 'home') {
                    $active.removeClass('active');
                }
            },

            '/event-map': function () {

                var $active = $('.active');

                if (!$event.attr('data-init')) {
                    $.get('event-map.html', function(html) {
                        $active.hide(0, function(){
                            doResize = false;
                            $event
                                .html(html)
                                .show()
                                .attr('data-init', 1)
                                .addClass('active');
                        });
                    });
                } else {
                    $active.hide(0, function () {
                        $event.show().addClass('active');
                    });
                }

                if ($active[0].id !== 'event-map') {
                    $active.removeClass('active');
                }

            },

            '/sponsors': function () {
                var $active = $('.active');

                if (!$sponsor.attr('data-init')) {
                    $.get('sponsors.html', function(html) {
                        $active.hide(0, function(){
                            doResize = false;
                            $sponsor
                                .html(html)
                                .show()
                                .attr('data-init', 1)
                                .addClass('active');
                        });
                    });
                } else {
                    $active.hide(0, function () {
                        $sponsor.show().addClass('active');
                    });
                }
 
                if ($active[0].id !== 'sponsors') {
                    $active.removeClass('active');
                }

            } 
        });


    $window.resize(resizeFb);
    resizeFb();
    router.init();

    // TMP
    if (location.href.split('?')[1] === 'x') {
        $(document.body).show();
    }

    

});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-39444403-1']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
