# google-spreadsheet-auto

### About 
It is a simple Node.Js script to take a dump of a *Google Sheet* and send in mail as attachment.

---------

### Setup
1. Clone the repo    
`git clone https://github.com/imvpn22/google-spreadsheet-auto.git`

2. Install the required packages    
`npm install`

3. Change credentials in *Auth.js* file, which is `user` and `pass`   

4. Run the script     
`node server.js`

----------

#### Bugs
Currently we are using google direct authentication for sending Email so   
sometimes it doesn't allow us to sign-in using the Email-ID and Password.   

To handle that please refer https://support.google.com/mail/answer/7126229?p=BadCredentials&visit_id=636764338377101071-2302349868&rd=2#cantsignin 
   
   
   Suggestions are invited
   
