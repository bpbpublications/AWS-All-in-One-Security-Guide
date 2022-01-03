/**
 * Chapter-5: Application Security
 * Sample code to fetch secrets from AWS Secrets Manager
 */
const AWS         = require('aws-sdk');
const REGION_CODE = process.env.REGION_CODE || "ap-south-1";

async function fetchSecret(secretId){
    const SECRET_STRING = "SecretString";
    
    if( !secretId || secretId.trim() == ""){
        throw Error("Invalid secret");
    }

    try{
        AWS.config.update({region: REGION_CODE});

        let request = new AWS.SecretsManager()
                                .getSecretValue({SecretId: secretId});
        let secretValue=null;
        await request.promise()
            .then(function(data){
                if(SECRET_STRING in data){
                    secretValue = data.SecretString; 
                    console.log("Secret value = ", secretValue);
                }
                else{
                    console.error("Expecting secret string..not found");
                    throw Error("Invalid secret");
                }
            })
            .catch(function(err){
                throw err;
            });
        return secretValue;
    }
    catch(err){
        console.error("Error > ", err);
        throw Error("Unable to fetch secret from SecretsManager");
    }
}

(async()=>{
    let secret = await fetchSecret("bpb479-secret3");
    console.log("Secret = ", secret);
})();
