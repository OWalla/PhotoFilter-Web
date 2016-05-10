var convnetjs = require("convnetjs");

function featuresToVolume(features) {
  console.log(features);
    var x = new convnetjs.Vol([features.RedValue, features.GreenValue, features.BlueValue, features.Brightness, features.ColorBalance, features.SharpnessLevel, features.FacesInImageCount, features.AreFacesInImage]);
    console.log(x);
    return x;
}

exports.trainNetwork = function(network, photosFeatures) {
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

exports.predictImage = function(network, photoFeatures) {
    var featuresVolume = featuresToVolume(photoFeatures);

    var prediction = network.forward(featuresVolume);
    return prediction;
};
