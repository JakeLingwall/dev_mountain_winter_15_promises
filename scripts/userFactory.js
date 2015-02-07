angular.module('servicesReviewApp').factory('userFactory', function($http, $q){

  //factories return objects. Thus we are going to define our
  //api object here and return that back to be used in controllers
  //and possibly directives in the future.
  var api = {
    getUsers: function(){
      //now instead of returing back the promise returned from
      //angulars $http method we are going to manually create our
      //own promise so we can control the entire flow.
      //we created that promise by using angulars $q provider.
      //the $ means it's angulars stuff.
      //we inject $q in our factory declaration on line 1.
      //We create a deferred object and assign it the value of
      //$q.defer() which creates a deferred object that has a promise parameter;
      var deferred = $q.defer();
      
      //The function then hits this async code and kicks it off.
      //However, because it's goign to take a long time (promise based) it doesn't block
      //and allows the program to continue.
      $http.get('http://reqr.es/api/users?page=1').then(function(data){
          //finally our async request is finished! 
          //The promise returned by $http has been resolved and we are now in it's "then" function.
          //So we have acess to it's response data here named "data";
          //However, we want to transform that data to look different.
          //so we loop over that data using the Array objects forEach method.
          data.data.data.forEach(function(person){
          //each person object in the data.data.data array is transformed.
          //we create a new key of "name" and assign it the value based off of the available person data.
          person.name = person.first_name + " " + person.last_name;
        });
        //Now once our data is finaly in the form we want it.
        //We resolve our manual promise. Which will cause the
        //".then function" in the ctrl to execute with the data
        //we pass to it.
        //We resolve that promise by calling the resolve method on our deferred object.
        //We give that method the data we want passed back to the ctrl to have in it's .then function.
        deferred.resolve(data.data.data);        
      })
      //Because the async function above didn't block we hit this line of code
      //before the async code is finished. 
      //So we send our manual promise back to the ctrl telling it that we promise
      //to give it data as soon as it's ready (once it's resolved).
      return deferred.promise;
    },

    postData: function(newObject){
      return $http.post('https://api.parse.com/1/classes/chat', newObject);
    },
    updateData: function(id){
      return $http.put('https://api.parse.com/1/classes/chat', {id: id});    
    }
  }

  return api;
})
