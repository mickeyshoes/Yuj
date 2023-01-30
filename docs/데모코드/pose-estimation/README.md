# Pose Estimation

## Getting Started
1. install packages
```shell
npm install @tensorflow/tfjs
npm install @tensorflow-models/posenet
npm install @tensorflow/tfjs-core
npm install @tensorflow/tfjs-backend-cpu
npm install posenet-similarity
```
2. write code your npm lib
```javascript
import * as posenet from '@tensorflow-models/posenet';
import { poseSimilarity } from 'posenet-similarity';

// For more detailed Posenet setup, please refer its own document.
async function estimatePoseOnImage(imageElement) {
  // Load the posenet model from a checkpoint
  const net = await posenet.load();
  // Estimate the pose on the imageElement
  const pose = await net.estimateSinglePose(imageElement);
  return pose;
}

const pose1ImageElement = document.getElementById('pose1');
const pose2ImageElement = document.getElementById('pose2');

Promise.all([
  estimatePoseOnImage(pose1ImageElement),
  estimatePoseOnImage(pose2ImageElement)
]).then(poses => {
  // Calculate the weighted distance between the two poses
  const weightedDistance = poseSimilarity(poses[0], poses[1]);
  console.log(weightedDistance)
});
```

## demo images
!()['./데모 화면.PNG']

## Reference
[posenet-similarity](https://github.com/freshsomebody/posenet-similarity)


[두 사람의 동작 유사도 계산하기](https://blog.solarmagic.dev/ml/2021/04/16/pose-similarity/)
