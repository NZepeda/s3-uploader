// Houses all of our endpoints

// Query mongodb to get a fullList of all of our images
exports.findAll = function(req, res){
    res.send([{
        "id": 1,
        "name": "Max",
        "band": "Maximum Pain",
        "instrument": "guitar"
    }]);
};

// This should add to our mongo collection
exports.add = function(){
    res.send(200, "Added succeeded");
};