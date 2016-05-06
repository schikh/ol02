(function () {
    'use strict';

    angular.module('ngeoSchemaModule')
        .controller('toolbar', ['$scope', 'frame2', function ($scope, frame2) {
            var vm = this;
            vm.frame = frame2;
            vm.activateLayerBar = function () {
                frame2.toggleSidebar('sidebar');
            };
    }]);
})();
