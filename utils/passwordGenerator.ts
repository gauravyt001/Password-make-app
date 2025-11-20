export interface PasswordOptions {
  length: number;
  includeLetters: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

export const generatePassword = (options: PasswordOptions): string => {
  const { length, includeLetters, includeNumbers, includeSymbols } = options;

  if (!includeLetters && !includeNumbers && !includeSymbols) {
    return '';
  }

  const letterChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  let charset = '';
  if (includeLetters) charset += letterChars;
  if (includeNumbers) charset += numberChars;
  if (includeSymbols) charset += symbolChars;

  let password = '';
  const array = new Uint32Array(length);
  
  // Use crypto.getRandomValues for better entropy than Math.random()
  window.crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length];
  }

  return password;
};

export const calculateStrength = (password: string): 'Weak' | 'Medium' | 'Strong' => {
  if (password.length < 8) return 'Weak';
  
  let score = 0;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score === 3 && password.length >= 12) return 'Strong';
  if (score >= 2 && password.length >= 8) return 'Medium';
  return 'Weak';
};