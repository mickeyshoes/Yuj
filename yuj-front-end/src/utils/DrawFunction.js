import * as poseDetection from '@tensorflow-models/pose-detection';
import { ModelParams } from './ModelParams';



function drawPoints(context, points, color='White'){
    
    context.fillStyle = color;
    context.beginPath();
    // context.drawImage(imageTag, 0,0, imageTag.width, imageTag.height);

    console.log('drawPoints?', points);

    for(const [key, value] of points.entries()){
        const circle = new Path2D();
        circle.arc(value.position.x, value.position.y, ModelParams.RADIUS, 0 , 2 * Math.PI);
        context.fill(circle);
        context.fillText(value.part, value.position.x-10, value.position.y-10);
        context.stroke(circle);
    }
}


function drawSkeleton(context, points, color='White'){

    context.fillStyle = color;
    context.strokeStyle = color;
    context.lineWidth = ModelParams.LINE_WIDTH;

    console.log('keypoints?', points);

    poseDetection.util.getAdjacentPairs(ModelParams.modelArch).forEach(
        ([i, j])=>{

            const keypoint1 = points[i];
            const keypoint2 = points[j];
            
            // score is null, show keypoint only
            const score1 = keypoint1.score != null ? keypoint1.score : 1;
            const score2 = keypoint2.score != null ? keypoint2.score : 1;
            const scoreThreshHold = ModelParams.SCORE_THRESHHOLD || 0;

            if(score1 >= scoreThreshHold && score2 >= scoreThreshHold){
                context.beginPath();
                context.moveTo(keypoint1.position.x, keypoint1.position.y);
                context.lineTo(keypoint2.position.x, keypoint2.position.y);
                context.stroke();

            }

        });

    console.log('skeleton done');

}

export {drawPoints, drawSkeleton};