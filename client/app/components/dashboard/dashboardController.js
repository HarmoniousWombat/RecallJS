angular.module('RecallJS')
  .controller('DashboardController', function($window, $scope, Auth, ProblemData, LearningAlgo){

    ProblemData.getOwn()
      .then(function(problems){
        $scope.problems = problems;
      });

    $scope.remove = function(problem){
      ProblemData.removeOwn(problem)
        .then(function(){
          ProblemData.getOwn()
            .then(function(problems){
              $scope.problems = problems;
            });
        });
    };

    $scope.username = JSON.parse($window.localStorage.getItem('com.recalljs')).username;
    $scope.calcWeight = LearningAlgo.calculateWeight;
    $scope.lastAttempted = LearningAlgo.getLastAttemptDate;
    $scope.avgRating = LearningAlgo.calcAverageRating;

    // Requirements
    //   1. Use ProblemData.getOwn() to obtain user's problems
    //   2. Display user's problems in a table
    //      a. Problem title
    //      b. Problem prompt
    //      c. # of attempts
    //      d. Average rating
    //      e. Last attempt
    //      f. Associated weight (maybe)
  });