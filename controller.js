angular
  .module("app", [])

  .controller("dataController", [
    "$scope",
    "$http",
    function($scope, $http) {
      $scope.exercises = [
        { name: "Press", weight: 135, rep: 5, time: new Date("4/28/16 18:16") },
        { name: "Bench", weight: 135, rep: 5, time: new Date("4/28/16 18:17") },
        { name: "Squat", weight: 135, rep: 5, time: new Date("4/28/16 18:19") },
        { name: "Squat", weight: 135, rep: 5, time: new Date("4/8/16 18:19") },
        { name: "Squat", weight: 135, rep: 5, time: new Date("4/18/16 18:19") }
      ];

      $scope.toDoItems = [
        { name: "Make productive page" },
        { name: "Learn React Native" },
        { name: "MERN" }
      ];

      $scope.addToDo = function() {
        var newToDo = {};
        newToDo.time = Date.now;
        newToDo.name = $scope.toDoName;

        $scope.toDoItems.push(newToDo);
      };

      $http
        .get("/ex")
        .success(function(data) {
          console.log("Successful connect");
          console.log(data);
          $scope.exercises = data;
          $scope.convertData(data);
        })
        .error(function(data) {
          console.log("Non successful");
          console.log(data);
        });

      $scope.addExercise = function() {
        var newExercise = {};
        newExercise.name = $scope.exerciseName;
        newExercise.weight = $scope.exerciseWeight || 0;
        newExercise.rep = $scope.exerciseRep || 0;
        if (
          $scope.exerciseTime != null
            ? (newExercise.time = new Date($scope.exerciseTime))
            : (newExercise.time = new Date())
        )
          // newExercise.time = new Date($scope.exerciseTime) || new Date();
          console.log(newExercise);
        $scope.exercises.push(newExercise);
        $scope.convertData($scope.exercises);

        var postRequest = {
          method: "POST",
          url: "/ex",
          data: newExercise
        };

        $http(postRequest)
          .success(function(data) {
            console.log("Success add");
            console.log(data);
            $http
              .get("/ex")
              .success(function(data) {
                $scope.exercises = data;
                $scope.convertData(data);
              })
              .error(function(data) {
                console.log("Non successful:add reload");
                console.log(data);
              });
          })
          .error(function(data) {
            console.log("Error");
            console.log(data);
          });
      };

      $scope.editExercise = function() {
        var editedExericise = composeExercise();

        var postRequest = {
          method: "POST",
          url: "/update/" + $scope.exerciseId,
          data: editedExericise
        };
        $http(postRequest)
          .success(function(data) {
            console.log("Success");
            console.log(data);

            //reload
            $http
              .get("/ex")
              .success(function(data) {
                $scope.exercises = data;
                $scope.convertData(data);
              })
              .error(function(data) {
                console.log("Non successful:edit reload");
                console.log(data);
              });
          })
          .error(function(data) {
            console.log("Error");
            console.log(data);
          });
      };

      $scope.deleteExercise = function() {
        var exerciseToDelete = composeExercise();

        var postRequest = {
          method: "POST",
          url: "/delete/" + $scope.exerciseId,
          data: exerciseToDelete
        };
        $http(postRequest)
          .success(function(data) {
            console.log("Success");
            console.log(data);

            //reload
            $http
              .get("/ex")
              .success(function(data) {
                $scope.exercises = data;
                $scope.convertData(data);
              })
              .error(function(data) {
                console.log("Non successful:edit reload");
                console.log(data);
              });
          })
          .error(function(data) {
            console.log("Error");
            console.log(data);
          });
      };
    }
  ]);
