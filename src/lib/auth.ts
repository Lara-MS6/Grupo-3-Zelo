import AsyncStorage from '@react-native-async-storage/async-storage';

const SESSION_KEY = '@zelo:session';
const USERS_KEY = '@zelo:users';

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function hashPassword(password: string) {
  return btoa(password + 'zelo_salt');
}

async function getUsers(): Promise<any[]> {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
}

async function saveUsers(users: any[]) {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function register(name: string, email: string, phone: string, password: string) {
  const users = await getUsers();
  
  if (users.find((u: any) => u.email === email)) {
    throw new Error('E-mail já cadastrado');
  }

  const newUser = {
    id: generateId(),
    name,
    email,
    phone,
    password: hashPassword(password),
  };

  users.push(newUser);
  await saveUsers(users);

  const session = { id: newUser.id, name, email };
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function login(email: string, password: string) {
  const users = await getUsers();
  const user = users.find((u: any) => u.email === email);
  
  if (!user) throw new Error('E-mail ou senha incorretos');
  if (user.password !== hashPassword(password)) {
    throw new Error('E-mail ou senha incorretos');
  }

  const session = { id: user.id, name: user.name, email: user.email };
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export async function getSession() {
  const data = await AsyncStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export async function logout() {
  await AsyncStorage.removeItem(SESSION_KEY);
}