interface TypingText {
  id: string; // uuid généré via la librairie uuid
  content: string; // contenu textuel
  level: 'easy' | 'medium' | 'hard'; // niveau associé au texte, valeurs autorisées
}

type NewText = Omit<TypingText, "id">;

export type { TypingText, NewText };