/**
 * Chapter-5: Application Security
 * Sample Lambda function to add security headers to CloudFront origin response
 */

exports.handler = (event, context, callback)=>{
    
    const response = event.Records[0].cf.response;
    const headers = response.headers;
    
    // Add security headers
    headers["strict-transport-policy"] = [
                                {   
                                    key: "Strict-Transport-Security", 
                                    value: "max-age=63072000"  // Duration of 1 year
                                }
                            ];
    // Add more headers here

    callback(null, response);	
}
