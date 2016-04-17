angular.module('ngGitHub').directive('blurryImageLoad', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            smallImage: '=',
            largeImage: '='
        },
        template:
        '<div class="placeholder" largeImage="{{largeImage}}">' +
        '<img ng-src="{{smallImage}}" class="img-small">' +
        '<div style="padding-bottom: 100%;">' +
        '</div>',
        link: function (scope, element, attrs) {

            scope.$watch('[smallImage,largeImage]', function () {
                if(scope.smallImage && scope.largeImage) {

                    var placeholder = $(element).find('.placeholder'),
                        small = $(placeholder).find('.img-small');

                    small.removeClass('loaded');
                    $(element).find('.large-image').remove();

                    // 1: load small image and show it
                    var img = new Image();
                    img.src = scope.smallImage;
                    img.onload = function () {
                        small.addClass('loaded');
                    };

                    // 2: load large image
                    var imgLarge = new Image();
                    imgLarge.src = scope.largeImage;
                    imgLarge.onload = function () {
                        $(imgLarge).addClass('loaded');
                        $(imgLarge).addClass('large-image');
                    };
                    placeholder.append(imgLarge);
                }
            });



        }
    }
});