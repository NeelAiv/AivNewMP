var crypto = require('crypto'); 
class PasswordUtil{
    
    setPassword(password) { 
      var obj={};    
        // Creating a unique salt for a particular user 
        obj.key = crypto.randomBytes(16).toString('hex'); 
           // Hashing user's salt and password with 1000 iterations, 
           //    64 length and sha512 digest 
           obj.hash = crypto.pbkdf2Sync(password, obj.key,  
           1000, 64, `sha512`).toString(`hex`); 
            return obj;
        }; 

    validPassword(password,key,hashToCheck) { 
        var hash = crypto.pbkdf2Sync(password,  
        key, 1000, 64, `sha512`).toString(`hex`); 
        
        return hash == hashToCheck;
    }; 
    
}
module.exports = PasswordUtil