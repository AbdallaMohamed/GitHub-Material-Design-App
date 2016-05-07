angular.module('ngGitHub').directive('blurryImageLoad', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            smallImage: '=',
            largeImage: '='
        },
        template: '<div class="placeholder">' +
        '<img ng-src-with-placeholder="{{smallImage}}" class="img-small">' +
        '<div style="padding-bottom: 100%;">' +
        '</div>',
        link: function (scope, element, attrs) {

            var placeholder = element.children('.placeholder'),
                small = placeholder.children('.img-small');

            scope.$watch('[smallImage,largeImage]', function () {
                if (scope.smallImage && scope.largeImage) {

                    small.removeClass('loaded');
                    element.find('.large-image').remove();

                    // 1: load small image and show it
                    var img = new Image();
                    img.src = scope.smallImage;
                    img.onload = function () {
                        // small.addClass('loaded');
                    };

                    // 2: load large image
                    var imgLarge = new Image();
                    angular.element(imgLarge).addClass('img-large');
                    imgLarge.src = scope.largeImage;
                    imgLarge.onload = function () {
                        angular.element(imgLarge).addClass('loaded');
                    };

                    placeholder.append(imgLarge);

                }
            });


        }
    }
});