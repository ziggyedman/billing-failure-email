export interface StepDef {
  id: string;
  title: string;
  subtitle: string;
  /** How long this step realistically takes */
  duration: string;
  /** Whether the "Mark complete" button is gated by user input */
  requiresInput?: boolean;
}

export const STEPS: StepDef[] = [
  {
    id: "account",
    title: "Create a Resend account",
    subtitle: "Sign up and grab an API key",
    duration: "~2 min",
    requiresInput: true, // requires pasting the key
  },
  {
    id: "domain",
    title: "Verify your sending domain",
    subtitle: "Add DNS records so you can send from your own address",
    duration: "~10 min",
  },
  {
    id: "template",
    title: "Email template & live preview",
    subtitle: "How the template is built — edit values and see changes instantly",
    duration: "~4 min",
  },
  {
    id: "send",
    title: "The send route — then send it",
    subtitle: "Inspect the API route that fires the email, then send a real one",
    duration: "~1 min",
    requiresInput: true, // requires actually sending
  },
];
