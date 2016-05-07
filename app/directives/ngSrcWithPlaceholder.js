angular.module('ngGitHub').directive("ngSrcWithPlaceholder", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {


            var placeholder = new Image();
            placeholder.src = "images/profile-placeholder.png";
            placeholder.onload = function () {
                element[0].src = placeholder.src;
                element[0].classList.add('loaded');

                var img = new Image();
                img.onload = function () {
                    element[0].src = attrs.ngSrcWithPlaceholder;
                };
                img.src = attrs.ngSrcWithPlaceholder;
            };

        }
    };
});