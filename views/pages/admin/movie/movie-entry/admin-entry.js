$(document).ready(function () {
    var $submitButton = $('#submitButton');

    $submitButton.on('click', function () {
        var sendData = getFormData();
        $.ajax({
            type: 'post',
            url: "/movie/new",
            headers: {
                'Accept': "application/xxx",
                'Content-Type': "application/json; charset=utf-8",//(可以)
            },
            data: JSON.stringify(sendData),
            dataType: 'json',
            success: function (res) {
                console.log(res);
            }
        });

    });

    function getFormData() {
        var $movieId = $('#movieId');
        var $name = $('#inputName');
        var $alias = $('#inputAlias');
        var $director = $('#inputDirector');
        var $screenwriter = $('#inputScreenwriter');
        var $actor = $('#inputActor');
        var $type = $('#inputType');
        var $region = $('#inputRegion');
        var $language = $('#inputLanguage');
        var $releaseTime = $('#inputReleaseTime');
        var $filmLength = $('#inputFilmLength');
        var $sourceUrl = $('#inputSourceUrl');
        var $brief = $('#inputBrief');
        var $cover = $('#inputCover');
        return {
            _id: $movieId.val(),
            name: $name.val(),
            alias: $alias.val(),
            director: $director.val(),
            screenwriter: $screenwriter.val(),
            actor: $actor.val(),
            type: $type.val(),
            region: $region.val(),
            language: $language.val(),
            releaseTime: $releaseTime.val(),
            filmLength: $filmLength.val(),
            sourceUrl: $sourceUrl.val(),
            brief: $brief.val(),
            cover: $cover.val()
        };
    }
});