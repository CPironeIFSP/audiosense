// src/types/navigation.ts

export type RootStackParamList = {
  VisionSetup: undefined;
  ProfileSelection: undefined;
  VisitorTabs: undefined;
  AuthScreen: undefined;
  Home: undefined;
  Crud: { isNew?: boolean; id?: string }; // rota unificada
  Details: { id: string };
};