$(function () {
    var
        $window = $(window),
        $home = $('#home'),

        // Shameless hack of FB Iframe plugin
        resizeFb = function () {
            if (!$home.length) {
                return;
            }
            var width = ($window.width() > 768) ? parseInt($home.width() * 0.38, 10) : $home.width();
            $home.find('iframe').remove();
            $home.append('<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fearthdayfortwayne&amp;width='+width+'&amp;height=590&amp;show_faces=true&amp;colorscheme=light&amp;stream=true&amp;border_color&amp;header=true&amp;appId=488750714505287" scrolling="no" frameborder="0" style="border:none;background:white;overflow:hidden;height:590px;" allowTransparency="true"></iframe>');
            $home.find('iframe').css({width: width});
        };

    $window.resize(resizeFb);
    resizeFb();
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-39444403-1']);
_gaq.push(['_trackPageview']);
(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
