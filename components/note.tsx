import { ReactNode } from 'react';

interface NoteProps {
  children: ReactNode;
}

export default function Note({ children }: NoteProps) {
  return (
    <div>
      <p className="text-sm text-muted-foreground italic">{children}</p>
    </div>
  );
}
