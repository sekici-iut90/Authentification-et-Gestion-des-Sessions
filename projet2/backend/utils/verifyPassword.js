import bcrypt from 'bcryptjs';

export async function verifyPassword(plainText, hashed) {
  console.log(plainText, hashed, '12345655er56aafa')
  return await bcrypt.compare(plainText, hashed);
}

export async function hashPassword(plainText) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainText, saltRounds);
 console.log("Mot de passe haché:", hashedPassword, 444444444);
  return hashedPassword;
}

//hashPassword('password456')  
  //  .then(hashedPassword => {
    // console.log('Mot de passe haché:', hashedPassword, 5555);
//    })
  //  .catch(error => {
    //  console.error('Erreur lors du hachage du mot de passe:', error);
   // });

//hashPassword('password123'); 
//verifyPassword('147', '$2b$10$Ec65nUuaEugkG4z7Os.rUuwfGRrihGyqSNRkhdtSGiiizYMzDS/8y');
console.log(verifyPassword('147', '$2b$10$Ec65nUuaEugkG4z7Os.rUuwfGRrihGyqSNRkhdtSGiiizYMzDS/8y'), 1455655)
