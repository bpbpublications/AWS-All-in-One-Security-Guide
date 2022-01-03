Install Node.js and NPM before proceeding with this example.

1. Use the following commands in Linux (or corresponding commands in other operating systems) to generate the RSA private key and certificate:
    $ openssl req -newkey rsa:2048 -nodes -keyout private.key -out client.csr
    $ openssl x509 -signkey private.key -in client.csr -req -days 365 -out public.key
    [The private.key and public.key files provided along with the code are dummy with no contents]
2. Change directory (cd) to this folder (the one that contains this Readme.txt file)
3. Place the certificate (public.key) under the ./keys folder
3. Use "npm install" command to install all the dependencies defined in the package.json file
4. Create a zip file with the following files/folders:
    - index.js
    - package.json
    - node_modules folder (gets generated after running npm install command)
    - keys folder (with the public.key inside)
    [DO NOT place the private.key inside the zip]
5. Deploy the zip through Lambda Console under AWS Management Console or AWS CLI commands
6. Configure the Lambda function as Lambda Authorizer for a specific API (as explained in the book)
7. In order to test the Lambda authorizer, use jwt_gen.js (use: node ./jwt_gen.js) to generate a JWT token and then use this token 
   as a "Bearer" token in Authorization header of the API call