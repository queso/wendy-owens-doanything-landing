/**
 * Created by danadrian on 11/05/15.
 */

(function($) {
    "use strict";


    function SoftLightAudioPlayer (parent)
    {

        $(parent).html( '<div class="audio-content"> ' +
                        '     <div class="controls"> ' +
                        '<ul class="list-inline"> ' +
                        '    <li><a href="#" class="backward"><i class="fa fa-step-backward"></i></a></li> ' +
                        '    <li><a href="#" class="playpause"><i class="fa fa-play"></i></a></li> ' +
                        '    <li><a href="#" class="forward"><i class="fa fa-step-forward"></i></a></li> ' +
                        '</ul> ' +
                        '</div> ' +
                        ' ' +
                        '<div class="audio-progress"> ' +
                        '    <div class="duration-wrapper"> ' +
                        '        <div class="current-duration"></div> ' +
                        '    </div> ' +
                        '</div> ' +
                        '<div class="audio"> ' +
                        '<span class="duration-text">00:00</span> ' +
                        '<a class="volume hidden-xs" href="#"><i class="fa fa-volume-up"></i></a> ' +
                        '</div> ' +
                        '    <div class="volume-control" style="text-align: right;"> ' +
                        '        <input type="text" class="slider volume-value" value="" data-slider-min="0" data-slider-max="100" data-slider-step="1" data-slider-value="100" data-slider-tooltip="hide" /> ' +
                        '    </div> ' +
                        '</div>');


        var CurrentAudio = null;
        var AudioUrl     = $(parent).data('file');
        var Parent       = parent;
        var ProgressBar  = $(parent).find('.current-duration');
        var DurationText = $(parent).find('.duration-text');
        var InnerTimer   = null;
        var PlayPauseBtn = $(parent).find('i.fa-play');
        var ForwardBtn   = $(parent).find('.forward');
        var BackwardBtn  = $(parent).find('.backward');

        this.Start = function()
        {
            CurrentAudio = new Audio( AudioUrl );
            $(DurationText).text( '' );


            $(Parent).find('.volume').on('click', function(ev){
                ev.preventDefault();
                $(Parent).find('.volume-control').toggle();
            });

            $(Parent).find('.slider').slider().on('slide', function(ev){
                CurrentAudio.volume = getVolume();
            });
            $(Parent).find('.playpause').on('click', function(ev){
                ev.preventDefault();
                PlayOrPause();
            });
            $(ForwardBtn).on('click', function(ev)
            {
                ev.preventDefault();
               GoForward();
            });
            $(BackwardBtn).on('click', function(ev)
            {
                ev.preventDefault();
                GoBackward();
            });
        }

        var PlayOrPause = function()
        {
            if( CurrentAudio.paused )
            {
                CurrentAudio.play();
                $(PlayPauseBtn).removeClass('fa-play').addClass('fa-pause');
                InnerTimer = setInterval( function()
                {
                    setProgress( CurrentAudio.currentTime, CurrentAudio.duration );
                    if( CurrentAudio.currentTime == CurrentAudio.duration )
                    {
                        $(PlayPauseBtn).removeClass('fa-pause').addClass('fa-play');
                        clearInterval( InnerTimer );
                    }
                }, 100);
            }
            else
            {
                $(PlayPauseBtn).removeClass('fa-pause').addClass('fa-play');
                CurrentAudio.pause();
                clearInterval( InnerTimer );
            }
        }

        var GoForward = function()
        {
            if( !CurrentAudio.paused )
            {
                CurrentAudio.currentTime += 1;
            }
        }

        var GoBackward = function()
        {
            if( !CurrentAudio.paused )
            {
                CurrentAudio.currentTime -= 1;
            }
        }



        var getVolume = function()
        {
            var volume = $(parent).find('.volume-value').val();
            return parseInt(volume) / 100;
        }

        var setProgress = function(progress, total)
        {
            var value = Math.ceil((progress*100)/total);
            $(ProgressBar).css('width', value + '%');
            $(DurationText).text( secondsToNiceFormat(progress) );
        }

        var secondsToNiceFormat = function ( seconds )
        {
            var minutes = Math.floor(seconds / 60);
            var seconds = Math.floor( seconds - minutes * 60 );

            return pad(minutes,2) + ":" + pad(seconds,2);
        }

        var pad = function(num, size) {
            var s = num+"";
            while (s.length < size) s = "0" + s;
            return s;
        }
    }



    $('.softlightweb-audio').each
    (
        function()
        {
            var player = new SoftLightAudioPlayer( $(this) );
            player.Start();
        }
    );

})(jQuery);
