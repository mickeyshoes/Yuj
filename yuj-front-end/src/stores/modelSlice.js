import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setModelBackend, loadModel } from "../utils/ModelFunction";
import { ModelParams } from "../utils/ModelParams";

const initModel = createAsyncThunk("SET_INITIAL_MODEL", async()=>{
    await setModelBackend();
    const model = await loadModel(ModelParams.Config, ModelParams.imageShape);
    return model;
})


const modelSlice = createSlice({

    name: 'modelSlice',

    initialState : {
        similarity : 0,
        color : '',
        model : '',
    
        userInferenceState : {
            cameraState : true,
            targetVideoRef : '',
            targetCanvasRef : '',
            targetCanvasContext: '',
            inferenceState : false,
        },
    
        teacherSkeletonState : {
            isAttend : false,
            cameraState : true,
            targetVideoRef : '',
            targetCanvasRef : '',
            targetCanvasContext: '',
            skeletonState : false,
            color : "Green"
        },
    },
    

    reducers : {

        setUserVideoRef:(state, action) => {
            if(state.userInferenceState.targetVideoRef ==='')
                state.userInferenceState.targetVideoRef = action.payload;
        },

        setUserCanvasRef:(state, action) =>{
            if(state.userInferenceState.targetCanvasRef === '')
                state.userInferenceState.targetCanvasRef = action.payload;
        },

        setUserCanvasContext:(state, action) =>{
            if(state.userInferenceState.targetCanvasContext === '')
                state.userInferenceState.targetCanvasContext = action.payload;
        },

        setTeacherVideoRef:(state, action) => {
            if(state.teacherSkeletonState.targetVideoRef === '')
                state.teacherSkeletonState.targetVideoRef = action.payload;
        },

        setTeacherCanvasRef:(state, action) =>{
            if(state.teacherSkeletonState.targetCanvasRef === '')
                state.teacherSkeletonState.targetCanvasRef = action.payload;
        },

        setTeacherCanvasContext:(state, action) =>{
            if(state.teacherSkeletonState.targetCanvasContext === '')
                state.teacherSkeletonState.targetCanvasContext = action.payload;
        },

        teacherIsAttend:(state) => {
            state.teacherSkeletonState.isAttend =!state.teacherSkeletonState.isAttend;
        },
        toggleUserCamera:(state)=>{
            state.userInferenceState.cameraState =!state.userInferenceState.cameraState;
        },
        toggleTeacherCamera:(state)=>{
            state.teacherSkeletonState.cameraState =!state.teacherSkeletonState.cameraState;
        },
        toggleInferenceMode:(state)=>{
            const beforeState = state.userInferenceState.inferenceState;
            state.userInferenceState.inferenceState =!beforeState;
            console.log('user slice : ', beforeState, " ->" ,state.userInferenceState.inferenceState);
        },

        toggleSkeletonMode:(state)=>{
            state.teacherSkeletonState.skeletonState =!state.teacherSkeletonState.skeletonState;
        },
        returnToInitState:(state)=>{
            state.model = '';
            state.color = '';
            state.userInferenceState = {
                cameraState : true,
                targetVideoRef : '',
                targetCanvasRef : '',
                targetCanvasContext: '',
                inferenceState : false,
                inferenceResult : {}
            };
            //강사가 내 화면에 들어왔을 때 status 갱신해줘서 context 접근 가능하게 하자
            state.teacherSkeletonState = {
                isAttend : false,
                cameraState : true,
                targetVideoRef : '',
                targetCanvasRef : '',
                targetCanvasContext: '',
                skeletonState : false,
                skeletonResult : {},
                color : "Green"
            }; 
        },
    },

    extraReducers : {
        [initModel.fulfilled]:(state, {payload}) => {
            console.log('redux set model? ', payload);
            state.model = payload;
        }
    }

})

export default modelSlice;

export const {
    setUserVideoRef, setUserCanvasRef, setUserCanvasContext,
    setTeacherVideoRef, setTeacherCanvasRef, setTeacherCanvasContext,
    toggleInferenceMode, toggleSkeletonMode, returnToInitState } = modelSlice.actions;

export { initModel };