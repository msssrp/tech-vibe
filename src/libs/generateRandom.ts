export function generateRandomEmail() {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789._";
  const usernameLength = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
  const domainLength = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
  let username = "";
  let domain = "";
  for (let i = 0; i < usernameLength; i++) {
    username += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  for (let i = 0; i < domainLength; i++) {
    domain += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${username}@${domain}.com`;
}

export function generateRandomPassword() {
  const length = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    password += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return password;
}
