var svmjs = require("svm");

var options = {};
/* For C, Higher = you trust your data more. Lower = more regularization.
 Should be in range of around 1e-2 ... 1e5 at most. */
options.C = 1.0;
options.tol = 1e-4; // do not touch this unless you're pro
options.alphatol = 1e-7; // used for pruning non-support vectors. do not touch unless you're pro
options.maxiter = 50000; // if you have a larger problem, you may need to increase this
options.numpasses = 50; // increase this for higher precision of the result. (but slower)

exports.trainFirstSVM = function(data, labels){

    // create the SVM
    var svm = new svmjs.SVM();
    var newData = [];
    data.forEach(function (element, index) {
        var arr = [element.RedValue,
            element.GreenValue,
            element.BlueValue,
            element.Brightness,
            element.ColorBalance,
            element.SharpnessLevel,
            element.FacesInImageCount,
            element.AreFacesInImage == true ? 1 : 0];
        newData.push(arr);
    });

    svm.train(newData, labels,options);
    // return the SVM as JSON
    var SVMJson = svm.toJSON();

    return SVMJson;
}

exports.trainSVM = function(preTrainedSVM, data, labels) {

    // Load the pre trained svm
    var svm = new svmjs.SVM();
    svm.fromJSON(preTrainedSVM);

    // Continue training it
    svm.train(data, labels,options);

    // return the SVM as JSON
    var SVMJson = svm.toJSON();
    return SVMJson;
}

exports.predictImage = function(SvmJson, photos) {

    // Load the pre trained svm
    var svm = new svmjs.SVM();
    svm.fromJSON(SvmJson);

    var newData = [];
    photos.forEach(function (element, index) {
        var arr = [element.RedValue,
            element.GreenValue,
            element.BlueValue,
            element.Brightness,
            element.ColorBalance,
            element.SharpnessLevel,
            element.FacesInImageCount,
            element.AreFacesInImage == true ? 1 : 0];
        newData.push(arr);
    });
    var testLabels = svm.predict(newData);
    return testLabels;
};
