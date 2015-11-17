Meteor.methods({
    'saveDocument': function (usrName) {
        return UserList.insert({'name': usrName});
    },

    'algorithmia': function(){
    	HTTP.call("POST", "https://api.algorithmia.com/v1/algo/docs/JavaAddOne",
          {data: {input: 1}},
          {headers: {
          "Content-Type": 'application/json',
          "Authorization": 'Simple sim5BKo8GlnVCZlnOKRjuX6z43F1'
          }},
          function (error, result) {
            if (!error) {
              console.log("lolol")
            }
          });
    },

    'test' : function(){
    	console.log("test");
    }
})