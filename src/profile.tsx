import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_PROFILE, Profile } from './data';

const KEY = 'mfportfolio:profile:v1';
type Ctx = { profile: Profile; loaded: boolean; save: (p: Profile) => Promise<void>; reset: () => Promise<void> };
const C = createContext<Ctx>(null as unknown as Ctx);
export const useProfile = () => useContext(C);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((v) => { if (v) setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(v) }); })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const save = async (p: Profile) => { setProfile(p); await AsyncStorage.setItem(KEY, JSON.stringify(p)); };
  const reset = async () => { setProfile(DEFAULT_PROFILE); await AsyncStorage.removeItem(KEY); };
  return <C.Provider value={{ profile, loaded, save, reset }}>{children}</C.Provider>;
}
