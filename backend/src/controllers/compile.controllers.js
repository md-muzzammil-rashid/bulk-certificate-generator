import AsyncHandler from "../utils/AsyncHandler.js"
import { replaceVariablesWithValues } from "../utils/CompilersFunctions/replaceVariablesWithValues.js"
import { certificateComponents, dummyData } from "../utils/constants.js"

const compileData = AsyncHandler(async (req, res, next)=>{

    const dataset = dummyData 
    const tamplateJson = certificateComponents
    
    // const data = getVariables(tamplateJson)
    const data = replaceVariablesWithValues(tamplateJson, dataset)


    return res.status(200)
            .json(data)


})

export {compileData}