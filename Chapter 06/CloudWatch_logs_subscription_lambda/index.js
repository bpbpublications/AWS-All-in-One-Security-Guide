var {ungzip} = require('node-gzip');

const ENCODING_BASE64 = "base64";
const ENCODING_ASCII = "ascii";

exports.handler = async function(event, context) {
    var payload = Buffer.from(event.awslogs.data, ENCODING_BASE64);
    
    try{
        const decompressed = await ungzip(payload);
        let result = JSON.parse(decompressed.toString(ENCODING_ASCII));

        // Process the log data and persist
        console.log("Log Event > ", JSON.stringify(result, null, 2));
        context.succeed();
    }
    catch(e){
        context.fail(e);
    }
};