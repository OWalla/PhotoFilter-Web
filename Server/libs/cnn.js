var convnetjs = require("convnetjs");

function featuresToVolume(features) {
    var x = new convnetjs.Vol([features.RedValue, features.GreenValue, features.BlueValue, features.Brightness, features.ColorBalance, features.SharpnessLevel, features.FacesInImageCount, features.AreFacesInImage]);
    console.log(x);
    return x;
}
exports.trainFirstNetwork = function(photosFeaturesList){

    // define the network
    var layer_defs = [];

    layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth:8});
    layer_defs.push({type:'fc', num_neurons:5, activation:'relu'});
    layer_defs.push({type:'svm', num_classes:2});

    // create the network
    var net = new convnetjs.Net();
    net.makeLayers(layer_defs);

    // train the network
    for (var i = 0; i < photosFeaturesList.length; i++) {
        var featuresVolume = featuresToVolume(photosFeaturesList[i]);
        net.train(featuresVolume, [photosFeaturesList[i].UserClassification]);
    }

    // network outputs all of its parameters into json object
    var netJson = net.toJSON();
    var netStr = JSON.stringify(netJson );
    return netStr;
}

exports.trainNetwork = function(net, photosFeatures) {
    // Load the previous network data to the cnn model
    trainer = new convnetjs.SGDTrainer(net, {
        method: 'adadelta',
        batch_size: 4,
        l2_decay: 0.0001
    });

    // Train the network using the photos
    for (var i = 0; i < photosFeatures.length; i++) {
        var featuresVolume = featuresToVolume(photosFeatures[i]);
        trainer.train(featuresVolume, [photosFeatures[i].UserClassification]);
    }

    // return trained network
    return net;
}

exports.predictImage = function(networkStr, photoFeatures) {
    var featuresVolume = featuresToVolume(photoFeatures);

    var json = JSON.parse(networkStr); // creates json object out of a string
    var net = new convnetjs.Net(); // create an empty network
    net.fromJSON(json);

    var prediction = net.forward(featuresVolume);
    return prediction;
};
