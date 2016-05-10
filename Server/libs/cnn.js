// var exports = module.exports = {};

function featuresToVolume(features) {
    var x = new convnetjs.Vol(1, 1, 8, 0.0); // a 1x1x8 volume initialized to 0's.
    x.w[0] = features.RedValue;
    x.w[1] = features.GreenValue;
    x.w[2] = features.BlueValue;
    x.w[3] = features.Brightness;
    x.w[4] = features.ColorBalance;
    x.w[5] = features.SharpnessLevel;
    x.w[6] = features.FacesInImageCount;
    x.w[7] = features.AreFacesInImage;

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
        var x = featuresToVolume(photosFeatures[i]);
        trainer.train(x, [photosFeatures[i].UserClassification]);
    }

    // return trained network
    return net;
}

exports.predictImage = function(network, photoFeatures) {
    return 1;

    var x = featuresToVolume(photosFeatures[i]);

    var prediction = network.forward(x);
    return prediction;
};
