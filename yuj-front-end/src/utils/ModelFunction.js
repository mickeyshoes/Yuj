import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

import * as tf from '@tensorflow/tfjs-core';
import * as poseDetection from '@tensorflow-models/pose-detection';

import { poseSimilarity } from "posenet-similarity";


async function setModelBackend (targetDevice){
    const engineList = tf.engine().registryFactory;
    if ( targetDevice && targetDevice in engineList){ await tf.setBackend(targetDevice) } 
    //set best backend automatically(choose by priority in registryFactory)
    else{ await tf.backend() }
    console.log("Current inference Devices : ", tf.getBackend());
}

async function loadModel(modelConfig, imageShape){
    let model = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, modelConfig);
    //warm up
    await model.estimatePoses(tf.zeros(imageShape));
    console.log(model);
    // model.dispose();
    return model;
}

async function estimate(detector, imageElement){
    console.log('estimate function access');
    console.log('estimate detector : ', detector);
    console.log('estimate params : ',detector, imageElement);
    var infStartTime = Date.now();
    const pose = await detector.estimatePoses(imageElement, {flipHorizontal: false});
    console.log('inf time : ', Math.floor((Date.now() - infStartTime)/1000), tf.getBackend());
    console.log(pose);

    if(!pose.length)
        // throw new Error("Cannot find poses. try again or check your state");
        return {keypoints:[]};
    return pose[0];
}

async function calSimilarity(config, origin, target){

    // var calStartTime = Date.now();
    const similarity = await poseSimilarity(origin, target, config);
    // var calEndTime = Date.now();
    let strategy = config.strategy;
    console.log(similarity);

    // return {strategy : strategy, result : similarity, time : Math.floor((calEndTime - calStartTime)/1000)};
    return similarity;
}

function convertToCalculateFormat(pose){
    console.log('formatting to similarity');
    const formatObjectList = [];
    for(const [key, value] of pose.keypoints.entries()){
        let formatObject = {
            score : value.score,
            part : value.name,
            position : {
                x : value.x,
                y : value.y
            }
        }
        formatObjectList.push(formatObject);
    }

    //deep copy
    pose.keypoints = [...formatObjectList];
    console.log('converting done');
    return pose;
}

export {setModelBackend, loadModel, estimate, convertToCalculateFormat, calSimilarity }