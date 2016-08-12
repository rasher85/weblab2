var app=angular.module('app', [])
app.controller('LabsCtrl', function ($scope, LabSvc){
  $scope.addLab = function (){
    if ($scope.labName){
      LabSvc.create({
        name: $scope.labName,
        description: $scope.labDescription,
        tumb: $scope.labTumb,
        experimentStructure: $scope.labStructure,
        Camapparatus: $scope.labCaM,
        MaPbackground: $scope.labMaP,
        labLinks: $scope.labLinks,
        guide: $scope.labGuide,
        skeleton: $scope.labSkeleton,
        assignments: $scope.labAssign
      }).sucess(function (labs){


      })
    }
    $scope.labName = null
  }


  LabSvc.fetch().success(function (labs) {
    $scope.labs = labs
  })

})

angular.module('app')
.service('LabSvc', function ($http) {
  this.fetch = function () {
    return $http.get('/api/labs')
  }
  this.create = function (labs) {
    return $http.post('/api/labs', labs)
  }
})
