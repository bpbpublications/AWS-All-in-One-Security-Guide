/**
 * Chapter-5: Application Security
 * Sample JWT based token authorizer
 */
const jwt = require('jsonwebtoken');
const fs = require('fs');
const UNAUTHORIZED = 'Unauthorized';

exports.handler = async(event)=>{
    const BEARER = "Bearer "; // Authorization type = Bearer

    console.log("Event >> ", event);
    var token = event.authorizationToken;

    if(token && token.startsWith(BEARER)){
        console.log("Bearer token used");
        token = token.substring(BEARER.length); // extract JWT token
    }

    // Public certificate could be fetched from S3, KMS or JWKS endpoints instead
    var cert = fs.readFileSync('./keys/public.key'); 
    var response = {};
    try{
        var decoded = jwt.verify(token, cert, { algorithms: ['RS256']});
        console.log("Decoded token >> ", decoded);

        response = generate_iam_policy(decoded.uid, 'Allow', event.methodArn);
        return response;
    }
    catch(err){
        console.error("Error >> ", err);
        throw UNAUTHORIZED;
    }
};

var generate_iam_policy = (principal, effect, resource)=>{
    let response = {};
    response.principalId = principal;
    
    let policyDocument = {};
    policyDocument.Version = '2012-10-17'; 
    policyDocument.Statement = [];

    let statement = {};
    statement.Action = 'execute-api:Invoke'; 
    statement.Effect = effect;
    statement.Resource = resource;
    policyDocument.Statement[0] = statement;

    response.policyDocument = policyDocument;
    return response;
}
