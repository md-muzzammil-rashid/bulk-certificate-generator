import AsyncHandler from "../utils/AsyncHandler.js"
import ApiError from '../utils/ApiError.js'
import { UserModel } from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"
import e from "express"

const createUser = AsyncHandler(async(req, res, next)=>{
    const {username, password, email} = req.body
    if([username, password, email].some((field)=>(field?.trim() == ("" || null || undefined)))){
        throw new ApiError(400, "All fields are required")
    }
    const existedUser = await UserModel.findOne({$or:[{username:username},{email:email}]})
    if(existedUser){
        throw new ApiError(409, 'User with same username or email already existed')
    }
    
    const user = await UserModel.create({
        username,
        password,
        email
    })

    if(!user){
        throw new ApiError(501, "Failed to create user")
    }
    const registeredUser = await UserModel.findById(user._id).select('-password -createdAt -updatedAt')

    res.status(201)
        .json(
            new ApiResponse(201, "User Created !!!", registeredUser)
        )

})

const generateAccessAndRefreshToken = async function(userId){
    try {
        const user = await UserModel.findById(userId);
        const AccessToken = await user.generateAccessToken();
        const RefreshToken = await user.generateRefreshToken();
        user.refreshToken = RefreshToken;
        user.save({validateBeforeSave:false})
        return {AccessToken, RefreshToken}
    } catch (error) {
        console.log("Error in generating Token", error)
        throw new ApiError(501,"Error in generating tokens")
    }
}

const userLogin = AsyncHandler(async (req, res, next)=>{
    const {usernameORemail, password} = req.body;
    if([usernameORemail, password].some((field)=>field?.trim() === (null || "" || undefined))){
        throw new ApiError(400,"All fieilds are required")
    }

    const user = await UserModel.findOne({$or:[{username:usernameORemail},{email:usernameORemail}]})
    if(!user){
        throw new ApiError(404, "User not existed")
    }
    if(! await user.isPasswordCorrect(password)){
        throw new ApiError(401,"Invalid Credentials")
    }
    const {AccessToken, RefreshToken} = await generateAccessAndRefreshToken(user._id)

    res.status(202)
        .cookie("AccessToken", AccessToken)
        .cookie("RefreshToken", RefreshToken)
        .json(
            new ApiResponse(202, "Login Successful", {user:user, AccessToken, RefreshToken} )
        )
    
    
})

const logoutUser = AsyncHandler(async (req, res, next)=>{
    await UserModel.findByIdAndUpdate(req.user._id, {refreshToken:undefined})
    res.status(202)
        .clearCookie('AccessToken')
        .clearCookie('RefreshToken')
        .json(
            new ApiResponse(202, "Logout Successful")
        )
})

export {
    createUser,
    userLogin,
    logoutUser
}